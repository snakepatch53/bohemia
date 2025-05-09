<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'category_food_id',
    ];

    public function category()
    {
        return $this->belongsTo(CategoryFood::class);
    }
}
