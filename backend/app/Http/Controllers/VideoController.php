<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource;
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
            // Retrieve all videos from the database
            $videos = Video::get();

            // Return success response with the list of videos
            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos obtenida correctamente');
        } catch (\Exception $e) {
            // Return error response if an exception occurs
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
            // Retrieve videos based on modality and type from the database
            $videos = Video::where('modality_id', $modality_id)
                ->where('type_id', $type_id)
                ->get();

            // Return success response with the filtered list of videos
            return ApiResponse::success(VideoResource::collection($videos), 'Lista de videos ordenada por modalidad y tipo obtenida correctamente');
        } catch (\Exception $e) {
            // Return error response if an exception occurs
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
            // Retrieve a video by its ID
            $video = Video::where('id', $id)->first();

            // Check if the video exists
            if ($video) {
                // Return success response with the video data
                return ApiResponse::success(new VideoResource($video), 'Video único por id obtenido correctamente');
            } else {
                // Return error response if the video is not found
                return ApiResponse::error('No se encontró ningún video con el ID proporcionado');
            }
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return ApiResponse::error($e->getMessage());
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
            // Get user's email and connection from the request body
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Find the user by email and connection
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Check if the user exists
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Find the video by ID
            $video = Video::findOrFail($id);

            // Check if the video exists
            if (!$video) {
                return response()->json(['error' => 'Video no encontrado'], 404);
            }

            // Check if the user has already disliked the video
            $existingDislike = $video->dislikedByUsers()->where('type', 'dislike')->where('user_id', $user->id)->first();

            if ($existingDislike) {
                // Remove the existing dislike
                $video->dislikedByUsers()->detach($user);
                // Decrement the dislike count of the video
                $video->dislikes--;
                $video->save();
                return response()->json(['message' => 'Dislike quitado exitosamente']);
            }

            // Remove like if exists
            if ($video->likedByUsers->contains($user)) {
                $video->likedByUsers()->detach($user);
                $video->likes--;
            }

            // Record the user's dislike in the pivot table
            $user->likes()->attach($video->id, ['type' => 'dislike', 'date' => now()]);
            $video->dislikes++;
            $video->save();

            return response()->json(['message' => 'Dislike registrado correctamente']);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
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
            // Get user's email and connection from the request body
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Find the user by email and connection
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Check if the user exists
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Find the video by ID
            $video = Video::findOrFail($id);

            // Check if the video exists
            if (!$video) {
                return response()->json(['error' => 'Video no encontrado'], 404);
            }

            // Check if the user has already liked the video
            $existingLike = $video->likedByUsers()->where('type', 'like')->where('user_id', $user->id)->first();

            if ($existingLike) {
                // Decrement the like count of the video
                $video->likedByUsers()->detach($user);
                $video->likes--;
                $video->save();

                return response()->json(['message' => 'Like quitado exitosamente']);
            }

            // Remove dislike if exists
            if ($video->dislikedByUsers->contains($user)) {
                $video->dislikedByUsers()->detach($user);
                $video->dislikes--;
            }

            // Record the user's like in the pivot table
            $user->likes()->attach($video->id, ['type' => 'Like', 'date' => now()]);
            $video->likes++;
            $video->save();

            return response()->json(['message' => 'Likes actualizados correctamente']);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
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
            // Return error response if an exception occurs
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
            // Return error response if an exception occurs
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
            // Return error response if an exception occurs
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    /**
     * Save a video as favorite for a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $videoId
     * @return \Illuminate\Http\JsonResponse
     */
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
            // Return error response if an exception occurs
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Retrieve favorite videos for a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
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

            // Obtain all the videos the user has saved as favorites
            $favoriteVideos = $user->favorites;

            return ApiResponse::success(VideoResource::collection($favoriteVideos), 'Lista de videos favoritos obtenida correctamente');
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return ApiResponse::error($e->getMessage());
        }
    }
}
