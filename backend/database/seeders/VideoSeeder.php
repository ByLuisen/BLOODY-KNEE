<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        // Videos de boxeo (modality_id = 1)
        for ($i = 1; $i <= 10; $i++) {
            $type_id = ($i % 4) + 1; // Genera un valor de tipo cíclico entre 1 y 4
            Video::create([
                'type_id' => (string)$type_id,
                'modality_id' => '1',
                'title' => "Entrenamiento de boxeo #{$i}",
                'coach' => 'Entrenador Principal',
                'description' => '🥊 ¡Entrenamiento de boxeo enfocado en técnicas y movimientos para mejorar tu golpeo y defensa! ¡Sigue el ritmo y siente cómo mejora tu técnica! 💥 #Boxeo #Entrenamiento #Técnica',
                'url' => 'https://www.youtube.com/embed/yTRg9r6q8k0?start=476&showinfo=0&modestbranding=1',
                'visits' => '0',
                'likes' => '0',
                'dislikes' => '0',
                'duration' => '12:00',
                'exclusive' => false,
            ]);
        }

        // Videos de thai (modality_id = 2)
        for ($i = 1; $i <= 10; $i++) {
            $type_id = ($i % 4) + 1; // Genera un valor de tipo cíclico entre 1 y 4
            Video::create([
                'type_id' => (string)$type_id,
                'modality_id' => '2',
                'title' => "Entrenamiento de thai #{$i}",
                'coach' => 'Entrenador Principal',
                'description' => '🥊 ¡Entrenamiento de thai que combina movimientos tradicionales con técnicas modernas! ¡Mejora tu flexibilidad, fuerza y resistencia con esta rutina! 🥊 #Thai #Entrenamiento #Flexibilidad',
                'url' => 'https://www.youtube.com/embed/yTRg9r6q8k0?start=476&showinfo=0&modestbranding=1',
                'visits' => '0',
                'likes' => '0',
                'dislikes' => '0',
                'duration' => '13:00',
                'exclusive' => false,
            ]);
        }

        // Videos de fitness (modality_id = 3)
        for ($i = 1; $i <= 10; $i++) {
            $type_id = ($i % 4) + 1; // Genera un valor de tipo cíclico entre 1 y 4
            Video::create([
                'type_id' => (string)$type_id,
                'modality_id' => '3',
                'title' => "Entrenamiento de fitness #{$i}",
                'coach' => 'Entrenador Principal',
                'description' => '🥊 ¡Entrenamiento de fitness que combina ejercicios aeróbicos con ejercicios de fuerza! ¡Quema calorías, fortalece tu cuerpo y mejora tu condición física con esta rutina! 💪 #Fitness #Entrenamiento #Salud',
                'url' => 'https://www.youtube.com/embed/yTRg9r6q8k0?start=476&showinfo=0&modestbranding=1',
                'visits' => '0',
                'likes' => '0',
                'dislikes' => '0',
                'duration' => '14:00',
                'exclusive' => false,
            ]);
        }
    }
}
