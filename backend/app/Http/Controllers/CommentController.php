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
    /**
     * Retrieve all comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Retrieve all comments from the database
            $comments = UserCommentVideo::get();

            // Return success response with the list of comments
            return ApiResponse::success(CommentResource::collection($comments), 'Lista de dietas obtenida correctamente');
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Retrieve comments for a specific video by its ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function commentById($id)
    {
        try {
            // Find comments associated with the specified video ID, ordered by creation date
            $comments = UserCommentVideo::with('user')
                ->where('video_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Return the collection of comments as a resource
            return ApiResponse::success($comments, 'Lista de comentarios obtenida correctamente');
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Count comments for a video and update the video's comments count.
     *
     * @param  int  $videoId
     * @return \Illuminate\Http\JsonResponse
     */
    public function countAndUpdateComments($videoId)
    {
        try {
            // Count comments associated with the video
            $commentCount = UserCommentVideo::where('video_id', $videoId)->count();

            // Update the "comments" field in the videos table with the obtained count
            $video = Video::findOrFail($videoId);
            $video->comments = $commentCount;
            $video->update();

            return ApiResponse::success(null, 'Conteo y actualización de comentarios realizados correctamente');
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Add a new comment for a video.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addComment(Request $request)
    {
        try {
            // Validate the comment data
            $request->validate([
                'video_id' => 'required|exists:videos,id',
                'comment' => 'required|string|max:255',
                'email' => 'required|email',
                'connection' => 'required',
            ]);

            // Get email and connection from the request body
            $email = $request->input('email');
            $connection = $request->input('connection');

            // Find the user by email and connection
            $user = User::where('email', $email)
                ->where('connection', $connection)
                ->first();

            // Check if the user exists
            if ($user) {
                // Create a new comment with user's data
                $comment = new UserCommentVideo();
                $comment->user_id = $user->id;
                $comment->video_id = $request->video_id;
                $comment->comment = $request->comment;
                $comment->date = now();
                $comment->save();

                // Include user data in the response
                $comment->user = $user;

                return ApiResponse::success($comment, 'Comentario añadido correctamente');
            } else {
                // Handle case where user is not found
                return ApiResponse::error('El usuario no fue encontrado.');
            }
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Edit an existing comment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $commentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function editComment(Request $request, $commentId)
    {
        try {
            // Validate the comment data
            $request->validate([
                'comment' => 'required|string|max:255',
            ]);

            // Find the comment by its ID
            $comment = UserCommentVideo::findOrFail($commentId);

            // Update the comment with new data
            $comment->comment = $request->comment;
            $comment->save();

            return ApiResponse::success($comment, 'Comentario editado correctamente');
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Delete a comment.
     *
     * @param  int  $commentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteComment($commentId)
    {
        try {
            // Find the comment by its ID
            $comment = UserCommentVideo::findOrFail($commentId);

            // Delete the comment
            $comment->delete();

            return ApiResponse::success(null, 'Comentario eliminado correctamente');
        } catch (\Exception $e) {
            // Log the error or perform other actions as needed
            return ApiResponse::error($e->getMessage());
        }
    }
}
