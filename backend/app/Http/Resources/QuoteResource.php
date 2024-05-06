<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "price" => $this->price,
            "description" => $this->description,
            "advantages" => $this->advantages,
            "type" => $this->type,
            "price_id" => $this->price_id
        ];
    }
}
