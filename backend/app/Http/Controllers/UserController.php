<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function newUser(Request $request)
    { {
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
                    // Asigna otros campos si es necesario
                    $newUser->save();

                    $newUser->assignRole('Basic');

                    return ApiResponse::success(null, 'Usuario creado correctamente');
                }
            } catch (\Exception $e) {
                // Manejar errores, loguear, etc.
                return ApiResponse::error(null, 'El usuario ya existe');
            }
        }
    }
}
