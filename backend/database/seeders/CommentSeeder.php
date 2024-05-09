<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use App\Models\UserCommentVideo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        UserCommentVideo::create([
            'user_id' => '1',
            'video_id' => '2',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '2',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!, Te odio',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCommentVideo::create([
            'user_id' => '1',
            'video_id' => '3',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '3',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!, Te odio',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCommentVideo::create([
            'user_id' => '1',
            'video_id' => '4',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '4',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!, Te odio',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCommentVideo::create([
            'user_id' => '1',
            'video_id' => '5',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '5',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!, Te odio',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '5',
            'date'  => now(),
            'comment' => 'holaa',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '5',
            'date'  => now(),
            'comment' => 'holaaadasd',
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        UserCommentVideo::create([
            'user_id' => '1',
            'video_id' => '6',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        UserCommentVideo::create([
            'user_id' => '2',
            'video_id' => '6',
            'date'  => now(),
            'comment' => 'Buen video crack sigue así!, Te odio',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }

}
