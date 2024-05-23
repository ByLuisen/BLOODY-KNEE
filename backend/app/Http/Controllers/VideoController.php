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
    /**
     * Retrieve all videos.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $videos = Video::get();

            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Retrieve videos by modality and type.
     *
     * @param  int  $modality_id
     * @param  int  $type_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function modalities($modality_id, $type_id)
    {

        try {
            $videos = Video::where('modality_id', $modality_id)
                ->where('type_id', $type_id)
                ->get();

            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos ordenada por modalidad y tipo obtenida correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Retrieve a video by its ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
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


    public function updateDislikes(Request $request, $id)
    {
        try {
            // Obtener el correo electrónico y la conexión del cuerpo de la solicitud
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Encuentra al usuario por su correo electrónico y conexión
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Verificar si el usuario existe
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Encontrar el video por su ID
            $video = Video::findOrFail($id);

            // Verificar si el video existe
            if (!$video) {
                return response()->json(['error' => 'Video no encontrado'], 404);
            }

            // Verificar si el usuario ya ha dado dislike a este video con el tipo "dislike"
            $existingDislike = $video->dislikedByUsers()->where('type', 'dislike')->where('user_id', $user->id)->first();

            if ($existingDislike) {
                // Eliminar el dislike existente
                $video->dislikedByUsers()->detach($user);
                // Decrementar el contador de dislikes del video
                $video->dislikes--;
                $video->save();
                return response()->json(['message' => 'Dislike quitado exitosamente']);
            }

            // Eliminar like si existe
            if ($video->likedByUsers->contains($user)) {
                $video->likedByUsers()->detach($user);
                $video->likes--;
            }

            // Registrar el dislike del usuario en la tabla intermedia
            $user->likes()->attach($video->id, ['type' => 'dislike', 'date' => now()]);
            $video->dislikes++;
            $video->save();

            return response()->json(['message' => 'Dislike registrado correctamente']);
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    public function updateLikes(Request $request, $id)
    {
        try {
            // Obtener el correo electrónico y la conexión del cuerpo de la solicitud
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Encuentra al usuario por su correo electrónico y conexión
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Verificar si el usuario existe
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Encontrar el video por su ID
            $video = Video::findOrFail($id);

            // Verificar si el video existe
            if (!$video) {
                return response()->json(['error' => 'Video no encontrado'], 404);
            }

            // Verificar si el usuario ya ha dado like a este video con el tipo "like"
            //  if ($video->likedByUsers()->where('type', 'like')->where('user_id', $user->id)->exists()) {
            // return response()->json(['message' => 'Ya diste like a este video'], 400);
            // }

            $existingLike = $video->likedByUsers()->where('type', 'like')->where('user_id', $user->id)->first();

            if ($existingLike) {
                // Decrementar el contador de likes del video
                $video->likedByUsers()->detach($user);
                $video->likes--;
                $video->save();

                return response()->json(['message' => 'Like quitado exitosamente']);
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
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }


    /**
     * Increment the visit count for a video.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function incrementVideoVisits(Request $request, $id)
    {
        try {
            // Get the user by their email if provided
            $user = null;
            $email = $request->input('email');
            if ($email) {
                $user = User::where('email', $email)->first();
            }

            // Get the video by its ID
            $video = Video::findOrFail($id);


            // If a user is found, record the user's visit to the video
            if ($user) {
                // Use the attach() method on the pivot table relationship
                $user->videos()->attach($video->id, ['date' => now()]);
            }

            // Increment the video visits
            $video->visits += 1;
            $video->save();

            return ApiResponse::success(null, 'Visita registrada correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Create a new video.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string',
                'description' => 'nullable|string',
                'url' => 'required|url',
                'modality_id' => 'required|exists:modalities,id',
                'type_id' => 'required|exists:types,id',
            ]);

            // Create the video
            $video = Video::create($validatedData);

            return ApiResponse::success(new VideoResource($video), 'Video creado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    /**
     * Update a video's details.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Find the video by its ID
            $video = Video::findOrFail($id);

            // Check if the video exists
            if (!$video) {
                return ApiResponse::error('Video no encontrado', 404);
            }

            // Update the video's data with the data provided in the request
            $video->update($request->all());

            return ApiResponse::success(new VideoResource($video), 'Video actualizado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    /**
     * Delete a video.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Find the video by its ID
            $video = Video::findOrFail($id);

            // Check if the video exists
            if (!$video) {
                return ApiResponse::error('Video no encontrado', 404);
            }

            // Delete the video
            $video->delete();

            return ApiResponse::success(null, 'Video eliminado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    public function saveAsFavorite(Request $request, $videoId)
    {
        try {
            // Get the user by their email if provided
            $user = null;
            $email = $request->input('email');
            if ($email) {
                $user = User::where('email', $email)->first();
            }

            // Check if the user exists
            if (!$user) {
                return ApiResponse::error('Usuario no encontrado', 404);
            }

            // Check if the video is already marked as favorite for this user
            if ($user->favorites()->where('video_id', $videoId)->exists()) {
                return ApiResponse::error('El video ya está marcado como favorito para este usuario');
            }

            // Get the video by its ID
            $video = Video::find($videoId);

            // Check if the video exists
            if (!$video) {
                return ApiResponse::error('Video no encontrado', 404);
            }

            // Attach the video as favorite for the user
            $user->favorites()->attach($videoId);

            return ApiResponse::success(null, 'Video guardado como favorito correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }


    /**
     *
     */
    public function getFavoriteVideos(Request $request)
    {
        try {
            // Get the user by their email if provided
            $user = null;
            $email = $request->input('email');
            if ($email) {
                $user = User::where('email', $email)->first();
            }

            // Check if the user exists
            if (!$user) {
                return ApiResponse::error('Usuario no encontrado', 404);
            }

            // Obtain all the videos the user has saved.
            $favoriteVideos = $user->favorites;

            return ApiResponse::success(VideoResource::collection($favoriteVideos), 'Lista de videos favoritos obtenida correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
