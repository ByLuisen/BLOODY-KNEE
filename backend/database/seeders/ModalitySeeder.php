<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Modality;

class ModalitySeeder extends Seeder
{
    public function run(): void
    {

        Modality::create([
            'name' => 'boxeo'
        ]);
        Modality::create([
            'name' => 'thai'
        ]);
        Modality::create([
            'name' => 'fitness'
        ]);
    }
}
