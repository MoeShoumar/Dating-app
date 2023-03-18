<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\messages;
use App\Models\favorites;
use App\Models\blocks;
use App\Models\added_pics;


class UserController extends Controller
{   
    // get all users
    function getusers(){
        $users = User::all();
        return response()->json([
            "articles" => $users
        ]);
    }
    // get user
    function getuser($id){
        $user = user::find($id);
        return response()->json([
            "articles" => $user
        ]);
    }
    // display sent and received messages
    function getmessage($sender_id, $receiver_id){
        $messages = Messages::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $sender_id)
                  ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                  ->where('receiver_id', $sender_id);
        })->get();
        
        return response()->json([
            "messages" =>  $messages
        ]);
    }
    // display blocked users
    function getblocks($sender_id, $receiver_id){
        $block = blocks::where('sender_id', $sender_id)->where('receiver_id', $receiver_id)->get();
        return response()->json([
            "block" =>  $block
        ]);
    }
    
    // display liked
    function getfavorites($sender_id, $receiver_id){
       $favorites = favorites::where('sender_id',$sender_id)->where( 'receiver_id' ,$receiver_id)->get();
       return response()->json(['favorites'=> $favorites]);
    }
    // edit profile 
    function editprofile(Request $request)
    {
        $user = User::find($request->id);

        $user->update([
            "name" =>$request->name,
            "email" => $request->email,
            "age" => $request->age,
            "location"=>$request->location,
            "bio"=>$request->bio
        ]);

        return response()->json(['message' => 'User profile updated successfully', 'user' => $user]);
    }
    
}


