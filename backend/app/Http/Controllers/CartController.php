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
use Ramsey\Uuid\Type\Integer;

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

            if ($product && $productData['quantity'] > 0 && $product->stock > 0) {
                // Verificar si el producto ya está en el carrito
                $cartProduct = CartStoreProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->first();

                if ($cartProduct) {
                    // Si el producto ya está en el carrito, actualiza la cantidad
                    $cartProduct->quantity += $productData['quantity'];
                    // Validate if the quantity of the product exceeds the stock quantity set the stock of the product as the quantity
                    if ($cartProduct->quantity > $product->stock) {
                        $cartProduct->quantity = $product->stock;
                    }
                    $cartProduct->save();
                } else {
                    // Si el producto no está en el carrito, agrégalo
                    $cartProduct = new CartStoreProduct();
                    $cartProduct->cart_id = $cart->id;
                    $cartProduct->product_id = $product->id;
                    $cartProduct->quantity = $productData['quantity'];
                    // Validate if the quantity of the product exceeds the stock quantity set the stock of the product as the quantity
                    if ($cartProduct->quantity > $product->stock) {
                        $cartProduct->quantity = $product->stock;
                    }
                    $cartProduct->save();
                }
            } else {
                // Si el producto existe, ya está en el carrito y la cantidad es 0 o el stock es 0, eliminarlo del carrito
                $cartProduct = CartStoreProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->first();

                if ($cartProduct) {
                    $cartProduct->delete();
                }
            }
        }

        return ApiResponse::success(null, 'Productos añadidos al carrito correctamente');
    }

    public function getCartProducts(Request $request)
    {
        // Obtener el usuario y su carrito asociado
        $user = User::where('email', $request->email)
            ->where('connection', $request->connection)
            ->first();
        $cart = $user->cart;

        if (!$cart) {
            // Si el usuario no tiene un carrito, crea uno nuevo
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Obtener los productos en el carrito con información adicional, ordenados por updated_at en orden descendente
        $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
            ->orderBy('updated_at', 'desc')
            ->with('product') // Cargar la relación 'product' para obtener información sobre los productos
            ->get();

        $updatedCartProducts = [];
        $removeProductIds = [];

        foreach ($cartProducts as $cartProduct) {
            if ($cartProduct->product->stock <= 0 || $cartProduct->quantity <= 0) {
                // Si el producto no tiene stock o la cantidad es menor o igual a 0, marcarlo para eliminación
                $removeProductIds[] = $cartProduct->id;
            } elseif ($cartProduct->quantity > $cartProduct->product->stock) {
                // Si la cantidad del producto excede el stock disponible, ajustar la cantidad
                $cartProduct->quantity = $cartProduct->product->stock;
                $cartProduct->save();
                $updatedCartProducts[] = $cartProduct;
            }
        }

        // Eliminar los productos marcados
        if (!empty($removeProductIds)) {
            CartStoreProduct::whereIn('id', $removeProductIds)->delete();
            // Obtener los productos en el carrito con información adicional, ordenados por updated_at en orden descendente
            $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
                ->orderBy('updated_at', 'desc')
                ->with('product') // Cargar la relación 'product' para obtener información sobre los productos
                ->get();
            return ApiResponse::success(CartProductResource::collection($cartProducts), 'Productos del carrito actualizados correctamente.');
        }

        if (!empty($updatedCartProducts)) {
            // Obtener los productos en el carrito con información adicional, ordenados por updated_at en orden descendente
            $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
                ->orderBy('updated_at', 'desc')
                ->with('product') // Cargar la relación 'product' para obtener información sobre los productos
                ->get();
            // Hay productos actualizados, devolverlos
            return ApiResponse::success(CartProductResource::collection($cartProducts), 'Productos del carrito actualizados correctamente.');
        }

        // No hay productos actualizados, devolver los productos originales
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
        // Obtener el ID del producto y la cantidad del cuerpo de la solicitud
        $productId = $request->product['id'];
        $productQuantity = $request->product['quantity'];
        $userEmail = $request->email;
        $userConnection = $request->connection;

        // Obtener el usuario y su carrito asociado
        $user = User::where('email', $userEmail)->where('connection', $userConnection)->first();
        $cart = $user->cart;

        // Si no hay un carrito, crear uno nuevo
        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Obtener el producto y verificar si existe
        $product = Product::find($productId);
        if (!$product) {
            return ApiResponse::error('Producto no encontrado', 404);
        }

        // Verificar si hay suficiente stock disponible
        if ($product->stock <= 0 || $productQuantity <= 0) {
            return ApiResponse::error('El producto no está disponible en stock', 400);
        }

        if ($productQuantity > $product->stock) {
            // Si la cantidad solicitada excede el stock disponible, ajustarla al stock disponible
            $productQuantity = $product->stock;
        }

        // Verificar si el producto ya está en el carrito
        $existingProduct = $cart->products()->where('product_id', $productId)->first();

        if ($existingProduct) {
            // Calcular la nueva cantidad
            $newQuantity = $existingProduct->pivot->quantity + $productQuantity;

            // Verificar que la nueva cantidad no exceda el stock disponible
            if ($newQuantity > $product->stock) {
                $newQuantity = $product->stock;
                // Actualizar la cantidad del producto en la tabla pivot
                $existingProduct->pivot->quantity = $newQuantity;
                $existingProduct->pivot->save();

                return ApiResponse::success(null, 'Has superado la cantidad de stock de este producto');
            }

            // Actualizar la cantidad del producto en la tabla pivot
            $existingProduct->pivot->quantity = $newQuantity;
            $existingProduct->pivot->save();
        } else {
            // Si el producto no está en el carrito, agregarlo con la cantidad correcta
            $cart->products()->attach($productId, ['quantity' => min($productQuantity, $product->stock)]);
        }

        return ApiResponse::success(null, 'Producto agregado al carrito con éxito');
    }
}
