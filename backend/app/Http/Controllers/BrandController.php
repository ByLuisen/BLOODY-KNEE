<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use App\Http\Responses\ApiResponse;
use App\Http\Resources\BrandResource;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $brands = Brand::get();
            return ApiResponse::success(BrandResource::collection($brands), 'Lista de marcas obtenida correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
