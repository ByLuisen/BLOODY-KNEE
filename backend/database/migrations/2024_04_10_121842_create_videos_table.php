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
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('modality_id');
            $table->string('title');
            $table->string('coach');
            $table->text('description');
            $table->string('url');
            $table->integer('visits');
            $table->integer('comments');
            $table->integer('likes');
            $table->integer('dislikes');
            $table->date('upload_date')->default(now()); // Set the current date as the default value
            $table->string('duration');
            $table->boolean('exclusive');
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
            $table->foreign('modality_id')->references('id')->on('modalities')->onDelete('cascade');
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
