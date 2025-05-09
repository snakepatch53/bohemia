<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongRequest extends Model
{
    protected $fillable = [
        'customer_id',
        'song_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
