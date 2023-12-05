<?php

namespace App\Http\Controllers;

use http\Client\Curl\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserPhotoController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // максимальный размер 2MB
        ]);

        if ($user->photo_url) {
            Storage::disk('public')->delete($user->photo_url);
        }

        $photoPath = $request->file('photo')->store('user_photos', 'public');

        $user->update(['photo_url' => $photoPath]);

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // Удаляем фото и обновляем путь в базе данных
        if ($user->photo_url) {
            Storage::disk('public')->delete($user->photo_url);
            $user->update(['photo_url' => null]);
        }

        return response()->json($user, 200);
    }
}
