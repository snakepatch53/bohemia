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

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute()
    {
        if ($this->image === null) return asset('storage/' . config('paths.info_image') . '/food.webp');
        return asset('storage/' . config('paths.food_image') . '/' . $this->image);
    }

    public function category()
    {
        return $this->belongsTo(CategoryFood::class, 'category_food_id');
    }
}
