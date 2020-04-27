<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'question_bank';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['question'];
}
