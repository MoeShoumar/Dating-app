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

Route::post('/login', [TestController::class, "login"]);

Route::group(['prefix' => 'admin'], function () {
    Route::get('/user', [AdminController::class, "users"]);
    Route::post('/adduser', [AdminController::class, "adduser"]);
});


Route::group(['prefix' => 'v0.0.1'], function () {
    Route::get('/user', [AdminController::class, "users"]);
    Route::post('/adduser', [AdminController::class, "adduser"]);
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
