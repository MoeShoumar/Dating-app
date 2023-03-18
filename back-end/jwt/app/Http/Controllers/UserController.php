<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\messages;
use App\Models\favorites;
use App\Models\blocks;
use App\Models\added_pics;


class UserController extends Controller
{
    function getusers(){
        $users = User::all();
        return response()->json([
            "articles" => $users
        ]);
    }

    function getuser($id){
        $user = user::find($id);
        return response()->json([
            "articles" => $user
        ]);
    }
    function getmessage(Request $request, $id){
        $message = messages::find($id);
        return response()->json([
            "message" =>  $message
        ]);
    }
    function getblocks(Request $request, $id){
        $block = blocks::find($id);
        return response()->json([
            "block" =>  $block
        ]);
    }
    function getfavorites(Request $request, $id){
        $favorite = favorites::find($id);
        return response()->json([
            "favorite" =>  $favorite
        ]);
    }

}


