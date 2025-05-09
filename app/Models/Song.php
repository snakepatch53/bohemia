<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'title',
        'artist',
        'gender'
    ];

    public function songRequests()
    {
        return $this->hasMany(SongRequest::class);
    }
}
