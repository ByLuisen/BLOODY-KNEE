<?php

use App\Http\Controllers\QuoteController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenAIController;
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
    Route::get('modalityvideo/{modality_id}/{type_id}', [VideoController::class, 'modalities']);
    Route::get('getvideobyid/{id}', [VideoController::class, 'videoById']);
    Route::resource('videos', VideoController::class);
    Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);  
    Route::post('updateLikes/{id}', [VideoController::class, 'updateLikes']);
    Route::post('updateDislikes/{id}', [VideoController::class, 'updateDislikes']);  
    Route::post('/videos/{id}/visit', [VideoController::class,'incrementVideoVisits']);

});







