<?php

namespace Database\Seeders;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void{
    
        Video::create([
            'type_id'=>'1',
            'modality_id'=>'1',
            'title' => 'Entrenamiento de boxeo #1',
            'coach' => 'Juanjo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'1',
            'modality_id'=>'2',
            'title' => 'Entrenamiento de thai #1',
            'coach' => 'Juanjillo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'1',
            'modality_id'=>'3',
            'title' => 'Entrenamiento de fitness #1',
            'coach' => 'Juli Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);




        Video::create([
            'type_id'=>'2',
            'modality_id'=>'1',
            'title' => 'Entrenamiento de boxeo #1',
            'coach' => 'Juanjo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'2',
            'modality_id'=>'2',
            'title' => 'Entrenamiento de thai #1',
            'coach' => 'Juanjillo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'2',
            'modality_id'=>'3',
            'title' => 'Entrenamiento de fitness #1',
            'coach' => 'Juli Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);
        


        Video::create([
            'type_id'=>'3',
            'modality_id'=>'1',
            'title' => 'Entrenamiento de boxeo #1',
            'coach' => 'Juanjo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'3',
            'modality_id'=>'2',
            'title' => 'Entrenamiento de thai #1',
            'coach' => 'Juanjillo Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'3',
            'modality_id'=>'3',
            'title' => 'Entrenamiento de fitness #1',
            'coach' => 'Juli Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => true,
        ]);

        Video::create([
            'type_id'=>'1',
            'modality_id'=>'1',
            'title' => 'Entrenamiento de boxeo gratis #1',
            'coach' => 'Juli Ortega',
            'description' => '🥊 ¡Prepárate para sudar con este intenso entrenamiento de boxeo! Desde golpes básicos hasta combinaciones avanzadas, te guiaremos a través de una rutina que pondrá a prueba tu resistencia y técnica. ¡Dale play y sube al ring con nosotros! 💪🔥 #Boxeo #Entrenamiento #Fitness',
            'url' => 'https://www.youtube.com/watch?v=E_hTPsXxTAE',
            'visits' => '0',
            'likes' => '0',
            'dislikes' => '0',
            'duration' => '10:00',
            'exclusive' => false,
        ]);
    }
}    