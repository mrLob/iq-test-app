<?php

namespace Database\Factories;

use App\Models\Profession;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $profession = Profession::inRandomOrder()->first();

        return [
            'first_name' => $this->faker->firstName,
            'second_name' => $this->faker->lastName,
            'last_name' => $this->faker->lastName,
            'login' => $this->faker->userName,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('user@user.user'),
            'remember_token' => Str::random(10),
            'date_of_birth' => $this->faker->date,
            'profession_id' => $profession->id,
            'photo_url' => $this->faker->imageUrl(),
            'last_login_date' => now(),
            'last_personal_data_edit_date' => now(),
            'role' => 'user',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
