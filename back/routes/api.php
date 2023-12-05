<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('login', [\App\Http\Controllers\LoginController::class, 'login']);
Route::post('register', [\App\Http\Controllers\RegisterController::class, 'register']);
Route::get('professions', \App\Http\Controllers\IndexProfessionsController::class);
Route::get('professions/{id}', \App\Http\Controllers\ShowProfessionController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('cabinet')->group(function () {
        Route::get('/', [\App\Http\Controllers\CabinetController::class, 'index']);
        Route::prefix('profile')->group(function () {
            Route::get('/', [\App\Http\Controllers\CabinetController::class, 'show']);
            Route::put('/', [\App\Http\Controllers\CabinetController::class, 'update']);
            Route::delete('/', [\App\Http\Controllers\CabinetController::class, 'destroy']);
        });
    });
});
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::apiResource('users', \App\Http\Controllers\UserController::class);
        Route::put('users/{id}/photo', [\App\Http\Controllers\UserPhotoController::class, 'update']);
        Route::delete('users/{id}/photo', [\App\Http\Controllers\UserController::class, 'destroy']);
        Route::post('/users/{id}/attach', [\App\Http\Controllers\UserAttachmentController::class, 'attach']);
        Route::delete(
            '/users/{id}/detach/{attachmentId}', [
                \App\Http\Controllers\UserAttachmentController::class,
                'detach'
            ]
        );
    });
});
