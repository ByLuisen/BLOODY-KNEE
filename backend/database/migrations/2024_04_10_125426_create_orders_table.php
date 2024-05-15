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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('payment_id')->unique();
            $table->date('order_date')->default(now());
            $table->date('date_delivery')->default(now());
            $table->string('country');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('province')->nullable();
            $table->string('city');
            $table->string('zip');
            $table->decimal('shipping_cost', 10, 2);
            $table->decimal('amount_total', 10, 2);
            $table->enum('status', ['Pendiente', 'En Proceso', 'Enviado', 'Entregado', 'Cancelado', 'Devuelto']);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
