<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLikeDislikeVideo extends Model
{
    use HasFactory;

    protected $table = 'user_like_dislike_videos';

    protected $fillable = [
        'user_id',
        'video_id',
        'type',
        'date'
    ];

    public function video()
    {
        return $this->belongsTo(Video::class, 'video_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
