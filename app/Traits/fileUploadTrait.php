<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait fileUploadTrait
{
    /**
     * Upload a file, convert image to WebP format if it's an image,
     * and attach it to the model using Spatie Media Library with strict security validation.
     *
     * @param  HasMedia  $model The model that implements Spatie\MediaLibrary\HasMedia
     * @param  UploadedFile|null  $file The uploaded file instance
     * @param  string  $directory Target directory inside storage/app/private (e.g. 'avatar', 'documents')
     * @param  int|string  $maxSizeInKb Maximum allowed file size in KB (e.g. 5120 = 5MB, 1024 = 1MB)
     * @param  string|array  $allowedTypes Type category ('image', 'file') or explicit list of allowed extensions (e.g. ['jpg', 'png', 'pdf'])
     * @param  string|null  $collection Media collection name (default matches $directory)
     * @param  string  $disk Storage disk name (default: 'local' which maps to storage/app/private)
     * @return Media|null
     *
     * @throws ValidationException
     */
    public function fileUpload(
        HasMedia $model,
        ?UploadedFile $file,
        string $directory = 'avatar',
        int|string $maxSizeInKb = 5120,
        string|array $allowedTypes = 'image',
        ?string $collection = null,
        string $disk = 'local'
    ): ?Media {
        if (! $file) {
            return null;
        }

        $maxSizeKb = (int) $maxSizeInKb;
        $maxSizeBytes = $maxSizeKb * 1024;

        // 1. Validasi ukuran berkas secara dinamis
        if ($file->getSize() > $maxSizeBytes) {
            $mbSize = round($maxSizeKb / 1024, 1);
            throw ValidationException::withMessages([
                'avatar' => "Ukuran file terlalu besar. Maksimal {$maxSizeKb} KB ({$mbSize} MB).",
            ]);
        }

        // 2. Daftar format yang didukung
        $imageMimes = [
            'jpeg' => 'image/jpeg',
            'jpg'  => 'image/jpeg',
            'png'  => 'image/png',
            'webp' => 'image/webp',
        ];

        $documentMimes = [
            'pdf'  => 'application/pdf',
            'doc'  => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls'  => 'application/vnd.ms-excel',
            'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];

        // Tentukan ekstensi dan MIME yang diperbolehkan berdasarkan parameter $allowedTypes
        $allowedMap = [];
        if ($allowedTypes === 'image') {
            $allowedMap = $imageMimes;
        } elseif ($allowedTypes === 'file') {
            $allowedMap = $documentMimes;
        } elseif (is_array($allowedTypes)) {
            $combined = array_merge($imageMimes, $documentMimes);
            foreach ($allowedTypes as $type) {
                $type = strtolower(trim($type, '. '));
                if (isset($combined[$type])) {
                    $allowedMap[$type] = $combined[$type];
                }
            }
        }

        $clientExtension = strtolower($file->getClientOriginalExtension());
        if (! array_key_exists($clientExtension, $allowedMap)) {
            $allowedStr = implode(', ', array_keys($allowedMap));
            throw ValidationException::withMessages([
                'avatar' => "Format file tidak diizinkan. Format yang diterima: {$allowedStr}.",
            ]);
        }

        // 3. Keamanan: Deteksi MIME nyata dari isi berkas (bukan dari ekstensi klien)
        $realPath = $file->getRealPath();
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedMime = $finfo ? finfo_file($finfo, $realPath) : $file->getMimeType();
        if ($finfo) {
            finfo_close($finfo);
        }

        // Pastikan MIME terdeteksi cocok dengan format yang diizinkan
        if (! in_array($detectedMime, $allowedMap, true)) {
            throw ValidationException::withMessages([
                'avatar' => 'Berkas tidak valid atau format telah dimanipulasi.',
            ]);
        }

        // 4. Keamanan Lanjutan: Cegah script PHP, JS, Shell, HTML yang disamarkan dalam file
        $contentSample = @file_get_contents($realPath, false, null, 0, 4096);
        if ($contentSample !== false) {
            $dangerousPatterns = [
                '/<\?php/i',
                '/<\?=/i',
                '/<\?/i',
                '/<script\b/i',
                '/eval\s*\(/i',
                '/base64_decode\s*\(/i',
                '/system\s*\(/i',
                '/shell_exec\s*\(/i',
                '/passthru\s*\(/i',
            ];
            foreach ($dangerousPatterns as $pattern) {
                if (preg_match($pattern, $contentSample)) {
                    throw ValidationException::withMessages([
                        'avatar' => 'Berkas ditolak karena terindikasi mengandung kode atau skrip berbahaya.',
                    ]);
                }
            }
        }

        $isImage = array_key_exists($clientExtension, $imageMimes);

        // 5. Jika tipe gambar: Validasi biner gambar dan konversi ke WebP
        if ($isImage) {
            $imageInfo = @getimagesize($realPath);
            if ($imageInfo === false) {
                throw ValidationException::withMessages([
                    'avatar' => 'Berkas gambar rusak atau tidak valid.',
                ]);
            }

            // Buat resource gambar GD
            $image = null;
            switch ($detectedMime) {
                case 'image/jpeg':
                    $image = @imagecreatefromjpeg($realPath);
                    break;
                case 'image/png':
                    $image = @imagecreatefrompng($realPath);
                    if ($image) {
                        imagepalettetotruecolor($image);
                        imagealphablending($image, true);
                        imagesavealpha($image, true);
                    }
                    break;
                case 'image/webp':
                    $image = @imagecreatefromwebp($realPath);
                    break;
                default:
                    $contents = @file_get_contents($realPath);
                    if ($contents !== false) {
                        $image = @imagecreatefromstring($contents);
                    }
                    break;
            }

            if ($image === false || $image === null) {
                throw ValidationException::withMessages([
                    'avatar' => 'Gagal memproses gambar. Berkas tidak valid.',
                ]);
            }

            $tempWebpPath = tempnam(sys_get_temp_dir(), 'upload_').'.webp';
            $sanitizedName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $sluggedName = \Illuminate\Support\Str::slug($sanitizedName);
            $fileName = ($sluggedName ?: 'avatar').'-'.time().'.webp';

            // Kualitas 90: ukuran sangat kecil tanpa degradasi visual
            imagewebp($image, $tempWebpPath, 90);
            imagedestroy($image);

            $targetCollection = $collection ?: $directory;
            $media = $model->addMedia($tempWebpPath)
                ->withCustomProperties(['directory' => $directory])
                ->usingFileName($fileName)
                ->toMediaCollection($targetCollection, $disk);

            if (file_exists($tempWebpPath)) {
                @unlink($tempWebpPath);
            }

            return $media;
        }

        // 6. Jika tipe dokumen/file non-image: Simpan langsung dengan nama aman
        $sanitizedName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $sluggedName = \Illuminate\Support\Str::slug($sanitizedName);
        $safeFileName = ($sluggedName ?: 'file').'-'.time().'.'.$clientExtension;
        $targetCollection = $collection ?: $directory;

        return $model->addMedia($file)
            ->withCustomProperties(['directory' => $directory])
            ->usingFileName($safeFileName)
            ->toMediaCollection($targetCollection, $disk);
    }

    /**
     * Check if model has media in the collection,
     * unlink physical file from filesystem if exists,
     * clean empty directory, and delete media records.
     *
     * @param  HasMedia  $model
     * @param  string  $collection
     * @return bool True if avatar existed and was unlinked, false otherwise
     */
    public function removeMedia(HasMedia $model, string $collection = 'avatar'): bool
    {
        if (! $model->hasMedia($collection)) {
            return false;
        }

        $mediaItems = $model->getMedia($collection);
        foreach ($mediaItems as $media) {
            $filePath = $media->getPath();
            if (! empty($filePath) && file_exists($filePath)) {
                @unlink($filePath);

                $dir = dirname($filePath);
                if (is_dir($dir)) {
                    $remainingFiles = array_diff(scandir($dir) ?: [], ['.', '..']);
                    if (empty($remainingFiles)) {
                        @rmdir($dir);
                    }
                }
            }

            $media->delete();
        }

        return true;
    }
}
