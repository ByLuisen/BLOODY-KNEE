<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource; 
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Video;
use App\Http\Responses\ApiResponse;

class CommentController extends Controller
{
    public function index()
    {
        try {
            $comments = Comment::get();

            return ApiResponse::success(CommentResource::collection($comments), 'Lista de dietas obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }

    //  public function commentById($id)
    //  {
    //      try {
    //          // Utiliza first() para obtener solo el primer objeto
    //          $comments = Comment::where('video_id', $id)->get();
    
    //          // Verifica si se encontró un video
    //          if ($comments) {
    //              return ApiResponse::success(CommentResource::collection($comments), 'Lista de dietas obtenida correctamente');
    //          } else {
    //              return ApiResponse::error('No se encontró ningún video con el ID proporcionado');
    //          }
    //      } catch (\Exception $e) {
    //          // Loguear el error o realizar otras acciones según tus necesidades
    //         return ApiResponse::error($e->getMessage());
    //   }
    // }

    public function commentById($id)
    {
        try {
            $comments = Comment::where('video_id', $id)
                                ->join('users', 'user_comment_videos.user_id', '=', 'users.id')
                                ->select('user_comment_videos.*', 'users.nickname as user_nickname')
                                ->get();
    
            if ($comments) {
                return ApiResponse::success(CommentResource::collection($comments), 'Lista de comentarios obtenida correctamente');
            } else {
                return ApiResponse::error('No se encontraron comentarios para el video con el ID proporcionado');
            }
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }



    public function countAndUpdateComments($videoId)
    {
        try {
            // Contar los comentarios asociados al video
            $commentCount = Comment::where('video_id', $videoId)->count();

            // Actualizar el campo "comments" en la tabla de videos con el recuento obtenido
            $video = Video::findOrFail($videoId);
            $video->comments = $commentCount;
            $video->update();

            return ApiResponse::success(null, 'Conteo y actualización de comentarios realizados correctamente');
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }
}
