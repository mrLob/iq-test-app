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
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'login');
            $table->string('first_name')->nullable();
            $table->string('second_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->foreignId('profession_id')->constrained('professions');
            $table->string('photo_url')->nullable();
            $table->timestamp('last_login_date')->nullable();
            $table->timestamp('last_personal_data_edit_date')->nullable();
            $table->string('role')->default('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('login', 'name');
            $table->dropColumn([
                'first_name',
                'second_name',
                'last_name',
                'date_of_birth',
                'profession_id',
                'photo_url',
                'last_login_date',
                'last_personal_data_edit_date',
                'role',
            ]);
        });
    }
};
