<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'dni',
    ];

    public function songRequests()
    {
        return $this->hasMany(SongRequest::class);
    }
}
