<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource; // Corrección en el espacio de nombres
use App\Http\Responses\ApiResponse;
use App\Models\Video;
use Illuminate\Http\Request;
use App\Models\UserLikeDislikeVideo;
use App\Models\UserVisitVideo;


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

    public function modalities($modality_id, $type_id){
        
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
    public function videoById($id){
        
        try {
            $video = Video::where('id', $id)->get();
    
            return ApiResponse::success(VideoResource::collection($video), 'Video único por id obtenido correctamente');
            
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    
    }
    
    public function updateLikes(Request $request, $id) {
        $video = Video::find($id);
        $user = auth()->user(); // Obtener el usuario autenticado
    
        if (!$video) {
            return response()->json(['error' => 'Video no encontrado'], 404);
        }
    
        // Verificar si el usuario ya ha dado like a este video
        if ($video->likedByUsers->contains($user)) {
            return response()->json(['error' => 'Ya diste like a este video'], 400);
        }
    
        // Eliminar dislike si existe
        if ($video->dislikedByUsers->contains($user)) {
            $video->dislikedByUsers()->detach($user);
            $video->dislikes--;
        }
    
        $video->likes++;
        $video->save();
    
        // Registrar el like del usuario en la tabla intermedia
        $video->likedByUsers()->attach($user);
    
        return response()->json(['message' => 'Likes actualizados correctamente']);
    }
    
    
    public function updateDislikes(Request $request, $id) {
        $video = Video::find($id);
        $user = auth()->user(); // Obtener el usuario autenticado
    
        if (!$video) {
            return response()->json(['error' => 'Video no encontrado'], 404);
        }
    
        // Verificar si el usuario ya ha dado dislike a este video
        if ($video->dislikedByUsers->contains($user)) {
            return response()->json(['error' => 'Ya diste dislike a este video'], 400);
        }
    
        // Eliminar like si existe
        if ($video->likedByUsers->contains($user)) {
            $video->likedByUsers()->detach($user);
            $video->likes--;
        }
    
        $video->dislikes++;
        $video->save();
    
        // Registrar el dislike del usuario en la tabla intermedia
        $video->dislikedByUsers()->attach($user);
    
        return response()->json(['message' => 'Dislikes actualizados correctamente']);
    }

    public function incrementVideoVisits($id)
{
    try {
        $video = Video::find($id);

        if (!$video) {
            return ApiResponse::error('Video no encontrado', 404);
        }

        // Sumar +1 al contador de visitas
        $video->visits += 1;
        $video->save();

        // Registrar la visita del usuario en la tabla intermedia
        $user = auth()->user();
        if ($user) {
            $userVisitVideo = new UserVisitVideo([
                'user_id' => $user->id,
                'video_id' => $video->id,
                'date' => now(),
            ]);
            $userVisitVideo->save();
        }

        return ApiResponse::success(null, 'Visita registrada correctamente');
    } catch (\Exception $e) {
        // Loguear el error o realizar otras acciones según tus necesidades
        return ApiResponse::error($e->getMessage());
    }
}

    

    
}
