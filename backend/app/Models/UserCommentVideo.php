<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCommentVideo extends Model

{
    use HasFactory;
    protected $table = 'user_comment_videos';
    
    protected $fillable = [
        'user_id',
        'video_id',
        'comment',
        'date'
    ];
    
}