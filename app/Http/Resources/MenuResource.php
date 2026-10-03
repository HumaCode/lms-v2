<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $permissions = [];
        if ($this->relationLoaded('permissions')) {
            $loaded = $this->getRelation('permissions');
            if ($loaded instanceof \Illuminate\Support\Collection || $loaded instanceof \Illuminate\Database\Eloquent\Collection) {
                $permissions = $loaded->pluck('name')->values()->toArray();
            }
        } elseif (method_exists($this->resource, 'permissions')) {
            $permissions = $this->resource->permissions()->pluck('name')->values()->toArray();
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url,
            'type' => $this->type ?? 'standard',
            'target' => $this->target ?? '_self',
            'category' => $this->category ?? 'MAIN MENU',
            'icon' => $this->icon ?? 'link',
            'active' => (bool) $this->active,
            'orders' => (int) $this->orders,
            'main_menu_id' => $this->main_menu_id,
            'description' => $this->description,
            'badge_label' => $this->badge_label,
            'badge_color' => $this->badge_color,
            'roles' => $this->roles ?? ['administrator', 'developer'],
            'permissions' => $permissions,
            'sub_menus' => $this->relationLoaded('subMenus')
                ? MenuResource::collection($this->subMenus)->resolve()
                : [],
            'created_at' => $this->created_at?->translatedFormat('d M Y') ?? $this->created_at?->format('d M Y'),
        ];
    }
}
