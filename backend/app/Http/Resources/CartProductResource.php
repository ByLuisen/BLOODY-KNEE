<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product_id,
            'brand_id' => $this->product->brand_id,
            'brand' => $this->product->brand->name,
            'category_id' => $this->product->category_id,
            'category' => $this->product->category->name,
            'name' => $this->product->name,
            'description' => $this->product->description,
            'price' => $this->product->price,
            'stock' => $this->product->stock,
            'url_img1' => $this->product->url_img1,
            'url_img2' => $this->product->url_img2,
            'url_img3' => $this->product->url_img3,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
