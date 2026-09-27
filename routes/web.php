<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/welcome')->name('home');
Route::inertia('/tentang-kami', 'frontend/about')->name('about');
Route::inertia('/kursus', 'frontend/course')->name('course');
