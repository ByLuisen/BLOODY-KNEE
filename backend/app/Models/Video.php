<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserLikeDislikeVideo;

class Video extends Model
{
    use HasFactory;

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_like_dislike_videos', 'video_id', 'user_id')
                    ->wherePivot('type', 'Like');
    }

    public function dislikedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_like_dislike_videos', 'video_id', 'user_id')
                    ->wherePivot('type', 'Dislike');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_visit_videos')->withTimestamps();
    }
}
