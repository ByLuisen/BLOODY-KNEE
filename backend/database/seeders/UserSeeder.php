<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'christiansastre74@gmail.com', // Reemplaza con el correo electrónico deseado
            'connection' => 'google-oauth2', // Reemplaza con el tipo de conexión deseada ('wifi', 'ethernet', 'mobile')
        ]);
        User::create([
            'email' => 'christiansastre74@gmail.com', // Reemplaza con el correo electrónico deseado
            'connection' => 'auth0', // Reemplaza con el tipo de conexión deseada ('wifi', 'ethernet', 'mobile')
        ]);
    }
}
