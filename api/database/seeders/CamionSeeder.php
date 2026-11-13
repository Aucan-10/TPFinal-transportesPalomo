<?php

namespace Database\Seeders;

use App\Models\Camion;
use Illuminate\Database\Seeder;

class CamionSeeder extends Seeder
{
    public function run(): void
    {
        $camiones = [
            ['patente' => 'AB123CD', 'modelo' => 'Mercedes-Benz Atego 1726', 'tipo_servicio' => 'refrigerado', 'capacidad_kg' => 8000, 'refrigerado' => true, 'fecha_ultimo_service' => '2026-09-15'],
            ['patente' => 'AC456EF', 'modelo' => 'Iveco Daily 70C17', 'tipo_servicio' => 'refrigerado', 'capacidad_kg' => 3500, 'refrigerado' => true, 'fecha_ultimo_service' => '2026-10-02'],
            ['patente' => 'AD789GH', 'modelo' => 'Volkswagen Delivery 11.180', 'tipo_servicio' => 'mudanza', 'capacidad_kg' => 6000, 'refrigerado' => false, 'fecha_ultimo_service' => '2026-08-20'],
            ['patente' => 'AE012IJ', 'modelo' => 'Ford Cargo 1119', 'tipo_servicio' => 'mudanza', 'capacidad_kg' => 9000, 'refrigerado' => false, 'fecha_ultimo_service' => '2026-07-11'],
            ['patente' => 'AF345KL', 'modelo' => 'Mercedes-Benz Sprinter 515', 'tipo_servicio' => 'refrigerado', 'capacidad_kg' => 2000, 'refrigerado' => true, 'fecha_ultimo_service' => null],
        ];

        foreach ($camiones as $camion) {
            Camion::updateOrCreate(['patente' => $camion['patente']], $camion);
        }
    }
}
