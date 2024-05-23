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
    /**
     * function that stores the products from the cookie in the user's cart, merging the products that exist in
     * both the cookie and the cart, validating that the quantity does not exceed the stock or eliminating the
     * product if it does not exist
     */
    public function storeProductFromACookie(Request $request)
    {
        // Check if the user already has a cart
        $user = User::where('email', $request->user['email'])->where('connection', explode('|', $request->user['sub'])[0])->first();
        $cart = $user->cart;

        if (!$cart) {
            // If the user does not have a cart, create a new one
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Add the products to the cart
        foreach ($request->cart as $productData) {
            $product = Product::find($productData['id']);

            if ($product && $productData['quantity'] > 0 && $product->stock > 0) {
                // Check if the product is already in the cart
                $cartProduct = CartStoreProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->first();

                if ($cartProduct) {
                    // If the product is already in the cart, update the quantity
                    $cartProduct->quantity += $productData['quantity'];
                    // Validate if the quantity of the product exceeds the stock quantity set the stock of the product as the quantity
                    if ($cartProduct->quantity > $product->stock) {
                        $cartProduct->quantity = $product->stock;
                    }
                    $cartProduct->save();
                } else {
                    // If the product is not in the cart, add it
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
                // If the product exists, is already in the cart and the quantity is 0 or the stock is 0, remove it from the cart
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

    /**
     * Función para obtener el carrito de el usuario, actualizando si es necesario los productos
     * si la cantidad es mayor a la cantidad de stock de el producto o eliminando directamente el
     * producto si no dispone de stock
     */
    public function getCartProducts(Request $request)
    {
        // Get the user and their associated cart
        $user = User::where('email', $request->email)
            ->where('connection', $request->connection)
            ->first();
        $cart = $user->cart;

        if (!$cart) {
            // If the user does not have a cart, create a new one
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Get the products in the cart with additional information, sorted by updated_at in descending order
        $cartProducts = CartStoreProduct::where('cart_id', $cart->id)
            ->orderBy('updated_at', 'desc')
            ->with('product') // Load the 'product' relationship to get information about the products
            ->get();

        $updatedCartProducts = [];
        $removeProductIds = [];

        foreach ($cartProducts as $cartProduct) {
            if ($cartProduct->product->stock <= 0 || $cartProduct->quantity <= 0) {
                // If the product is out of stock or the quantity is less than or equal to 0, mark it for elimination
                $removeProductIds[] = $cartProduct->id;
            } elseif ($cartProduct->quantity > $cartProduct->product->stock) {
                // If the product quantity exceeds the available stock, adjust the quantity
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

    /**
     * Function that delete the product from the user's cart
     */
    public function removeProductFromCart(Request $request)
    {
        // Get the user and their associated cart
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();
        $cart = $user->cart;

        // Find the product in the cart
        $product = CartStoreProduct::where('product_id', $request->productId)
            ->where('cart_id', $cart->id)
            ->first();

        // If the product exists in the cart, delete it
        if ($product) {
            $product->delete();
            return ApiResponse::success(null, 'Producto eliminado correctamente');
        }

        return ApiResponse::success(null, 'Error al eliminar el producto del carrito');
    }

    /**
     * Function that adds the product to the cart, validating the existence of the product
     * in the cart and the availability of stock, updating it or removing it from the cart
     */
    public function addProductToCart(Request $request)
    {
        // Get product ID and quantity from request body
        $productId = $request->product['id'];
        $productQuantity = $request->product['quantity'];
        $userEmail = $request->email;
        $userConnection = $request->connection;

        // Get the user and their associated cart
        $user = User::where('email', $userEmail)->where('connection', $userConnection)->first();
        $cart = $user->cart;

        // If there is no cart, create a new one
        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->save();
        }

        // Obtain the product and check if it exists
        $product = Product::find($productId);
        if (!$product) {
            return ApiResponse::error('Producto no encontrado', 404);
        }

        // Check if there is enough stock available
        if ($product->stock <= 0 || $productQuantity <= 0) {
            return ApiResponse::error('El producto no está disponible en stock', 400);
        }

        if ($productQuantity > $product->stock) {
            // If the requested quantity exceeds the available stock, adjust it to the available stock
            $productQuantity = $product->stock;
        }

        // Check if the product is already in the cart
        $existingProduct = $cart->products()->where('product_id', $productId)->first();

        if ($existingProduct) {
            // Calculate the new amount
            $newQuantity = $existingProduct->pivot->quantity + $productQuantity;

            // Verify that the new quantity does not exceed the available stock
            if ($newQuantity > $product->stock) {
                $newQuantity = $product->stock;
                // Update product quantity in pivot table
                $existingProduct->pivot->quantity = $newQuantity;
                $existingProduct->pivot->save();

                return ApiResponse::success(null, 'Has superado la cantidad de stock de este producto');
            }

            // Update product quantity in pivot table
            $existingProduct->pivot->quantity = $newQuantity;
            $existingProduct->pivot->save();
        } else {
            // If the product is not in the cart, add it with the correct quantity
            $cart->products()->attach($productId, ['quantity' => min($productQuantity, $product->stock)]);
        }

        return ApiResponse::success(null, 'Producto agregado al carrito con éxito');
    }
}
