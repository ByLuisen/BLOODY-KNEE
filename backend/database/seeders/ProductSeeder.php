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
            'name' => 'Jogger Venum',
            'description' => 'Cómodos y estilosos joggers, perfectos tanto para entrenamiento como para uso casual.',
            'price' => 75.50,
            'stock' => 50,
            'url_img' => 'VenumJogger_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Mochila Venum',
            'description' => 'Mochila resistente diseñada para satisfacer todas tus necesidades de gimnasio y viaje.',
            'price' => 65.30,
            'stock' => 50,
            'url_img' => 'VenumSportBag_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Mochila Xtream Venum',
            'description' => 'Mochila de gran capacidad, ideal para atletas y aventureros por igual.',
            'price' => 130,
            'stock' => 30,
            'url_img' => 'VenumXtreamBackpack_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Bolsa deportiva Venum',
            'description' => 'Bolsa deportiva versátil con excelente espacio de almacenamiento y fácil acceso.',
            'price' => 89.99,
            'stock' => 30,
            'url_img' => 'VenumBackpack_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Gorra Venum Color Arena',
            'description' => 'Gorra elegante color arena con correa ajustable para un ajuste cómodo.',
            'price' => 89.99,
            'stock' => 30,
            'url_img' => 'CapSand_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Gorra Venum Marrón',
            'description' => 'Gorra de moda en color marrón, hecha con tela transpirable, perfecta para actividades al aire libre.',
            'price' => 25.50,
            'stock' => 30,
            'url_img' => 'CapBrown_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 3,
            'name' => 'Gorra Venum Marrón Oscuro',
            'description' => 'Gorra marrón oscuro que combina estilo y comodidad, ideal para uso diario.',
            'price' => 25.50,
            'stock' => 30,
            'url_img' => 'CapDarkBrown_1'
        ]);

        Product::create([
            'brand_id' => 2,
            'category_id' => 2,
            'name' => 'Guantes Piel Edition',
            'description' => 'Guantes de boxeo de cuero premium para profesionales, ofreciendo comodidad y protección.',
            'price' => 79.99,
            'stock' => 30,
            'url_img' => 'GuantesPiel_1'
        ]);

        Product::create([
            'brand_id' => 2,
            'category_id' => 2,
            'name' => 'Guantes Fantasy Edition',
            'description' => 'Guantes coloridos diseñados tanto para entrenamiento como competición, ofreciendo excelente soporte de muñeca.',
            'price' => 49.99,
            'stock' => 30,
            'url_img' => 'GuantesFantasy_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 2,
            'name' => 'Guantes Venum MMA',
            'description' => 'Guantes MMA diseñados para máxima destreza y mejora de agarre durante los combates.',
            'price' => 47.99,
            'stock' => 50,
            'url_img' => 'GuantesVenumMMA_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Camiseta Venum Bronze',
            'description' => 'Camiseta ligera y transpirable, perfecta para entrenar o para uso casual.',
            'price' => 29.99,
            'stock' => 50,
            'url_img' => 'CamisetaVenumBronze_1'
        ]);

        Product::create([
            'brand_id' => 1,
            'category_id' => 1,
            'name' => 'Camiseta Venum Negra',
            'description' => 'Camiseta Venum negra que combina comodidad con un diseño elegante.',
            'price' => 24.99,
            'stock' => 50,
            'url_img' => 'CamisetaVenum_1'
        ]);

    }
}
