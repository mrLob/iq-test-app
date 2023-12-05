<?php

namespace Database\Seeders;

use App\Models\Profession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profession = Profession::where('name', 'Admin')->first();

        DB::table('users')->insert([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'login' => 'admin@admin.admin',
            'email' => 'admin@admin.admin',
            'profession_id' => $profession->id,
            'password' => Hash::make('admin@admin.admin'),
            'role' => 'admin',
        ]);
    }
}
