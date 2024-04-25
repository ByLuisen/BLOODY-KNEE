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
            'name' => '',
            'description' => 'Descripción del Producto 1',
            'price' => 100,
            'stock' => 50,
            'url_img' => '.jpg'
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
