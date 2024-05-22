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

    public function noStock(Request $request)
    {
        try {
            $products = $request->products;
            foreach ($products as $key => $product) {
                if ($product->stock <= 0) {
                    unset($products[$key]);
                }
            }
        } catch (\Exception $e) {
            // Handle errors, log, etc.
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Añadir un nuevo producto.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $product = new Product;
            $product->brand_id = $request->input('brand_id');
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->price = $request->input('price');
            $product->stock = $request->input('stock');
            $product->url_img1 = $request->input('url_img1');
            $product->url_img2 = $request->input('url_img2');
            $product->url_img3 = $request->input('url_img3');
            $product->save();

            return ApiResponse::success(new ProductResource($product), 'Producto añadido correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
    /**
     * Editar un producto existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->update($request->all());

            return ApiResponse::success(new ProductResource($product), 'Producto actualizado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Eliminar un producto existente.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();

            return ApiResponse::success([], 'Producto eliminado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
