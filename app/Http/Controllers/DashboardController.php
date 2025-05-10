<?php

namespace App\Http\Controllers;

use App\Models\CategoryFood;
use App\Models\Food;

class DashboardController extends Controller
{
    public function home()
    {
        return inertia('dashboard/Home');
    }

    public function foods()
    {
        $foods = Food::with(['category'])->get();
        $categories = CategoryFood::all();
        return inertia('dashboard/Foods', compact('foods', 'categories'));
    }
}
