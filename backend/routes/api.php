<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\StripeController;

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

Route::get('/private', function () {
    return response()->json([
        'message' => 'Your token is valid; you are authorized.',
    ]);
})->middleware('auth:api');

// Grupo de rutas para controladores con middleware de autenticacion y namespace de controladores
Route::group(['middleware' => 'api'], function () {
    Route::resource('quotes', QuoteController::class);
    Route::get('modalityvideo/{modality_id}/{type_id}', [VideoController::class, 'modalities']);
    Route::get('getvideobyid/{id}', [VideoController::class, 'videoById']);
    Route::resource('videos', VideoController::class);
    Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);
    Route::put('updateLikes/{id}', [VideoController::class, 'updateLikes']);
    Route::put('updateDislikes/{id}', [VideoController::class, 'updateDislikes']);
    Route::put('/videos/{id}/visit', [VideoController::class, 'incrementVideoVisits']);
    Route::resource('products', ProductController::class);
    Route::get('getproductbyid/{id}', [ProductController::class, 'productById']);
    Route::put('videos/{id}', [VideoController::class, 'update']);
    Route::delete('videos/{id}', [VideoController::class, 'delete']);
    Route::get('products/{id}/brand', [ProductController::class, 'productBrand']);
});

Route::post('/payment', [StripeController::class, 'payment']);
Route::post('/subscription', [StripeController::class, 'subscription']);

Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);
