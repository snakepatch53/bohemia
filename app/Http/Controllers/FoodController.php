<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Services\FileUploadService;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    private $validations = [];
    public function __construct()
    {
        $this->validations = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'category_food_id' => 'required|exists:category_food,id',
        ];
    }
    public function store(Request $request)
    {
        $request->validate($this->validations);
        $data = FileUploadService::upload($request, 'image', config('paths.food_image'));
        Food::create($data);
        return back();
    }

    public function update(Request $request, Food $food)
    {
        $request->validate([...$this->validations, 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048']);
        $data = FileUploadService::upload($request, 'image', config('paths.food_image'), $food->image);
        $food->update($data);
        return back();
    }

    public function destroy(Food $food)
    {
        FileUploadService::delete(config('paths.food_image'), $food->image);
        $food->delete();
        return back();
    }
}
