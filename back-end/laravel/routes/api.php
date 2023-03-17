<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Cpntrollers\TestController;

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

// Route::get('/', [TestController::class, "hiNabiha"] {
//     // return ('welcome Nabiha');
// 
//     return json_encode($x);
// });

Route::group(['prefix' => 'v0.0.1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/signin', [AdminController::class, "signin"]);
        Route::post('/signup', [AdminController::class, "signup"]);
        Route::post('/resetpass', [AdminController::class, "resetpass"]);
    });
    
    Route::group(['prefix' => 'user'], function () {
        Route::get('/user', [AdminController::class, "user"]);
        Route::get('/user', [AdminController::class, "user"]);

        Route::post('/adduser', [AdminController::class, "adduser"]);
    
    
    });


   
});

