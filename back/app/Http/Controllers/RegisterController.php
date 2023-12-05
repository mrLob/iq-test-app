<?php

namespace App\Http\Controllers;

use App\Http\Requests\API\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('user_photos', 'public');
        }

        $user = User::create([
            'first_name' => $request->input('first_name'),
            'second_name' => $request->input('second_name'),
            'last_name' => $request->input('last_name'),
            'login' => $request->input('login'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'date_of_birth' => $request->input('date_of_birth'),
            'profession_id' => $request->input('profession_id'),
            'photo_url' => $photoPath,
            'role' => 'subscriber',
        ]);

        return response()->json(['message' => 'User registered successfully', 'data' => $user], 201);
    }
}
