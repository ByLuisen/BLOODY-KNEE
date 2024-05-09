<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function completions(Request $request)
    {
        dd($request->all()); // Will display the data received from Angular

        $prompt = $request->input('prompt');
        $max_tokens = $request->input('max_tokens', 150);

        return response()->json(['message' => 'Request received', 'prompt' => $prompt]);
    }
}
