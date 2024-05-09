<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class StripeController extends Controller
{
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
            'success_url' => $request->input('origin') . '/order-summary',
            'cancel_url' => $request->input('href'),
            'automatic_tax' => [
                'enabled' => true,
            ],
        ]);

        return ApiResponse::success(['checkout_url' => $checkout_session->url], 'Checkout Seesion creada correctamente');
    }

    public function subscription(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('stripeSecretKey'));

        $checkout_session = \Stripe\Checkout\Session::create([
            'customer_email' => $request->input('user_email'),
            'line_items' => [[
                'price' => $request->input('price_id'),
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'payment_method_configuration' => 'pmc_1P680fByhCj4S0lhpHMBLSHL',
            'success_url' => $request->input('href') . '?success=true',
            'cancel_url' => $request->input('href'),
        ]);

        return ApiResponse::success(['checkout_url' => $checkout_session->url], 'Checkout Seesion creada correctamente');
    }
}
