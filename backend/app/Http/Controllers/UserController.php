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

    public function getRole(Request $request){
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        $role = $user->getRoleNames();

        return ApiResponse::success($role[0], 'Role obtenido correctamente');
    }

    public function updateRole(Request $request) {
        $user = User::where('email', $request->email)->where('connection', $request->connection)->first();

        $roles = $user->getRoleNames(); // Elimina todos los roles del usuario

        foreach ($roles as $rol) {
            $user->removeRole($rol);
        }

        $user->assignRole($request->role); // Asigna el nuevo rol al usuario

        return ApiResponse::success($request->role, 'Role actualizado correctamente');
    }
}
