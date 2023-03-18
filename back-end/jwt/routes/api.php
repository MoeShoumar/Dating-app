<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;

Route::group(['middleware' => 'api'], function($router) {
    Route::group(['prefix' => 'v0.0.1'], function () {
        
        Route::group(['prefix' => 'auth'], function () {
            Route::post('/login', [JWTController::class, "login"]);
            Route::post('/register', [JWTController::class, "register"]);
            Route::post('/resetpass', [JWTController::class, "resetpass"]);
        });
        
        Route::group(['prefix' => 'user'], function () {
            Route::get('/user/{id}', [JWTController::class, "getuser"]);
            Route::get('/users', [JWTController::class, "getusers"]);
            Route::get('/likeuser', [JWTController::class, "likeuser"]);
            Route::get('/blockuser', [JWTController::class, "blockuser"]);
            Route::get('/sendmessage', [JWTController::class, "sendmessage"]);
            Route::get('/addimage', [JWTController::class, "addimage"]);

            
        });

        Route::group(['prefix' => 'msgs'], function () {
            Route::post('/messages', [JWTController::class, "getmessage"]);
            Route::post('/blocks', [JWTController::class, "getblocks"]);
            Route::post('/favorites', [JWTController::class, "getfavorites"]);
        });
    
});
});