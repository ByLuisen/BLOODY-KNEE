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

        /**
         *
         * Indice de marcas y categorias
         * ID   =>    Tipo (Brands)
         * 1    =>  Venum
         * 2    =>  Buddha
         * 3    =>  Rival
         * 4    =>  Nike
         *
         * ID   =>    Tipo (Category)
         * 1    =>      Ropa
         * 2    =>      Equipamiento
         * 3    =>      Accesorios
         */

        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Jogger venum',
            'description' => '',
            'price' => 75.50,
            'stock' => 50,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Venum Backpack',
            'description' => '',
            'price' => 65.30,
            'stock' => 50,
            'url_img' => 'url_de_la_imagen_del_producto_2.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Venum Xtream Backpack',
            'description' => 'Descripción del Producto 2',
            'price' => 130,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Venum Sportbag',
            'description' => 'Descripción del Producto 2',
            'price' => 89.99,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Venum Cap Sand',
            'description' => 'Descripción del Producto 2',
            'price' => 89.99,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Venum Cap Sand',
            'description' => 'Descripción del Producto 2',
            'price' => 25.50,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Venum Cap Brown',
            'description' => 'Descripción del Producto 2',
            'price' => 25.50,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Venum Cap Dark Brown',
            'description' => 'Descripción del Producto 2',
            'price' => 25.50,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Guantes Piel Edition',
            'description' => 'Descripción del Producto 2',
            'price' => 79.99,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Guantes Fantasy Edition',
            'description' => 'Descripción del Producto 2',
            'price' => 49.99,
            'stock' => 30,
            'url_img' => '.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Guantes Venum MMA',
            'description' => 'Descripción del Producto 2',
            'price' => 47.99,
            'stock' => 50,
            'url_img' => 'url_de_la_imagen_del_producto_2.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Camiseta Venum Bronze',
            'description' => 'Descripción del Producto 2',
            'price' => 29.99,
            'stock' => 50,
            'url_img' => 'url_de_la_imagen_del_producto_2.jpg'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Camiseta Venum Negra',
            'description' => 'Descripción del Producto 2',
            'price' => 24.99,
            'stock' => 50,
            'url_img' => 'url_de_la_imagen_del_producto_2.jpg'
        ]);

    }
}
