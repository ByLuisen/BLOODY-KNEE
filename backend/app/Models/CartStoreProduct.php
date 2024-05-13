<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CartStoreProduct extends Pivot
{
    use HasFactory;

    protected $table = 'cart_store_products';

    protected $fillable = [
        'product_id',
        'cart_id',
        'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
