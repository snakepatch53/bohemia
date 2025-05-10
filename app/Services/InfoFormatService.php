<?php

namespace App\Services;

use App\Models\Info;
use App\Models\Service;

class InfoFormatService
{
    public static function format($infos = null, $withCredentials = false)
    {
        if (is_null($infos)) $infos = Info::all();
        foreach ($infos as $info) {
            if ($info->type == 'credential' && !$withCredentials) {
                $info->value = null;
            }
        }
        $info = $infos->pluck('formatted', 'field');
        return [$infos, $info];
    }
}
