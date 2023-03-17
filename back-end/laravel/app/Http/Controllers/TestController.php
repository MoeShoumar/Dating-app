<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    function hiNabiha()
    {
        return  response()->json([
            "result" => "hellooo"
        ]);
    }
    function login()
    {
        return  response()->json([
            "result" => "login try"
        ]);
    }
}
