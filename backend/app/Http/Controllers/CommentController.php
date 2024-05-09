<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\User;
use App\Models\UserCommentVideo;
use App\Http\Responses\ApiResponse;

class CommentController extends Controller
{
    public function index()
    {
        try {
            $comments = UserCommentVideo::get();

            return ApiResponse::success(CommentResource::collection($comments), 'Lista de dietas obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }

    public function commentById($id)
    {
        try {
            // Buscar los comentarios asociados al video especificado por su ID, ordenados por fecha de creación
            $comments = UserCommentVideo::with('user')
                                        ->where('video_id', $id)
                                        ->orderBy('created_at', 'desc') // Ordenar por fecha de creación, puedes cambiar 'desc' a 'asc' si deseas orden ascendente
                                        ->get();

            // Verificar si se encontraron comentarios
            if ($comments->isNotEmpty()) {
                // Retorna la colección de comentarios en forma de recurso
                return ApiResponse::success($comments, 'Lista de comentarios obtenida correctamente');
            } else {
                // Retorna un mensaje de error si no se encontraron comentarios
                return ApiResponse::error('No se encontraron comentarios para el video con el ID proporcionado');
            }
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }






    public function countAndUpdateComments($videoId)
    {
        try {
            // Contar los comentarios asociados al video
            $commentCount = UserCommentVideo::where('video_id', $videoId)->count();

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

    public function addComment(Request $request)
    {
        try {
            // Validar los datos del comentario
            $request->validate([
                'video_id' => 'required|exists:videos,id',
                'comment' => 'required|string|max:255',
                'email' => 'required|email', // Asegúrate de que el campo de email esté presente y sea un correo electrónico válido
                'connection' => 'required', // Asegúrate de que el campo de connection esté presente
            ]);

            // Obtener el correo electrónico y la conexión del cuerpo de la solicitud
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Encuentra al usuario por su correo electrónico y conexión
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Verifica si el usuario existe
            if ($user) {
                // Crear un nuevo comentario con los datos del usuario
                $comment = new UserCommentVideo();
                $comment->user_id = $user->id; // Asigna el user_id del usuario encontrado
                $comment->video_id = $request->video_id;
                $comment->comment = $request->comment;
                $comment->date = now(); // Establecer la fecha actual
                $comment->save();

                // Incluir los datos del usuario en la respuesta
                $comment->user = $user;

                return ApiResponse::success($comment, 'Comentario añadido correctamente');
            } else {
                // Manejar el caso en el que el usuario no fue encontrado
                return ApiResponse::error('El usuario no fue encontrado.');
            }
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }

}
