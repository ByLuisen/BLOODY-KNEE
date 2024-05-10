<?php

namespace App\Http\Controllers;

use App\Http\Resources\DietResource; 
use Illuminate\Http\Request;
use App\Models\Diet;
use App\Http\Responses\ApiResponse;

class DietController extends Controller
{
    public function index()
    {
        try {
            $diets = Diet::get();

            return ApiResponse::success(DietResource::collection($diets), 'Lista de dietas obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }
}
