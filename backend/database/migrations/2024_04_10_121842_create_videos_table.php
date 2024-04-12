<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('coach');
            $table->text('description');
            $table->string('url');
            $table->integer('visits');
            $table->integer('likes');
            $table->integer('dislikes');
            $table->date('upload_date')->default(now()); // Establece la fecha actual como valor predeterminado
            $table->string('duration');
            $table->boolean('exclusive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
