<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVisitVideo extends Model
{
    use HasFactory;

    protected $table = 'user_visit_videos';

    protected $fillable = [
        'user_id',
        'video_id',
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

