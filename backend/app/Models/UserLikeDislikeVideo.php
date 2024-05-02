<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLikeDislikeVideo extends Pivot
{
    use HasFactory;

    protected $table = 'user_like_dislike_videos';

    protected $fillable = [
        'user_id',
        'video_id',
        'type',
        'date'
    ];
}