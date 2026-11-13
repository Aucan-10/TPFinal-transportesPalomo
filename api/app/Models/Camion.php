<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Camion extends Model
{
    protected $table = 'camiones';

    protected $fillable = [
        'patente',
        'modelo',
        'tipo_servicio',
        'capacidad_kg',
        'refrigerado',
        'fecha_ultimo_service',
    ];

    protected $casts = [
        'refrigerado' => 'boolean',
        'capacidad_kg' => 'integer',
        'fecha_ultimo_service' => 'date',
    ];
}
