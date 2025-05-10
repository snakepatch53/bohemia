<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\SongRequest;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function home()
    {
        return inertia('landing/Home');
    }

    public function cancionero_cola()
    {
        $songRequests = SongRequest::with(['song', 'customer'])->paginate(20);
        return inertia('landing/CancioneroCola', compact('songRequests'));
    }

    public function cancionero_lista()
    {
        $search = request('search');
        $songs = [];

        if (!$search) {
            $songs = Song::paginate(20);
        } else {
            $songs = Song::where('title', 'like', "%$search%")
                ->orWhere('artist', 'like', "%$search%")
                ->orWhere('gender', 'like', "%$search%")
                ->paginate(20);
        }
        return inertia('landing/CancioneroLista', compact('songs'));
    }

    public function cancionero_pedir(Song $song)
    {
        return inertia('landing/CancioneroPedir', compact('song'));
    }
}
