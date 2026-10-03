<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Mengganti kolom `roles` (array nama role) dengan `permissions` (array Spatie permission names)
     * agar hak akses menu lebih granular menggunakan system permission yang sama dengan HasPermission trait.
     */
    public function up(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            // Tambah kolom permissions (JSON array of Spatie permission names)
            $table->json('permissions')->nullable()->after('roles')
                ->comment('Array of Spatie permission names, e.g. ["read pengguna","create pengguna"]');
        });

        // Migrate data lama dari roles ke permissions (tidak langsung drop roles agar aman)
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn('permissions');
        });
    }
};
