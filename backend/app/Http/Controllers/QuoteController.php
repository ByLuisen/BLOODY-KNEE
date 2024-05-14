<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuoteResource;
use App\Http\Responses\ApiResponse;
use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $quotes = Quote::get();

            return ApiResponse::success(QuoteResource::collection($quotes), 'Lista de quotas obtenida correctamente');
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage());
        }
    }
}
