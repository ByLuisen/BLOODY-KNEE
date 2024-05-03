<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource; // Corrección en el espacio de nombres
use App\Http\Responses\ApiResponse;
use App\Models\Video;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UserLikeDislikeVideo;
use App\Models\UserVisitVideo;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{
    public function index()
    {
        try {
            $videos = Video::get();

            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }

    public function modalities($modality_id, $type_id)
    {

        try {
            $videos = Video::where('modality_id', $modality_id)
                ->where('type_id', $type_id)
                ->get();

            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos ordenada por modalidad y tipo obtenida correctamente');
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }
    public function videoById($id)
{
    try {
        // Utiliza first() para obtener solo el primer objeto
        $video = Video::where('id', $id)->first();

        // Verifica si se encontró un video
        if ($video) {
            return ApiResponse::success(new VideoResource($video), 'Video único por id obtenido correctamente');
        } else {
            return ApiResponse::error('No se encontró ningún video con el ID proporcionado');
        }
    } catch (\Exception $e) {
        // Loguear el error o realizar otras acciones según tus necesidades
        return ApiResponse::error($e->getMessage());
    }
}


    public function updateLikes(Request $request, $id)
    {
        try {
            $email = $request->input('email');
            $user = null;

            if ($email) {
                $user = User::where('email', $email)->first();
            }

            $video = Video::findOrFail($id);

            if (!$video) {
                return response()->json(['error' => 'Video no encontrado'], 404);
            }

            if ($user) {
                // Verificar si el usuario ya ha dado like a este video
                if ($video->likedByUsers->contains($user)) {
                    return response()->json(['error' => 'Ya diste like a este video'], 400);
                }

                // Eliminar dislike si existe
                if ($video->dislikedByUsers->contains($user)) {
                    $video->dislikedByUsers()->detach($user);
                    $video->dislikes--;
                }

                // Registrar el like del usuario en la tabla intermedia
                $user->likes()->attach($video->id, ['type' => 'Like', 'date' => now()]);
                $video->likes++;
                $video->save();

                return response()->json(['message' => 'Likes actualizados correctamente']);
            } else {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error en updateLikes: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function updateDislikes(Request $request, $id)
{
    try {
        $email = $request->input('email');
        $user = null;

        if ($email) {
            $user = User::where('email', $email)->first();
        }

        $video = Video::findOrFail($id);

        if (!$video) {
            return response()->json(['error' => 'Video no encontrado'], 404);
        }

        if ($user) {
            // Verificar si el usuario ya ha dado dislike a este video
            if ($video->dislikedByUsers->contains($user)) {
                return response()->json(['error' => 'Ya diste dislike a este video'], 400);
            }

            // Eliminar like si existe
            if ($video->likedByUsers->contains($user)) {
                $video->likedByUsers()->detach($user);
                $video->likes--;
            }

            // Registrar el dislike del usuario en la tabla intermedia
            $user->likes()->attach($video->id, ['type' => 'Dislike', 'date' => now()]);
            $video->dislikes++;
            $video->save();

            return response()->json(['message' => 'Dislikes actualizados correctamente']);
        } else {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
    } catch (\Exception $e) {
        \Log::error('Error en updateDislikes: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    public function incrementVideoVisits(Request $request, $id)
    {
        try {
            // Obtener el usuario por su correo electrónico si se proporciona
            $user = null;
            $email = $request->input('email');
            if ($email) {
                $user = User::where('email', $email)->first();
            }

            // Obtener el video por su ID
            $video = Video::findOrFail($id);


            // Si se encontró un usuario, registrar la visita del usuario al video
            if ($user) {
                // Utiliza el método attach() en la relación con la tabla pivote
                $user->videos()->attach($video->id, ['date' => now()]);
            }

            // Incrementar las visitas del video
            $video->visits += 1;
            $video->save();

            return ApiResponse::success(null, 'Visita registrada correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
