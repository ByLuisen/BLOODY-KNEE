<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Responses\ApiResponse;

class ProductController extends Controller
{
    /**
     *
     */
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


    public function productById(Request $request)
    {
        try {
            // Obtiene los IDs de los parámetros de consulta 'id'
            $ids = $request->query('id');

            // $ids será una cadena que contiene los IDs separados por comas
            // Puedes convertirlos a un array usando la función explode
            $idsArray = explode(',', $ids);

            // Ahora puedes usar $idsArray para lo que necesites, por ejemplo, buscar los productos en la base de datos
            $products = Product::with('brand', 'category')->whereIn('id', $idsArray)->get();

            // Devolver los productos como una respuesta exitosa
            return ApiResponse::success(ProductResource::collection($products), 'Productos obtenidos correctamente por ID');
        } catch (\Exception $e) {
            // Manejar errores, loguear, etc.
            return ApiResponse::error($e->getMessage());
        }
    }

    public function getProductBrand($id)
    {
        $product = Product::where('id', $id)->get();

    }

    /**
     * Obtiene la marca de un producto específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function productBrand($id)
    {
        $product = Product::findOrFail($id);

        // Obtener la marca del producto
        $brand = $product->brand;

        return response()->json(['brand' => $brand]);
    }
}
