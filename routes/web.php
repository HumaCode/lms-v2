<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'frontend/welcome')->name('home');
Route::inertia('/tentang-kami', 'frontend/about')->name('about');
Route::inertia('/kursus', 'frontend/course')->name('course');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pengguna/getAllPagination', [UserController::class, 'getAllPaginated'])->name('pengguna.allPagination');
    Route::get('/pengguna/{pengguna}/avatar', [UserController::class, 'avatar'])->name('pengguna.avatar');
    Route::post('/pengguna/bulk-status', [UserController::class, 'bulkStatus'])->name('pengguna.bulk-status');
    Route::delete('/pengguna/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('pengguna.bulk-destroy');
    Route::resource('pengguna', UserController::class)->parameters(['pengguna' => 'pengguna']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
