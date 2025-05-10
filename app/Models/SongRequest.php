<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongRequest extends Model
{
    protected $fillable = [
        'customer_id',
        'song_id'
    ];

    protected $appends = ['date_str', 'date_diff'];

    public function getDateStrAttribute()
    {
        $date = $this->created_at;
        return $date->locale('es')->isoFormat('dddd D [de] MMMM [de] YYYY');
    }

    public function getDateDiffAttribute()
    {
        $date = $this->created_at;
        $date->locale('es');
        return $date->diffForHumans();
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function song()
    {
        return $this->belongsTo(Song::class);
    }
}
