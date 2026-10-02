<?php

namespace App\Support\MediaLibrary;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class DynamicMediaPathGenerator implements PathGenerator
{
    /**
     * Get path for the given media.
     * If custom_properties has 'directory', use that directory; otherwise fallback to collection name or id.
     */
    public function getPath(Media $media): string
    {
        $directory = $media->getCustomProperty('directory') ?: $media->collection_name;

        if (! empty($directory)) {
            $trimmed = trim($directory, '/');
            return "{$trimmed}/{$media->id}/";
        }

        return "{$media->id}/";
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media).'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media).'responsive-images/';
    }
}
