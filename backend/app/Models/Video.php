<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserLikeDislikeVideo;

class Video extends Model
{
    use HasFactory;

    public function votes()
    {
        return $this->hasMany(UserLikeDislikeVideo::class, 'video_id');
    }
    

}
