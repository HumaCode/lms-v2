<?php

namespace App\Support\MediaLibrary;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class AvatarPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        if ($media->collection_name === 'avatar') {
            return 'avatar/'.$media->id.'/';
        }

        return $media->id.'/';
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
