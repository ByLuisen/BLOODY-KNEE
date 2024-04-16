<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use app\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Create roles for different types of users:
     * - Unregistered user
     * - Registered user (non-paying)
     * - Standard user (paying user)
     * - Premium user (paying user)
     */
    public function up(): void
    {
        // Unregistered user
        $role1 = Role::create(['name'=>'user']);

        // Registered user (non-paying)
        $role2 = Role::create(['name'=>'user_reg']);

        // Standard user (paying user)
        $role3 = Role::create(['name'=>'user_sta']);

        // Premium user (paying user)
        $role4 = Role::create(['name'=>'user_pre']);
    }

    /**
     * Reverse the migrations.
     *
     * Drop the 'roles' table.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
