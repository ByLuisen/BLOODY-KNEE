<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type_id' => $this->type_id,
            'modality_id' => $this->modality_id,
            'title' => $this->title,
            'coach' => $this->coach,
            'description' => $this->description,
            'url' => $this->url,
            'visits' => $this->visits,
            'comments'=>$this->comments,
            'likes' => $this->likes,
            'dislikes' => $this->dislikes,
            'upload_date' => $this->upload_date instanceof \DateTime ? $this->upload_date->format('Y-m-d') : $this->upload_date,
            'duration' => $this->duration,
            'exclusive' => $this->exclusive,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
