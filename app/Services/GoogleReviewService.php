<?php

namespace App\Services;

use Illuminate\Http\Request;

class GoogleReviewService
{
    public static function all($google_api_key = null, $google_place_id = null)
    {
        if (is_null($google_api_key) || is_null($google_place_id)) {
            [$infos,  $info] = InfoFormatService::format(null, true);
            $google_api_key = $info['google_api_key'] ?? null;
            $google_place_id = $info['google_place_id'] ?? null;
        }
        $response = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?place_id=' . $google_place_id . '&key=' . $google_api_key);
        $response = json_decode($response, true);
        return $response['result']['reviews'] ?? null;
    }
}
