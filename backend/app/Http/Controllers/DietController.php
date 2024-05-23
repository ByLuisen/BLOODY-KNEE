<?php

namespace App\Http\Controllers;

use App\Http\Resources\DietResource;
use Illuminate\Http\Request;
use App\Models\Diet;
use App\Http\Responses\ApiResponse;

class DietController extends Controller
{
    /**
     * Get all diets
     */
    public function index()
    {
        try {
            $diets = Diet::get();

            return ApiResponse::success(DietResource::collection($diets), 'Lista de dietas obtenida correctamente'); // Corrección en el nombre de la clase VideoResource
        } catch (\Exception $e) {
            // Loguear el error o realizar otras acciones según tus necesidades
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Store a newly created diet in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'required|string',
                'author' => 'required|string',
            ]);

            $diet = Diet::create($validatedData);

            return ApiResponse::success(new DietResource($diet), 'Dieta creada correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Update the specified diet in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Diet  $diet
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Diet $diet)
    {
        try {
            // Validar los datos de la dieta
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'required|string',
                'author' => 'required|string',
            ]);

            // Actualizar la dieta con los nuevos datos
            $diet->update($validatedData);

            // Devolver una respuesta JSON indicando éxito
            return ApiResponse::success($diet, 'Dieta actualizada correctamente');
        } catch (\Exception $e) {
            // En caso de error, devolver una respuesta JSON indicando el error
            return ApiResponse::error($e->getMessage());
        }
    }


    /**
     * Remove the specified diet from storage.
     *
     * @param  \App\Models\Diet  $diet
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Diet $diet)
    {
        try {
            $diet->delete();

            return ApiResponse::success([], 'Dieta eliminada correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }

    /**
     * Remove the specified diet from storage.
     *
     * @param  \App\Models\Diet  $diet
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/diet_images', $filename);

            return response()->json(['path' => $path, 'filename' => $filename]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
