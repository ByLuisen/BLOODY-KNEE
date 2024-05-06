<?php

namespace Database\Seeders;

use App\Models\Quote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quote::create([
            'price' => 0,
            'description' => 'Plan inicial para los usuarios que inician y poder probar Bloody Knee gratis.',
            'advantages' => 'Acceso a videos gratis.;Acceso a dietas gratis.;Comprar productos en nuestra tienda.',
            'type' => 'Basic'
        ]);
        Quote::create([
            'price' => 5,
            'description' => 'Para los usuarios que quieren difrutar la experiencia de todo lo que ofrece nuestra web.',
            'advantages' => 'Lo misimo que el plan Basic pero más.;Acceso a videos exclusivojs.;Acceso a dietas exclusivas.',
            'type' => 'Standard',
            'price_id' => 'price_1P66JXByhCj4S0lhBWZF1Xe0'
        ]);
        Quote::create([
            'price' => 10,
            'description' => 'Para quien quiera disfrutar de una experiencia más personalizada.',
            'advantages' => 'Lo misimo que el plan Standard pero más.;Asistencia personalizada con dietistas.;Acceso a nuestro chatbot.',
            'type' => 'Premium',
            'price_id' => 'price_1P66ZDByhCj4S0lh4TjKxngd'
        ]);
    }
}
