<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserVisitVideo extends Pivot
{
    use HasFactory;

    protected $table = 'user_visit_videos';

    protected $fillable = [
        'user_id',
        'video_id',
        'date'
    ];

}

