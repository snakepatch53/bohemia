<?php

namespace App\Services;

use Illuminate\Http\Request;

class IncludeQueryService
{
    public static function parseIncludes(Request $request, array $allowedIncludes = [])
    {
        // Inicializa el arreglo de relaciones
        $includes = [];

        // Verifica si la consulta tiene el parámetro 'include'
        if ($request->has('include') && $request->query('include')) {
            // Separa las relaciones por coma
            $includes = explode(',', $request->query('include'));

            // Filtra solo las relaciones que están permitidas
            $includes = array_filter($includes, function ($include) use ($allowedIncludes) {
                return in_array($include, $allowedIncludes);
            });

            // Reindexa el arreglo (para eliminar posibles índices no consecutivos)
            $includes = array_values($includes);
        }

        return $includes;
    }
}
