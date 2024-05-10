<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartProductResource;
use App\Http\Responses\ApiResponse;
use App\Models\Cart;
use App\Models\CartStoreProduct;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function storeProductFromACookie(Request $request)
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

                $addedDate = Carbon::createFromFormat('Y-m-d\TH:i:s.u\Z', $productData['added_date']);
                $formattedDate = $addedDate->format('Y-m-d H:i:s');
                $cartProduct->added_date = $formattedDate;
                $cartProduct->save();
            }
        }

        return ApiResponse::success(null, 'Productos añadidos al carrito correctamente');
    }

    public function getCartProducts(Request $request)
    {
        // Obtener el usuario y su carrito asociado
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();
        $cart = $user->cart;

        if (!$cart) {
            // Si el usuario no tiene un carrito, crea uno nuevo
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Obtener los productos en el carrito con información adicional, ordenados por added_date en orden descendente
        $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
            ->orderBy('added_date', 'desc')
            ->with('product') // Cargar la relación 'product' para obtener información sobre los productos
            ->get();

        return ApiResponse::success(CartProductResource::collection($cartProducts), 'Productos del carrito obtenidos correctamente');
    }

    public function removeProductFromCart(Request $request)
    {
        // Obtener el usuario y su carrito asociado
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();
        $cart = $user->cart;

        // Encuentra el producto en el carrito
        $product = CartStoreProduct::where('product_id', $request->productId)
            ->where('cart_id', $cart->id)
            ->first();

        // Si el producto existe en el carrito, elimínalo
        if ($product) {
            $product->delete();
            return ApiResponse::success(null, 'Producto eliminado correctamente');
        }

        return ApiResponse::success(null, 'Error al eliminar el producto del carrito');
    }

    public function addProductToCart(Request $request)
    {
        // Obtener el ID del producto y el ID del usuario del cuerpo de la solicitud
        $product = Product::where('id', $request->product['id'])->first();
        // Obtener el usuario y su carrito asociado
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();
        $cart = $user->cart;

        // Si no hay un carrito, crear uno nuevo
        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Agregar el producto al carrito
        $cart->products()->attach($product, ['quantity' => $request->product['quantity']]);

        // Puedes retornar una respuesta JSON si lo deseas
        return response()->json(['message' => 'Producto agregado al carrito con éxito']);
    }
}
