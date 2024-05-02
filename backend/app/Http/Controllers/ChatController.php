<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function completions(Request $request)
    {
        dd($request->all()); // Mostrará los datos recibidos desde Angular
        // Aquí puedes manejar la lógica para procesar la solicitud
        // y luego enviarla al servicio de ChatGPT o realizar cualquier otra acción necesaria.

        // Ejemplo de procesamiento simple:
        $prompt = $request->input('prompt');
        $max_tokens = $request->input('max_tokens', 150);

        // Aquí podrías llamar al servicio de ChatGPT o realizar alguna otra acción

        return response()->json(['message' => 'Request received', 'prompt' => $prompt]);
    }
}
