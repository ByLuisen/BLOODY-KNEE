<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * Obtiene los detalles de la orden asociados a la orden.
     */
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
