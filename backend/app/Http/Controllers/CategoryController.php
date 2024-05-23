<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories = Category::get();
            return ApiResponse::success(CategoryResource::collection($categories), 'Lista de categorias obtenidas correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
