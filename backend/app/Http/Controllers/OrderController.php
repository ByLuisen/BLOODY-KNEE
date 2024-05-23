<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Function that creates an order
     */
    public function makeOrder(Request $request)
    {
        try {
            // Collect the data that is received
            $checkout_session = $request->checkout_session;
            $line_items = $request->line_items;

            // Verify if the user who made the request is the same one who purchased the products
            if ($request->email != $checkout_session['customer_email']) {
                return ApiResponse::error('El usuario no coincide con el usuario del pedido');
            }

            // Verify if the order exist
            $order_exist = Order::where('payment_id', $checkout_session['payment_intent'])->first();

            // If the order exist return the order
            if ($order_exist) {
                $order_exist->load('orderDetails');
                return ApiResponse::success($order_exist, 'Pedido obtenido correctamente');
            }

            // Get the user who made the request
            $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

            // Make the order
            $order = new Order();
            $order->user_id = $user->id;
            $order->payment_id = $checkout_session['payment_intent'];
            $order->order_date = Carbon::now()->toDateString();
            $order->date_delivery = Carbon::now()->addDays(7)->toDateString();
            $order->country = $user->country;
            $order->full_name = $user->full_name;
            $order->email = $checkout_session['customer_email'];
            $order->phone = $user->phone;
            $order->address = $user->address;
            $order->province = $user->province;
            $order->city = $user->city;
            $order->zip = $user->zip;
            $order->shipping_cost = $checkout_session['shipping_cost']['amount_total'] / 100;
            $order->amount_total = $checkout_session['amount_total'] / 100;
            $order->status = 'En Proceso';
            $order->save();

            foreach ($line_items as $item) {
                $product = Product::where('name', $item['description'])->first();

                if ($product) {
                    $product->stock -= $item['quantity'];
                    $product->save();
                    if (explode('/', $checkout_session['cancel_url'])[3] == 'address-form') {
                        // Delete the product from cart
                        $user->cart->products()->detach($product->id);
                    }

                    $orderDetail = new OrderDetail();
                    $orderDetail->order_id = $order->id;
                    $orderDetail->img = $product->url_img1;
                    $orderDetail->name = $product->name;
                    $orderDetail->brand = $product->brand->name;
                    $orderDetail->quantity = $item['quantity'];
                    $orderDetail->unit_price = $product->price;
                    $orderDetail->save();
                }
            }

            return ApiResponse::success($order->load('orderDetails'), 'Pedido creado correctamente');
        } catch (\Exception $e) {
            // Manejar errores, por ejemplo:
            return ApiResponse::error('Error al procesar el pedido ' . $e->getMessage());
        }
    }

    /**
     * Function that get the orders
     */
    public function getOrders(Request $request)
    {
        // Get the user who made the request
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        // Verify if the user exist
        if (!$user) {
            return ApiResponse::error(null, 'Usuario no encontrado');
        }

        // Get the user's orders sorted by descending creation date
        $userOrders = $user->orders()->with('orderDetails')->orderByDesc('created_at')->get();

        return ApiResponse::success($userOrders, 'Pedidos del usuario obtenidos correctamente');
    }

    /**
     * Function to cancel an order by changing the order status, canceling and returning the payment
     * to the user, and updating the product stock.
     */
    public function cancelOrder(Request $request)
    {
        try {
            $orderToCancel = $request->order;
            // Get the order from the request
            $order = Order::find($orderToCancel['id']);

            // If the order exists
            if ($order) {
                // Use a transaction to ensure data integrity
                DB::beginTransaction();

                // Change the order status to Canceled
                $order->status = 'Cancelado';
                // Save the changes
                $order->save();

                // Refunds the stripe payment
                $stripe = new \Stripe\StripeClient(env('stripeSecretKey'));
                $stripe->refunds->create(['payment_intent' => $order->payment_id]);

                // Return and update the products stock
                foreach ($orderToCancel['order_details'] as $productToReturn) {
                    $product = Product::where('name', $productToReturn['name'])->first();
                    if ($product) {
                        $product->stock += $productToReturn['quantity'];
                        $product->save();
                    }
                }

                // Commit the transaction
                DB::commit();

                return ApiResponse::success($order, 'Pedido cancelado exitosamente');
            } else {
                return ApiResponse::error('Pedido no encontrado');
            }
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();
            return ApiResponse::error('Ha habido un error al cancelar el pedido: ' . $e->getMessage());
        }
    }
}
