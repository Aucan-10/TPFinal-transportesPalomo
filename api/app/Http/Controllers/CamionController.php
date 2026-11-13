<?php

namespace App\Http\Controllers;

use App\Models\Camion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CamionController extends Controller
{
    private const TIPOS = 'refrigerado,mudanza';

    public function index(): JsonResponse
    {
        return response()->json(Camion::orderBy('id')->get(), 200);
    }

    public function show(int $id): JsonResponse
    {
        $camion = Camion::findOrFail($id); // 404 si no existe

        return response()->json($camion, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $datos = $request->validate($this->reglas(true));

        $camion = Camion::create($datos);

        return response()->json($camion, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $camion = Camion::findOrFail($id);

        $datos = $request->validate($this->reglas(false, $camion->id));

        $camion->update($datos);

        return response()->json($camion, 200);
    }

    public function destroy(int $id): JsonResponse
    {
        $camion = Camion::findOrFail($id);
        $camion->delete();

        return response()->json(['mensaje' => 'Camión eliminado'], 200);
    }

    private function reglas(bool $esCreacion, ?int $ignorarId = null): array
    {
        $obligatorio = $esCreacion ? 'required' : 'sometimes';
        $unicaPatente = 'unique:camiones,patente' . ($ignorarId ? ",$ignorarId" : '');

        return [
            'patente' => [$obligatorio, 'string', 'max:10', $unicaPatente],
            'modelo' => [$obligatorio, 'string', 'max:255'],
            'tipo_servicio' => [$obligatorio, 'in:' . self::TIPOS],
            'capacidad_kg' => [$obligatorio, 'integer', 'min:1'],
            'refrigerado' => ['sometimes', 'boolean'],
            'fecha_ultimo_service' => ['nullable', 'date'],
        ];
    }
}
