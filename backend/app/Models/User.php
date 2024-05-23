<?php

namespace App\Models;

// Import necessary traits and classes
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    // Include traits for API tokens, factory, notifications, and roles
    use HasApiTokens, HasFactory, Notifiable,  HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Define a many-to-many relationship with the Quote model
    public function quotes()
    {
        return $this->belongsToMany(Quote::class)
            ->withTimestamps();
    }

    // Define a many-to-many relationship with the Video model for visited videos
    public function videos()
    {
        return $this->belongsToMany(Video::class, 'user_visit_videos', 'user_id', 'video_id')->withTimestamps();
    }

    // Define a many-to-many relationship with the Video model for favorite videos
    public function favorites()
    {
        return $this->belongsToMany(Video::class, 'user_favorite_videos', 'user_id', 'video_id')->withTimestamps();
    }

    // Define a many-to-many relationship with the Video model for liked videos
    public function likes()
    {
        return $this->belongsToMany(Video::class, 'user_like_dislike_videos', 'user_id', 'video_id')->withTimestamps();
    }

    // Define a one-to-one relationship with the Cart model
    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    /**
     * Get the orders associated with the user.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
