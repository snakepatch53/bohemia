<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\SongRequest;
use App\Services\CustomValidationsService;
use Illuminate\Http\Request;

class SongRequestController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'dni' => [
                'required',
                fn($attribute, $value, $fail) => (!CustomValidationsService::isDni($value)) ? $fail('La cédula no es válida.') : null
            ],
            'name' => 'required',
            'song_id' => 'required|exists:songs,id',
        ]);
        $customer = Customer::where('dni', $request->dni)->first();
        if (!$customer) {
            Customer::create(['dni' => $request->dni, 'name' => $request->name]);
            $customer = Customer::where('dni', $request->dni)->first();
        } else $customer->update(['dni' => $request->dni, 'name' => $request->name]);
        $customer->songRequests()->create(['song_id' => $request->song_id]);
    }

    public function update(Request $request, SongRequest $songRequest)
    {
        //
    }

    public function destroy(SongRequest $songRequest)
    {
        //
    }
}
