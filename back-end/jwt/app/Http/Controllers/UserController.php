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
    // get opposite gender
    function getoppgender($id){
        $user = User::find($id);
        if($user->gender == "1"){
            $oppositegender = "0";
        }else{
             $oppositegender = "1";
        }
        $users = User::where('gender',$oppositegender)->get();
        return response()->json([
            "users" => $users
        ]);
    }
    // get user
    function getuser($id){
        $user = user::find($id);
        return response()->json([
            "user" => $user
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
    function getblocks($id){
        $block = blocks::where('id', $id)->get();
        return response()->json([
            "block" =>  $block
        ]);
    }
    
    // display liked
    function getfavorites($id){
       $favorites = favorites::where('sender_id',$id)->with("liked")->get();

        

       return response()->json(['favorites'=> $favorites]);
    }
    // edit profile 
    function editprofile(Request $request)
    {
        $user = User::find($request->id);

        $user->update([
            "name" =>$request->name,
            "age" => $request->age,
            "location"=>$request->location,
            "bio"=>$request->bio
        ]);

        return response()->json(['message' => 'User profile updated successfully']);
    }
    // upload image
    function uploadImage(Request $request){
        $encoded = $request->encoded;
        $name = $request->name;

        $decoded = base64_decode($encoded);

        $file_path = public_path('images/'. $name . '.png');

        file_put_contents($file_path,$decoded);

        User::where("name",$name)->update("pic", "http://localhost/images" . $name . ".png");
    }
}


