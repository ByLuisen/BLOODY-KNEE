<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Responses\ApiResponse;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::get();

            return ApiResponse::success(ProductResource::collection($products));
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }
}
