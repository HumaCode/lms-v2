<?php

namespace App\Traits;

use Illuminate\Support\Arr;

trait HasPermission
{
    protected array $abilities = [
        'menu' => 'menu',
        'index' => 'read',
        'create' => 'create',
        'store' => 'create',
        'show' => 'read',
        'edit' => 'update',
        'update' => 'update',
        'destroy' => 'delete',
    ];

    public function callAction($method, $parameters)
    {
        $action = Arr::get($this->abilities, $method);
        if (! $action) {
            return parent::callAction($method, $parameters);
        }

        $route = request()->route();
        if (! $route) {
            return parent::callAction($method, $parameters);
        }

        $staticPath = $route->getCompiled()?->getStaticPrefix();
        if (! $staticPath) {
            return parent::callAction($method, $parameters);
        }

        $urlMenu = urlMenu();
        $staticPath = trim($staticPath, '/');

        if (! in_array($staticPath, $urlMenu)) {
            $parts = explode('/', $staticPath);
            while (count($parts) > 1) {
                array_pop($parts);
                $parentPath = implode('/', $parts);
                if (in_array($parentPath, $urlMenu)) {
                    $staticPath = $parentPath;
                    break;
                }
            }
        }

        if (in_array($staticPath, $urlMenu)) {
            $this->authorize("$action $staticPath");
        }

        return parent::callAction($method, $parameters);
    }
}
