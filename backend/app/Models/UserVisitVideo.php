<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVisitVideo extends Pivot
{
    use HasFactory;

    protected $table = 'user_visit_videos';

    protected $fillable = [
       'video_id',
        'date'
    ];
}

