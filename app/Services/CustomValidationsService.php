<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;

class CustomValidationsService
{
    public static function isDni($num)
    {
        if (strlen($num) == 10) {
            $sum = 0;
            $cedula = str_split($num);
            for ($i = 0; $i < count($cedula); $i++) {
                $temp = intval($cedula[$i]);
                if ($i % 2 == 0) {
                    $double = $temp * 2;
                    if ($double > 9) {
                        $sum += $double - 9;
                    } else {
                        $sum += $double;
                    }
                } else {
                    $sum += $temp;
                }
            }
            return $sum % 10 == 0;
        } else {
            return false;
        }
    }
}
