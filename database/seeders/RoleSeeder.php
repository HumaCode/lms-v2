<?php

namespace Database\Seeders;

use App\Models\Shield\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'dev',
                'slug' => 'developer',
                'keterangan' => 'Developer sistem dengan akses penuh tak terbatas, debug tools, dan konfigurasi low-level.',
                'guard_name' => 'web',
                'is_active' => true,
            ],
            [
                'name' => 'admin',
                'slug' => 'administrator',
                'keterangan' => 'Administrator platform untuk mengelola konten, pengguna, kursus, dan transaksi.',
                'guard_name' => 'web',
                'is_active' => true,
            ],
            [
                'name' => 'instructor',
                'slug' => 'instructor',
                'keterangan' => 'Instruktur/pengajar untuk membuat dan mengelola materi serta kursus miliknya.',
                'guard_name' => 'web',
                'is_active' => true,
            ],
            [
                'name' => 'user',
                'slug' => 'student',
                'keterangan' => 'Siswa/pelajar platform untuk mengikuti kursus, mengerjakan tugas, dan mendapatkan sertifikat.',
                'guard_name' => 'web',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name'], 'guard_name' => $role['guard_name']],
                [
                    'slug' => $role['slug'],
                    'keterangan' => $role['keterangan'],
                    'is_active' => $role['is_active'],
                ]
            );
        }
    }
}
