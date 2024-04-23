<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource; // Corrección en el espacio de nombres
use App\Http\Responses\ApiResponse;
use App\Models\Video;
use Illuminate\Http\Request;
use App\Models\UserLikeDislikeVideo;


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

        if (!$video) {
            return response()->json(['error' => 'Video no encontrado'], 404);
        }

        if ($video->dislikes > 0) {
            $video->dislikes--;
        }

        $video->likes++;
        $video->save();

        return response()->json(['message' => 'Likes actualizados correctamente']);
    }

    public function updateDislikes(Request $request, $id) {
        $video = Video::find($id);

        if (!$video) {
            return response()->json(['error' => 'Video no encontrado'], 404);
        }

        if ($video->likes > 0) {
            $video->likes--;
        }

        $video->dislikes++;
        $video->save();

        return response()->json(['message' => 'Dislikes actualizados correctamente']);
    }
}
