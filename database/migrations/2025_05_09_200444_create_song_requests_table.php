<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('song_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('customer_id')->constrained();
            $table->foreignId('song_id')->constrained();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('song_requests');
    }
};
