<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CartStoreProduct extends Pivot
{
    use HasFactory;

    // Define the table name
    protected $table = 'cart_store_products';

    // Define the fillable fields
    protected $fillable = [
        'product_id',
        'cart_id',
        'quantity'
    ];

    // Define a relationship with the Product model
    public function product()
    {
        // Define a belongsTo relationship with the Product model, specifying the foreign key 'product_id'
        return $this->belongsTo(Product::class, 'product_id');
    }
}
