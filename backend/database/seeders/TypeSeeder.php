<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Type;

class TypeSeeder extends Seeder
{
    public function run(): void
    {

        Type::create([
            'name' => 'con pareja'
        ]);
        Type::create([
            'name' => 'con saco'
        ]);
        Type::create([
            'name' => 'sin equipamiento'
        ]);
        Type::create([
            'name' => 'con equipamiento'
        ]);
    }
}
