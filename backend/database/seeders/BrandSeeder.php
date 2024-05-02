<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::create([
            'name' => 'Venum',
        ]);
        Brand::create([
            'name' => 'Buddha',
        ]);
        Brand::create([
            'name' => 'Rival',
        ]);
        Brand::create([
            'name' => 'Nike',
        ]);
    }
}
