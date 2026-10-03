<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->string('type')->default('standard')->after('url');
            $table->string('target')->default('_self')->after('type');
            $table->text('description')->nullable()->after('target');
            $table->string('badge_label')->nullable()->after('description');
            $table->string('badge_color')->nullable()->after('badge_label');
            $table->json('roles')->nullable()->after('badge_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn(['type', 'target', 'description', 'badge_label', 'badge_color', 'roles']);
        });
    }
};
