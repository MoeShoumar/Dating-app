<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActionController;


Route::group(['middleware' => 'api'], function($router) {
    Route::group(['prefix' => 'v0.0.1'], function () {
        
        Route::group(['prefix' => 'auth'], function () {
            Route::post('/login', [JWTController::class, "login"]);
            Route::post('/register', [JWTController::class, "register"]);
            Route::post('/resetpass', [JWTController::class, "resetpass"]);
        });
        
        Route::group(['prefix' => 'user'], function () {
            Route::get('/user/{id}', [UserController::class, "getuser"]);
            Route::get('/users', [UserController::class, "getusers"]);
            Route::post('/messages/{id}', [UserController::class, "getmessage"]);
            Route::post('/blocks/{id}', [UserController::class, "getblocks"]);
            Route::post('/favorites/{id}', [UserController::class, "getfavorites"]);
            
        });

        Route::group(['prefix' => 'actions'], function () {
            Route::post('/likeuser/{id}', [ActionController::class, "likeuser"]);
            Route::post('/blockuser/{id}', [ActionController::class, "blockuser"]);
            Route::post('/sendmessage/{sender_id}/{receiver_id}', [ActionController::class, "sendmessage"]);
            Route::post('/addimage/{id}', [ActionController::class, "addimage"]);
        });
    
});
});