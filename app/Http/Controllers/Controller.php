<?php

namespace App\Http\Controllers;

use App\Traits\HasPermission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, HasPermission, ValidatesRequests;
}
