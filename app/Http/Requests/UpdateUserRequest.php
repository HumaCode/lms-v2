<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->route('user') ?? $this->route('pengguna');
        return $this->user()?->can('update', $user) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $targetUser = $this->route('user') ?? $this->route('pengguna');
        $userId = $targetUser instanceof \App\Models\User ? $targetUser->id : $targetUser;

        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:50', 'regex:/^[a-zA-Z0-9._-]+$/', 'unique:users,username,'.$userId],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$userId],
            'password' => ['nullable', 'string', 'min:6'],
            'phone' => ['nullable', 'string', 'max:20'],
            'bio' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'string', 'in:active,inactive,suspended'],
            'role' => ['nullable', 'string'],
            'email_verified' => ['nullable', 'boolean'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
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
            'name.required' => 'Nama lengkap wajib diisi.',
            'username.regex' => 'Username hanya boleh berisi huruf, angka, titik, strip (-), dan garis bawah (_).',
            'username.unique' => 'Username ini sudah digunakan pengguna lain.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
            'email.unique' => 'Alamat email sudah terdaftar di sistem.',
            'password.min' => 'Password minimal harus 6 karakter.',
            'avatar.max' => 'Ukuran avatar maksimal 5MB.',
            'avatar.mimes' => 'Format avatar harus JPEG, PNG, JPG, atau WEBP.',
        ];
    }
}
