<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public static function upload(Request $request, $name, $path, $oldFileName = null)
    {
        $data = $request->all();
        if ($request->hasFile($name) && $request->file($name)->isValid()) {
            $fileName = basename($request->file($name)->store($path, 'public'));
            if (!!$oldFileName) Storage::disk('public')->delete($path . '/' . $oldFileName);
            $data[$name] = $fileName;
        } else $data[$name] = $oldFileName;
        return $data;
    }
    public static function delete($path, $fileName)
    {
        if (Storage::disk('public')->exists($path . '/' . $fileName))
            return Storage::disk('public')->delete($path . '/' . $fileName);
    }
}
