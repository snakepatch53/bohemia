<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    public function home()
    {
        return inertia('dashboard/Home');
    }
}
