<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Cart;
use App\Models\CartStoreProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function storeProduct(Request $request)
    {
        // Verificar si el usuario ya tiene un carrito
        $user = User::where('email', $request->user['email'])->where('connection', explode('|', $request->user['sub'])[0])->first();
        $cart = $user->cart;

        if (!$cart) {
            // Si el usuario no tiene un carrito, crea uno nuevo
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Agregar los productos al carrito
        foreach ($request->cart as $productData) {
            $product = Product::find($productData['id']);

            // Verificar si el producto ya está en el carrito
            $cartProduct = CartStoreProduct::where('cart_id', $cart->id)
                ->where('product_id', $product->id)
                ->first();

            if ($cartProduct) {
                // Si el producto ya está en el carrito, actualiza la cantidad
                $cartProduct->quantity += $productData['quantity'];
                $cartProduct->save();
            } else {
                // Si el producto no está en el carrito, añádelo
                $cartProduct = new CartStoreProduct();
                $cartProduct->cart_id = $cart->id;
                $cartProduct->product_id = $product->id;
                $cartProduct->quantity = $productData['quantity'];
                $cartProduct->save();
            }
        }

        return ApiResponse::success(null, 'Productos añadidos al carrito correctamente');
    }

    public function getCartProducts($userId)
    {
        // Obtener el usuario y su carrito asociado
        $user = User::find($userId);
        $cart = $user->cart;

        if (!$cart) {
            return response()->json(['message' => 'El usuario no tiene productos en su carrito'], 404);
        }

        // Obtener los productos en el carrito ordenados por added_date en orden descendente
        $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
            ->orderBy('added_date', 'desc')
            ->get();

        return response()->json(['cart_products' => $cartProducts]);
    }
}
