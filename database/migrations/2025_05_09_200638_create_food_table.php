<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->timestamps();


            $table->string('name');
            $table->string('description')->nullable();
            $table->string('price');
            $table->string('image')->nullable();
            $table->string('category_food_id')->constrained();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};
