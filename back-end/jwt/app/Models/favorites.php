<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class favorites extends Model
{
    use HasFactory;
    protected $fillable = ['pic1','pic2','pic3'];

    public function liked(){
        return $this->belongsTo(User::class, "receiver_id");
    }
}
