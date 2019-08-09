<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'date', 'name',
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'owner');
    }
}
