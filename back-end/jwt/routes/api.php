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
            Route::post('/forgotpassword', [JWTController::class, "forgotpassword"]);
            Route::post('/addimage/{id}', [JWTController::class, "addimage"]);
          
        });
        
        Route::group(['prefix' => 'user'], function () {
            Route::post("/upload",[UserController::class,"uploadImage"]);
            Route::get('/user/{id}', [UserController::class, "getuser"]);
            Route::get('/oppgender/{id}', [UserController::class, "getoppgender"]);
            Route::post('/editprofile', [UserController::class, "editprofile"]);
            Route::get('/messages/{sender_id}/{receiver_id}', [UserController::class, "getmessage"]);
            Route::get('/blocks/{sender_id}/{receiver_id}', [UserController::class, "getblocks"]);
            Route::get('/favorites/{sender_id}/{receiver_id}', [UserController::class, "getfavorites"]);
            
        });
        Route::group(['prefix' => 'actions'], function () {
            Route::post('/likeuser/{sender_id}/{receiver_id}', [ActionController::class, "likeuser"]);
            Route::post('/blockuser/{sender_id}/{receiver_id}', [ActionController::class, "blockuser"]);
            Route::post('/sendmessage/{sender_id}/{receiver_id}', [ActionController::class, "sendmessage"]);        
        });
    
});
});