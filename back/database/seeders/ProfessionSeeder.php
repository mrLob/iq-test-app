<?php

namespace Database\Seeders;

use App\Models\Profession;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profession::create(['name' => 'Developer']);
        Profession::create(['name' => 'Admin']);
        Profession::create(['name' => 'Designer']);
        Profession::create(['name' => 'Manager']);
        Profession::create(['name' => 'Engineer']);
        Profession::create(['name' => 'Analyst']);
        Profession::create(['name' => 'Architect']);
        Profession::create(['name' => 'Artist']);
        Profession::create(['name' => 'Writer']);
        Profession::create(['name' => 'Doctor']);
        Profession::create(['name' => 'Teacher']);

    }
}
