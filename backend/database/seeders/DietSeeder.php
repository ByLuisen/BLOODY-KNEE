<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Diet;
class DietSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

            Diet::create([
                'title' => 'Dieta 1a',
                'description' => 'Esta alimentación se fundamenta en la ingesta principalmente de alimentos de origen vegetal, como frutas, verduras, legumbres, granos enteros y frutos secos.
                Se promueve la limitación o la eliminación del consumo de productos de origen animal y de grasas saturadas.',
                'content' => 'Dieta1.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 1b',
                'description' => 'Esta dieta se basa en una variedad de alimentos que proporcionan los nutrientes
                 necesarios para mantener la salud y el bienestar.',
                'content' => 'Dieta2.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 1c',
                'description' => 'Inspirada en los patrones de alimentación de los países mediterráneos, esta dieta es rica en frutas,
                 verduras, pescado, legumbres, frutos secos y aceite de oliva.',
                'content' => 'Dieta3.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 2a',
                'description' => 'Esta dieta se centra en alimentos de origen vegetal como frutas, verduras, legumbres, granos enteros, nueces y semillas.',
                'content' => 'Dieta4.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 2b',
                'description' => 'Esta dieta se centra en consumir una cantidad reducida de calorías mientras se mantienen los nutrientes esenciales.',
                'content' => 'Dieta5.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 2c',
                'description' => 'Esta dieta combina los principios de una dieta vegetariana con la flexibilidad de consumir ocasionalmente carne o pescado.',
                'content' => 'Dieta6.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 3a',
                'description' => ' Esta dieta prioriza el consumo de proteínas magras como carne magra, aves, pescado, huevos, productos lácteos bajos en grasa y legumbres.',
                'content' => 'Dieta7.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 3b',
                'description' => 'Esta dieta se basa en alimentos vegetales como frutas, verduras, legumbres, granos enteros y nueces, mientras se limita o se
                evita el consumo de productos de origen animal y grasas saturadas',
                'content' => 'Dieta8.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 3c',
                'description' => 'Esta dieta combina los principios de la dieta mediterránea con un enfoque en la pérdida de peso.',
                'content' => 'Dieta9.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            Diet::create([
                'title' => 'Dieta 4a',
                'description' => 'Esta dieta se basa en intercambiar alimentos dentro de grupos de intercambio que tienen perfiles nutricionales similares.',
                'content' => 'Dieta10.webp',
                'author' => 'Julian Ortega',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

    }
}
