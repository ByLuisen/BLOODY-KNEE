<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;

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


// Route to retrieve user information if authenticated with Sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route to check token validity and authorization
Route::get('/private', function () {
    return response()->json([
        'message' => 'Your token is valid; you are authorized.',
    ]);
})->middleware('auth:api');

// Route group for controllers with authentication middleware and controller namespace
Route::group(['middleware' => 'api'], function () {
    Route::post('/new-user', [UserController::class, 'newUser']);
    Route::resource('quotes', QuoteController::class);
    Route::get('modalityvideo/{modality_id}/{type_id}', [VideoController::class, 'modalities']);
    Route::get('getvideobyid/{id}', [VideoController::class, 'videoById']);
    Route::get('getcommentbyid/{id}', [CommentController::class, 'commentById']);
    Route::resource('videos', VideoController::class);
    Route::resource('diets', DietController::class);
    Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);
    Route::put('updateLikes/{id}', [VideoController::class, 'updateLikes']);
    Route::put('updateDislikes/{id}', [VideoController::class, 'updateDislikes']);
    Route::put('/videos/{id}/visit', [VideoController::class,'incrementVideoVisits']);
    Route::post('videos/{videoId}/update-comments', [CommentController::class, 'countAndUpdateComments']);
    Route::post('/comments', [CommentController::class, 'addComment']);
    Route::resource('products', ProductController::class);
    Route::get('getproductbyid/{id}', [ProductController::class, 'productById']);
    Route::put('videos/{id}', [VideoController::class, 'update']);
    Route::delete('videos/{id}', [VideoController::class, 'delete']);
    Route::get('products/{id}/brand', [ProductController::class, 'productBrand']);
    Route::post('/payment', [StripeController::class, 'payment']);
    Route::post('/subscription', [StripeController::class, 'subscription']);
    Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);
});

// Route to handle payment
Route::post('/payment', [StripeController::class, 'payment']);

// Route to handle subscription
Route::post('/subscription', [StripeController::class, 'subscription']);

// Route to send messages to OpenAI
Route::post('/sendMessage', [OpenAIController::class, 'sendMessage']);
