<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $name
 * @property string $url
 * @property string|null $category
 * @property string|null $icon
 * @property bool $active
 * @property int $orders
 * @property string|null $main_menu_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Menu extends Model
{
    use HasFactory, HasUlids;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'url',
        'category',
        'icon',
        'active',
        'orders',
        'main_menu_id',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'orders' => 'integer',
        ];
    }

    /**
     * Parent menu (menu utama).
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Menu::class, 'main_menu_id');
    }

    /**
     * Sub menus (anak menu).
     */
    public function subMenus(): HasMany
    {
        return $this->hasMany(Menu::class, 'main_menu_id')->orderBy('orders');
    }
}
