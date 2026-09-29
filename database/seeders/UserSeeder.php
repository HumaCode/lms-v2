<?php

namespace Database\Seeders;

use App\Models\Shield\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil data role yang terdaftar di database
        $roles = Role::whereNotNull('slug')->get();

        $default = [
            'email_verified_at' => now(),
            'password'          => Hash::make('123'),
            'remember_token'    => Str::random(20),
            'status'            => 'active',
        ];

        foreach ($roles as $role) {
            $user = User::firstOrCreate(
                ['email' => $role->slug . '@gmail.com'],
                [
                    ...$default,
                    'name'     => ucwords(str_replace('-', ' ', $role->slug)),
                    'username' => strtolower($role->slug),
                ]
            );

            // Pastikan role di-assign ke user
            if (! $user->hasRole($role)) {
                $user->assignRole($role);
            }
        }
    }
}
