<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCommentVideo extends Pivot
{
    use HasFactory;

    protected $table = 'user_comment_videos';

    protected $fillable = [
        'user_id',
        'video_id',
        'comment',
        'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}


