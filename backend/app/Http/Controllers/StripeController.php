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

        // Get all the products
        $products = $request->input('products');
        $lineItems = [];

        // Set up for the checkout payment setting the currency, name, price and quantity of the product
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

        /**
         * Create the checkout session passing the user email, the line items, the mode that will
         * be payment since it is a single payment, the shipping_options to collect shipping, the
         * success_url that will go to the order summary if the purchase is successful and the cancel_url
         * if the client doesn't want to complete the payment.
         */
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

        /**
         * Create the checkout session passing the user email, the line items that in this case is the price_id
         * of the susbcription (It is configured in stripe since for the charge to be recurring it has to be previously
         * created in stripe, otherwise the charge could not be recurring), the mode that will
         * be subscription for a recurrent payment, the success_url if the purchase is successful and the cancel_url
         * if the client doesn't want to complete the payment.
         */
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

    /**
     * Function that returns the checkout object get by the checkout session id that contains all
     * the information about the checkout
     */
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

    /**
     * Function that returns the line items for the checkouts used to purchase products for the merchandise.
     */
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
