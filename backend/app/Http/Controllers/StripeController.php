<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {

        $stripe = new StripeClient(env('stripeSecretKey'));
        header('Content-Type: application/json');

        $YOUR_DOMAIN = 'http://localhost:4200';

        $checkout_session = $stripe->checkout->sessions->create([
            'ui_mode' => 'embedded',
            'mode' => 'payment',
            'customer_email' => 'luisenric32@gmail.com',
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Basic'
                        ],
                        'unit_amount' => 1000, // Monto en centavos (en este ejemplo, 5.00 EUR)
                    ],
                    'quantity' => 1,
                ],
            ],
            'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
            // 'success_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
            'automatic_tax' => [
                'enabled' => true,
            ],
        ]);

        echo json_encode(['clientSecret' => $checkout_session->client_secret]);
    }
}
