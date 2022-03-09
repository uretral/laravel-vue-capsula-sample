<?php

namespace App\Http\Models\Vuex\Settings;

use Illuminate\Database\Eloquent\Model;

class ManageBlockList extends Model
{
    protected $guarded = [];

    protected $casts = [
        'roles' => 'array'
    ];

}
