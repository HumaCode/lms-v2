<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Traits\HasMenuPermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class MenuSeeder extends Seeder
{
    use HasMenuPermission;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cache::forget('menus');
        Cache::forget('menus_web');
        Cache::forget('urlMenu');

        // Roles yang diberikan akses: developer & administrator
        $adminRoles = ['developer', 'administrator'];

        /*
        |--------------------------------------------------------------------------
        | 1. CATEGORY: MAIN MENU
        |--------------------------------------------------------------------------
        */

        // Dashboard
        $dashboard = Menu::firstOrCreate(
            ['url' => 'dashboard'],
            [
                'name' => 'Dashboard',
                'category' => 'MAIN MENU',
                'icon' => 'grid_view',
                'active' => true,
                'orders' => 1,
            ]
        );
        $this->attachMenupermission($dashboard, ['read'], $adminRoles);

        // Pengguna
        $pengguna = Menu::firstOrCreate(
            ['url' => 'pengguna'],
            [
                'name' => 'Pengguna',
                'category' => 'MAIN MENU',
                'icon' => 'group',
                'active' => true,
                'orders' => 2,
            ]
        );
        $this->attachMenupermission($pengguna, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Kursus & Modul (Parent)
        $kursus = Menu::firstOrCreate(
            ['url' => 'kursus-modul'],
            [
                'name' => 'Kursus & Modul',
                'category' => 'MAIN MENU',
                'icon' => 'menu_book',
                'active' => true,
                'orders' => 3,
            ]
        );
        $this->attachMenupermission($kursus, ['read'], $adminRoles);

        // Submenu Kursus & Modul
        $subKursus1 = Menu::firstOrCreate(
            ['url' => $kursus->url . '/semua'],
            [
                'name' => 'Semua Kursus',
                'main_menu_id' => $kursus->id,
                'category' => $kursus->category,
                'icon' => 'list_alt',
                'active' => true,
                'orders' => 1,
            ]
        );
        $this->attachMenupermission($subKursus1, ['create', 'read', 'update', 'delete'], $adminRoles);

        $subKursus2 = Menu::firstOrCreate(
            ['url' => $kursus->url . '/buat-baru'],
            [
                'name' => 'Buat Kursus Baru',
                'main_menu_id' => $kursus->id,
                'category' => $kursus->category,
                'icon' => 'add_circle',
                'active' => true,
                'orders' => 2,
            ]
        );
        $this->attachMenupermission($subKursus2, ['create', 'read', 'update', 'delete'], $adminRoles);

        $subKursus3 = Menu::firstOrCreate(
            ['url' => $kursus->url . '/kategori-silabus'],
            [
                'name' => 'Kategori & Silabus',
                'main_menu_id' => $kursus->id,
                'category' => $kursus->category,
                'icon' => 'category',
                'active' => true,
                'orders' => 3,
            ]
        );
        $this->attachMenupermission($subKursus3, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Bootcamp
        $bootcamp = Menu::firstOrCreate(
            ['url' => 'bootcamp'],
            [
                'name' => 'Bootcamp',
                'category' => 'MAIN MENU',
                'icon' => 'school',
                'active' => true,
                'orders' => 4,
            ]
        );
        $this->attachMenupermission($bootcamp, ['create', 'read', 'update', 'delete'], $adminRoles);

        // E-Book
        $ebook = Menu::firstOrCreate(
            ['url' => 'e-book'],
            [
                'name' => 'E-Book',
                'category' => 'MAIN MENU',
                'icon' => 'auto_stories',
                'active' => true,
                'orders' => 5,
            ]
        );
        $this->attachMenupermission($ebook, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Blog & Artikel (Parent)
        $blog = Menu::firstOrCreate(
            ['url' => 'blog-artikel'],
            [
                'name' => 'Blog & Artikel',
                'category' => 'MAIN MENU',
                'icon' => 'newspaper',
                'active' => true,
                'orders' => 6,
            ]
        );
        $this->attachMenupermission($blog, ['read'], $adminRoles);

        // Submenu Blog & Artikel
        $subBlog1 = Menu::firstOrCreate(
            ['url' => $blog->url . '/semua'],
            [
                'name' => 'Semua Artikel',
                'main_menu_id' => $blog->id,
                'category' => $blog->category,
                'icon' => 'article',
                'active' => true,
                'orders' => 1,
            ]
        );
        $this->attachMenupermission($subBlog1, ['create', 'read', 'update', 'delete'], $adminRoles);

        $subBlog2 = Menu::firstOrCreate(
            ['url' => $blog->url . '/tulis-baru'],
            [
                'name' => 'Tulis Artikel Baru',
                'main_menu_id' => $blog->id,
                'category' => $blog->category,
                'icon' => 'edit_document',
                'active' => true,
                'orders' => 2,
            ]
        );
        $this->attachMenupermission($subBlog2, ['create', 'read', 'update', 'delete'], $adminRoles);

        $subBlog3 = Menu::firstOrCreate(
            ['url' => $blog->url . '/kategori-tag'],
            [
                'name' => 'Kategori & Tag',
                'main_menu_id' => $blog->id,
                'category' => $blog->category,
                'icon' => 'label',
                'active' => true,
                'orders' => 3,
            ]
        );
        $this->attachMenupermission($subBlog3, ['create', 'read', 'update', 'delete'], $adminRoles);

        $subBlog4 = Menu::firstOrCreate(
            ['url' => $blog->url . '/komentar-diskusi'],
            [
                'name' => 'Komentar & Diskusi',
                'main_menu_id' => $blog->id,
                'category' => $blog->category,
                'icon' => 'comment',
                'active' => true,
                'orders' => 4,
            ]
        );
        $this->attachMenupermission($subBlog4, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Tugas & Review Code
        $tugas = Menu::firstOrCreate(
            ['url' => 'tugas-review-code'],
            [
                'name' => 'Tugas & Review Code',
                'category' => 'MAIN MENU',
                'icon' => 'code',
                'active' => true,
                'orders' => 7,
            ]
        );
        $this->attachMenupermission($tugas, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Transaksi
        $transaksi = Menu::firstOrCreate(
            ['url' => 'transaksi'],
            [
                'name' => 'Transaksi',
                'category' => 'MAIN MENU',
                'icon' => 'credit_card',
                'active' => true,
                'orders' => 8,
            ]
        );
        $this->attachMenupermission($transaksi, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Sertifikat
        $sertifikat = Menu::firstOrCreate(
            ['url' => 'sertifikat'],
            [
                'name' => 'Sertifikat',
                'category' => 'MAIN MENU',
                'icon' => 'workspace_premium',
                'active' => true,
                'orders' => 9,
            ]
        );
        $this->attachMenupermission($sertifikat, ['create', 'read', 'update', 'delete'], $adminRoles);

        /*
        |--------------------------------------------------------------------------
        | 2. CATEGORY: ADMINISTRASI
        |--------------------------------------------------------------------------
        */

        // Manajemen Menu
        $manajemenMenu = Menu::firstOrCreate(
            ['url' => 'manajemen-menu'],
            [
                'name' => 'Manajemen Menu',
                'category' => 'ADMINISTRASI',
                'icon' => 'format_list_bulleted',
                'active' => true,
                'orders' => 10,
            ]
        );
        $this->attachMenupermission($manajemenMenu, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Role & Permission
        $rolePermission = Menu::firstOrCreate(
            ['url' => 'role-permission'],
            [
                'name' => 'Role & Permission',
                'category' => 'ADMINISTRASI',
                'icon' => 'shield',
                'active' => true,
                'orders' => 11,
            ]
        );
        $this->attachMenupermission($rolePermission, ['create', 'read', 'update', 'delete'], $adminRoles);

        // Pengaturan
        $pengaturan = Menu::firstOrCreate(
            ['url' => 'pengaturan'],
            [
                'name' => 'Pengaturan',
                'category' => 'ADMINISTRASI',
                'icon' => 'settings',
                'active' => true,
                'orders' => 12,
            ]
        );
        $this->attachMenupermission($pengaturan, ['create', 'read', 'update', 'delete'], $adminRoles);
    }
}
