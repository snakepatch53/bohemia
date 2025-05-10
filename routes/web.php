<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\SongRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;


Route::get('/storage/{any}', function ($any) {
    $path = storage_path("app/public/" . $any);
    if (!file_exists($path)) return abort(404);
    return Response::file($path);
})->where('any', '.*');

Route::get('/', [LandingController::class, 'home'])->name('home');
Route::get('/comida-menu', [LandingController::class, 'comida_menu'])->name('comida_menu');


Route::prefix('cancionero')->name('cancionero.')->group(function () {
    Route::get('/', [LandingController::class, 'cancionero_cola'])->name('cola');
    Route::get('/lista', [LandingController::class, 'cancionero_lista'])->name('lista');
    Route::get('/pedir/{song}', [LandingController::class, 'cancionero_pedir'])->name('pedir');

    Route::post('/cancionero/pedir', [SongRequestController::class, 'store'])->name('pedir.store');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'home'])->name('home');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
