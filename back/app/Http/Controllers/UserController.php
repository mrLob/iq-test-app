<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'second_name' => 'required|string',
            'last_name' => 'required|string',
            'login' => 'required|string|unique:users,login',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'date_of_birth' => 'date',
            'profession_id' => 'integer',
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

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

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('attachments', 'uploadedByUser')->findOrFail($id);
        foreach ($user->attachments as $attachment) {
            $attachment->append('download_url');
        }
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'string',
        ]);

        $user->update($request->only(['first_name', 'last_name', 'email', 'password']));

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        if ($user->photo_url) {
            Storage::disk('public')->delete($user->photo_url);
        }
        $user->delete();

        return response()->json(null, 204);
    }
}
