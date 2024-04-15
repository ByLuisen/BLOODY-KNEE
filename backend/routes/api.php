<?php

use App\Http\Controllers\QuoteController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Grupo de rutas para controladores con middleware de autenticacion y namespace de controladores
Route::group(['middleware' => 'api'], function () {
    Route::resource('quotes', QuoteController::class);
});

Route::post('/engines/curie/completions', [ChatController::class, 'completions']);