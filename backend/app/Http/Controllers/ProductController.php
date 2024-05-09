<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Responses\ApiResponse;

class ProductController extends Controller
{
    /**
     * Retrieve all products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $products = Product::get();

            return ApiResponse::success(ProductResource::collection($products));
        } catch (\Exception $e) {
            // Log the error or perform other actions as per your needs
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Retrieve products by their IDs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function productById(Request $request)
    {
        try {
            // Get the IDs from the 'id' query parameters
            $ids = $request->query('id');

            // $ids will be a string containing IDs separated by commas
            // You can convert them to an array using the explode function
            $idsArray = explode(',', $ids);

            // Now you can use $idsArray for whatever you need, e.g., fetching products from the database
            $products = Product::with('brand', 'category')->whereIn('id', $idsArray)->get();

            // Now you can use $idsArray for whatever you need, e.g., fetching products from the database
            return ApiResponse::success(ProductResource::collection($products), 'Productos obtenidos correctamente por ID');
        } catch (\Exception $e) {
            // Handle errors, log, etc.
            return ApiResponse::error($e->getMessage());
        }
    }
}
