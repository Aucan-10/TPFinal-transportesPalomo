<?php

use App\Http\Controllers\CamionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('camiones', CamionController::class);
