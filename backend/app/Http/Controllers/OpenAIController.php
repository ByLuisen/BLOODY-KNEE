<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OpenAIController extends Controller
{
    public function sendMessage(Request $request)
    {
        $data = $request->all();
        $apiKey = env('OPENAI_API_KEY'); 
        $apiUrl = 'https://api.openai.com/v1/completions';

        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $apiKey,
        ];

        try {
            $response = Http::withHeaders($headers)->post($apiUrl, $data);
            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
}
