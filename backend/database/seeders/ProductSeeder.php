<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
/**
 *
 */
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear productos ficticios
        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Producto 1',
            'description' => 'Descripción del Producto 1',
            'price' => 100,
            'stock' => 50,
            'url_img' => 'url_de_la_imagen_del_producto_1.jpg'
        ]);

        Product::create([
            'brand_id' => 2,
            'category_id' => 2,
            'name' => 'Producto 2',
            'description' => 'Descripción del Producto 2',
            'price' => 150,
            'stock' => 30,
            'url_img' => 'url_de_la_imagen_del_producto_2.jpg'
        ]);

    }
}
