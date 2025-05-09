<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryFood extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function foods()
    {
        return $this->hasMany(Food::class);
    }
}
