<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $firstRole = $this->roles->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'bio' => $this->bio,
            'avatar_url' => $this->avatar_url,
            'status' => $this->status ?? 'active',
            'email_verified_at' => $this->email_verified_at?->format('Y-m-d H:i:s'),
            'is_verified' => ! is_null($this->email_verified_at),
            'role' => $firstRole ? [
                'name' => $firstRole->name,
                'slug' => $firstRole->slug ?? $firstRole->name,
            ] : null,
            'created_at' => $this->created_at?->translatedFormat('d M Y') ?? $this->created_at?->format('d M Y'),
            'created_at_human' => $this->created_at?->diffForHumans(),
        ];
    }
}
