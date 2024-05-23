<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserSubscribeQuote extends Pivot
{

    protected $table = 'user_subscribe_quotes';

    protected $fillable = ['user_id', 'quote_id', 'sub_id', 'status'];

    public function quote()
    {
        return $this->belongsTo(Quote::class, 'quote_id');
    }
}
