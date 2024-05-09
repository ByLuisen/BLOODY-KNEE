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
            $video = Video::where('id', $id)->get();

            return ApiResponse::success(VideoResource::collection($video), 'Video único por id obtenido correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Update likes for a video.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
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
                // Check if the user has already liked this video
                if ($video->likedByUsers->contains($user)) {
                    return response()->json(['error' => 'Ya diste like a este video'], 400);
                }

                // Remove dislike if exists
                if ($video->dislikedByUsers->contains($user)) {
                    $video->dislikedByUsers()->detach($user);
                    $video->dislikes--;
                }

                // Register the user's like in the pivot table
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

    /**
     * Update dislikes for a video.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
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
                // Check if the user has already disliked this video
                if ($video->dislikedByUsers->contains($user)) {
                    return response()->json(['error' => 'Ya diste dislike a este video'], 400);
                }

                // Remove like if exists
                if ($video->likedByUsers->contains($user)) {
                    $video->likedByUsers()->detach($user);
                    $video->likes--;
                }

                // Register the user's dislike in the pivot table
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

}
