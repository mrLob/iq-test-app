<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CabinetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $attachments = Attachment::where('user_id', $user->id)
            ->orWhere('uploaded_by_user_id', $user->id)
            ->get();

        $attachments = $attachments->map(function ($attachment) {
            $attachment->download_url = Storage::url($attachment->url);
            return $attachment;
        });

        $user->makeHidden(['last_login_date', 'last_personal_data_edit_date']);

        return response()->json($attachments);
    }

    public function show()
    {
        $user = Auth::user()->with('attachments', 'uploadedByUser');
        $user->makeHidden(['last_login_date', 'last_personal_data_edit_date']);
        foreach ($user->attachments as $attachment) {
            $attachment->append('download_url');
        }
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'first_name' => 'string|max:255',
            'second_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'login' => 'string|max:255',
            'date_of_birth' => 'date',
            'profession_id' => 'integer',
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Поддерживаемые форматы и максимальный размер файла
        ]);

        $user->fill(
            $request->only(['first_name', 'second_name', 'last_name', 'date_of_birth', 'login', 'profession_id'])
        );

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('user_photos', 'public');
            $user->photo_url = $photoPath;
        }

        $user->save();

        $user->update(['last_personal_data_edit_date' => now()]);
        $user->makeHidden(['last_login_date', 'last_personal_data_edit_date']);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();
        if (!$user || $user->role != 'user') {
            return response()->json(['error' => 'User not found'], 404);
        }
        if ($user->photo_url) {
            Storage::disk('public')->delete($user->photo_url);
        }
        $user->delete();

        return response()->json(null, 204);
    }
}
