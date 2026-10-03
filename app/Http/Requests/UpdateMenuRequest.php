<?php

namespace App\Http\Requests;

use App\Models\Menu;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMenuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $menu = $this->route('menu');

        return $this->user()?->can('update', $menu ?? Menu::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'in:standard,megamenu,divider'],
            'target' => ['nullable', 'string', 'in:_self,_blank'],
            'category' => ['required', 'string', 'max:100'],
            'icon' => ['nullable', 'string', 'max:100'],
            'active' => ['nullable', 'boolean'],
            'orders' => ['nullable', 'integer', 'min:0'],
            'main_menu_id' => ['nullable', 'string', 'exists:menus,id'],
            'description' => ['nullable', 'string', 'max:500'],
            'badge_label' => ['nullable', 'string', 'max:50'],
            'badge_color' => ['nullable', 'string', 'max:50'],
            'roles' => ['nullable', 'array'],
            'roles.*' => ['string'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama / label menu wajib diisi.',
            'url.required' => 'URL target / path navigasi wajib diisi.',
            'category.required' => 'Kategori menu wajib dipilih.',
            'main_menu_id.exists' => 'Menu induk yang dipilih tidak valid.',
        ];
    }
}
