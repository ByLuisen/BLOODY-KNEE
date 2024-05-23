<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCommentVideo extends Pivot
{
    use HasFactory;
    // Define the table name
    protected $table = 'user_comment_videos';
    // Define the fillable fields
    protected $fillable = [
        'user_id',
        'video_id',
        'comment',
        'date'
    ];
    // Define the relationship with the User model
    public function user()
    {
        // Define a belongsTo relationship with the User model, specifying the foreign key 'user_id'

        return $this->belongsTo(User::class, 'user_id');
    }
}


