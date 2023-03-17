<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;

Route::group(['middleware' => 'api'], function($router) {
    Route::group(['prefix' => 'v0.0.1'], function () {
        
        Route::group(['prefix' => 'auth'], function () {
            Route::post('/signin', [JWTController::class, "login"]);
            Route::post('/signup', [JWTController::class, "register"]);
            Route::post('/resetpass', [JWTController::class, "resetpass"]);
        });
        
        Route::group(['prefix' => 'user'], function () {
            Route::get('/user', [JWTController::class, "user"]);
            Route::get('/likeuser', [JWTController::class, "likeuser"]);
            Route::get('/blockuser', [JWTController::class, "blockuser"]);
            Route::get('/sendmessage', [JWTController::class, "sendmessage"]);
            Route::post('/adduser', [JWTController::class, "adduser"]);
        });
    
});
});