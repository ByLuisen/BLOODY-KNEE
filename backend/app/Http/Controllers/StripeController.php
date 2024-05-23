<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Stripe\StripeClient;

class StripeController extends Controller
{
    /**
     * Process payment for products.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function payment(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('stripeSecretKey'));

        $products = $request->input('products');
        $lineItems = [];

        foreach ($products as $product) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $product['name'],
                    ],
                    'unit_amount' => $product['price'] * 100,
                    'tax_behavior' => 'inclusive',
                ],
                'quantity' => $product['quantity'],
            ];
        }

        $checkout_session = \Stripe\Checkout\Session::create([
            'customer_email' => $request->input('user_email'),
            'line_items' => $lineItems,
            'mode' => 'payment',
            'payment_method_configuration' => 'pmc_1P680fByhCj4S0lhpHMBLSHL',
            'shipping_options' => [
                [
                    'shipping_rate' => 'shr_1PEBzmByhCj4S0lh7TNdgvlB'
                ]
            ],
            'success_url' => $request->input('origin') . '/order-summary?success=true&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $request->input('href'),
            'automatic_tax' => [
                'enabled' => true,
            ],
        ]);

        return ApiResponse::success(['checkout_url' => $checkout_session->url], 'Checkout Seesion payment creada correctamente');
    }

    /**
     * Process subscription payment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscription(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('stripeSecretKey'));

        $checkout_session = \Stripe\Checkout\Session::create([
            'customer_email' => $request->input('user_email'),
            'line_items' => [
                [
                    'price' => $request->input('price_id'),
                    'quantity' => 1,
                ]
            ],
            'mode' => 'subscription',
            'payment_method_configuration' => 'pmc_1P680fByhCj4S0lhpHMBLSHL',
            'success_url' => $request->input('href') . '?success=true&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $request->input('href'),
        ]);

        return ApiResponse::success(['checkout_url' => $checkout_session->url], 'Checkout Seesion subscription creada correctamente');
    }

    public function retrieveCheckoutSession(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('stripeSecretKey'));
        try {
            $checkout_session = \Stripe\Checkout\Session::retrieve(
                $request->checkout_session_id,
                []
            );
        } catch (\Exception $e) {
            return ApiResponse::success(null, 'La checkout session no existe');
        }


        return ApiResponse::success(['checkout_session' => $checkout_session], 'Checkout Seesion obtenida correctamente');
    }

    public function retrieveLineItems(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('stripeSecretKey'));
        try {
            $line_items = \Stripe\Checkout\Session::allLineItems(
                $request->checkout_session_id,
                []
            );
        } catch (\Exception $e) {
            return ApiResponse::success(null, 'Line Items no obtenidos');
        }

        return ApiResponse::success(['line_items' => $line_items], 'Line Items obtenido correctamente');
    }
}
