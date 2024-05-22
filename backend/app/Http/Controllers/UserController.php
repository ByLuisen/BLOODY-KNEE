<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function newUser(Request $request)
    {
        try {
            $user = $request->all();
            // Verifica si el usuario ya existe por email y connection
            $existingUser = User::where('email', $user['email'])->where('connection', explode('|', $user['sub'])[0])->first();

            // Si el usuario no existe, crea uno nuevo
            if (!$existingUser) {
                $newUser = new User();
                $newUser->picture = $request['picture'];
                $newUser->nickname = $request['nickname'];
                $newUser->email = $request['email'];
                $newUser->connection = explode('|', $request['sub'])[0];
                $newUser->save();

                $newUser->assignRole('Basic');

                return ApiResponse::success(null, 'Usuario creado correctamente');
            }
        } catch (\Exception $e) {
            // Manejar errores, loguear, etc.
            return ApiResponse::error(null, 'El usuario ya existe');
        }
    }

    public function getRole(Request $request)
    {
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        $role = $user->getRoleNames();

        return ApiResponse::success($role[0], 'Role obtenido correctamente');
    }

    public function updateRole(Request $request)
    {
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        $roles = $user->getRoleNames(); // Elimina todos los roles del usuario

        foreach ($roles as $rol) {
            $user->removeRole($rol);
        }

        $user->assignRole($request->role); // Asigna el nuevo rol al usuario

        return ApiResponse::success($request->role, 'Role actualizado correctamente');
    }

    public function storeUserAddress(Request $request)
    {

        // Definir las reglas de validación
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

        // Mensajes de error personalizados (opcional)
        $messages = [
            'shippingAddress.fullName.regex' => 'El nombre completo solo puede contener letras y espacios.',
            'shippingAddress.phone.regex' => 'El número de teléfono debe ser válido.',
            'shippingAddress.address.regex' => 'La dirección solo puede contener letras, números y caracteres especiales permitidos.',
            'shippingAddress.province.regex' => 'La provincia solo puede contener letras y espacios.',
            'shippingAddress.city.regex' => 'La ciudad solo puede contener letras y espacios.',
            'shippingAddress.zip.regex' => 'El código postal debe tener 4 o 5 dígitos.',
        ];

        // Validar la solicitud
        $request->validate($rules, $messages);
        $shippingAddress = $request->shippingAddress;

        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

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
            return ApiResponse::error(null, 'Usuario no encontrado');
        }
    }
}
