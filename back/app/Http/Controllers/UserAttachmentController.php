<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserAttachmentController extends Controller
{
    public function attach(Request $request, $userId)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048', // Добавьте нужные форматы файлов и ограничения
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::findOrFail($userId);

        $file = $request->file('file');
        $filePath = $file->store('public/attachments');

        $attachment = new Attachment([
            'url' => $filePath,
            'type' => $file->getClientOriginalExtension(),
            'user_id' => $userId,
            'uploaded_by_user_id' => auth()->user()->id,
        ]);

        $attachment->save();

        return response()->json(['message' => 'File attached to user successfully']);
    }

    public function detach($userId, $attachmentId)
    {
        $user = User::findOrFail($userId);
        $attachment = Attachment::findOrFail($attachmentId);

        // Удаляем файл из хранилища (опционально, в зависимости от вашей логики)
        Storage::delete($attachment->url);

        // Открепляем файл от пользователя
        $attachment->delete();

        return response()->json(['message' => 'File detached from user successfully']);
    }
}
