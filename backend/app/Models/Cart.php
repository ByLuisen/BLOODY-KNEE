<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    // Define a many-to-many relationship with the Product model through the cart_store_products table
    public function products()
    {
        // Define a belongsToMany relationship with the Product model, specifying the intermediate table 'cart_store_products'
        // Also, include the 'quantity' pivot column and timestamps
        return $this->belongsToMany(Product::class, 'cart_store_products')->withPivot('quantity')->withTimestamps();
    }
}
