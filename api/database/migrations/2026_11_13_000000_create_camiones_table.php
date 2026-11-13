<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('camiones', function (Blueprint $table) {
            $table->id();
            $table->string('patente', 10)->unique();
            $table->string('modelo');
            $table->string('tipo_servicio'); // refrigerado | mudanza
            $table->unsignedInteger('capacidad_kg');
            $table->boolean('refrigerado')->default(false);
            $table->date('fecha_ultimo_service')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('camiones');
    }
};
