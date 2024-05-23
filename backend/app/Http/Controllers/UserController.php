<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Quote;
use App\Models\User;
use App\Models\UserSubscribeQuote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * New users function that create a user and assign the Basic role if the user
     * doesn't exist
     */
    public function newUser(Request $request)
    {
        try {
            $user = $request->all();
            // Check if the user already exists by email and connection
            $existingUser = User::where('email', $user['email'])->where('connection', explode('|', $user['sub'])[0])->first();

            // If the user does not exist, create a new one
            if (!$existingUser) {
                $newUser = new User();
                $newUser->picture = $request['picture'];
                $newUser->nickname = $request['nickname'];
                $newUser->email = $request['email'];
                $newUser->connection = explode('|', $request['sub'])[0];
                $newUser->save();

                // And assign the Basic role
                $newUser->assignRole('Basic');

                return ApiResponse::success(null, 'Usuario creado correctamente');
            }
        } catch (\Exception $e) {
            // Manejar errores, loguear, etc.
            return ApiResponse::error('El usuario ya existe');
        }
    }

    /**
     * Function for get the user role
     */
    public function getRole(Request $request)
    {
        // Find the user based on email and connection
        $user = User::where('email', $request->email)
            ->where('connection', $request->connection)
            ->first();

        // Check if the user was found
        if ($user === null) {
            return ApiResponse::error('Usuario no encontrado', 404);
        }

        // Get user role names
        $roles = $user->getRoleNames();

        // Check if the user has assigned roles
        if ($roles->isEmpty()) {
            return ApiResponse::error('El usuario no tiene roles asignados', 404);
        }

        // Return the first role found
        return ApiResponse::success($roles[0], 'Role obtenido correctamente');
    }

    /**
     * Function for update the user's role
     */
    public function updateRole(Request $request)
    {
        try {
            // If set the sub_id in the request
            if ($request->sub_id) {
                // Validate if an subscription exist with the same sub_id
                $currentSubscription = UserSubscribeQuote::where('sub_id', $request->sub_id)->first();
                if ($currentSubscription && $currentSubscription->status == 'Active') {
                    return ApiResponse::success($currentSubscription->quote->type, 'Rol actualizado correctamente');
                } elseif ($currentSubscription && $currentSubscription->status == 'Cancelled') {
                    $currentSubscription = UserSubscribeQuote::where('status', 'Active')->first();
                    return ApiResponse::success($currentSubscription->quote->type, 'Rol actualizado correctamente');
                } elseif ($request->role == 'Basic') {
                    $currentSubscription = UserSubscribeQuote::where('status', 'Active')->first();
                    return ApiResponse::success($currentSubscription->quote->type, 'Rol actualizado correctamente');
                }
            }

            // Find the user
            $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

            $roles = $user->getRoleNames(); // Get all user roles

            // If the user has the Admin role
            if ($roles[0] == 'Admin') {
                // Return the Admin role without modify
                return ApiResponse::success('Admin', 'Eres Admin bobo');
            }

            // Remove all roles the user currently has
            foreach ($roles as $rol) {
                $user->removeRole($rol);
            }

            $user->assignRole($request->role); // Assign the new role to the user

            // Find the quote
            $quote = Quote::where('type', $request->role)->first();
            // Get the active subscriptions
            $activeSubscriptions = UserSubscribeQuote::where('user_id', $user->id)->where('status', 'Active')->get();

            if ($activeSubscriptions) {
                // Cancel the active subscriptions
                foreach ($activeSubscriptions as $activeSubscription) {
                    $stripe = new \Stripe\StripeClient(env('stripeSecretKey'));
                    if ($activeSubscription->sub_id) {
                        $stripe->subscriptions->cancel($activeSubscription->sub_id, []);
                    }
                    $activeSubscription->status = 'Cancelled';
                    $activeSubscription->save();
                }
            }

            // Create the new subscription
            $subscription = UserSubscribeQuote::create([
                'user_id' => $user->id,
                'quote_id' => $quote->id,
                'sub_id' => $request->sub_id ? $request->sub_id : null,
                'status' => 'Active',
            ]);

            return ApiResponse::success($request->role, 'Rol actualizado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar el rol ' . $e->getMessage());
        }
    }

    /**
     * Store the user shipping address to use later when creating the order
     */
    public function storeUserAddress(Request $request)
    {

        // Define validation rules
        $rules = [
            'shippingAddress.country' => 'required|string',
            'shippingAddress.fullName' => 'required|string|regex:/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ\'\s]*$/',
            'shippingAddress.phone' => 'required|regex:/^(\+)?[0-9]+$/',
            'shippingAddress.address' => 'required|string|regex:/^[a-zA-Z0-9ñáéíóúÑÁÉÍÓÚªº\'·\s\-\.\,]*$/',
            'shippingAddress.province' => 'nullable|string|regex:/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ\'\s]*$/',
            'shippingAddress.city' => 'required|string|regex:/^[a-zA-ZáéíóúñçÁÉÍÓÚÑÇ\'\s]*$/',
            'shippingAddress.zip' => 'required|regex:/^\d{4,5}$/',
            'email' => 'required|email',
            'connection' => 'required|string',
        ];

        // Custom error messages (optional)
        $messages = [
            'shippingAddress.fullName.regex' => 'El nombre completo solo puede contener letras y espacios.',
            'shippingAddress.phone.regex' => 'El número de teléfono debe ser válido.',
            'shippingAddress.address.regex' => 'La dirección solo puede contener letras, números y caracteres especiales permitidos.',
            'shippingAddress.province.regex' => 'La provincia solo puede contener letras y espacios.',
            'shippingAddress.city.regex' => 'La ciudad solo puede contener letras y espacios.',
            'shippingAddress.zip.regex' => 'El código postal debe tener 4 o 5 dígitos.',
        ];

        // Validate the request
        $request->validate($rules, $messages);
        $shippingAddress = $request->shippingAddress;

        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        // If the user exist assign the shipping data
        if ($user) {
            $user->country = $shippingAddress['country'];
            $user->full_name = $shippingAddress['fullName'];
            $user->phone = $shippingAddress['phone'];
            $user->address = $shippingAddress['address'];
            $user->province = $shippingAddress['province'];
            $user->city = $shippingAddress['city'];
            $user->zip = $shippingAddress['zip'];

            $user->save();

            return ApiResponse::success($user, 'Dirección guardada correctamente');
        } else {
            return ApiResponse::error('Usuario no encontrado');
        }
    }
}
