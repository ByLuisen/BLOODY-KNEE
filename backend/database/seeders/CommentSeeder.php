<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Generar un número aleatorio de comentarios
        $numComments = rand(5, 10);

        for ($i = 0; $i < $numComments; $i++) {
            // Crear un comentario aleatorio
            Comment::create([
                'user_id' => $faker->numberBetween(1, 10), // Cambia el rango según tus usuarios
                'video_id' => $faker->numberBetween(1, 10), // Cambia el rango según tus videos
                'comment' => $faker->sentence(),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
