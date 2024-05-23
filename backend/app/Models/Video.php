<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserLikeDislikeVideo;

class Video extends Model
{
    use HasFactory;
    /**
     * Get the users who liked the video.
     */
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_like_dislike_videos', 'video_id', 'user_id')
            ->wherePivot('type', 'Like');
    }

    /**
     * Get the users who disliked the video.
     */
    public function dislikedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_like_dislike_videos', 'video_id', 'user_id')
            ->wherePivot('type', 'Dislike');
    }

    /**
     * Get the users who visited the video.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_visit_videos')->withTimestamps();
    }

    protected $fillable = [
        'id',
        'title',
        'coach',
        'description',
        'url',
        'duration',
        'exclusive',
    ];
}
