<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;

class DynamicMailService
{
    public static function apply($info)
    {
        $username = $info['email_user'] ?? env('MAIL_USERNAME');
        $password = $info['email_pass'] ?? env('MAIL_PASSWORD');
        Config::set('mail.from.address', $username);
        Config::set('mail.mailers.smtp.username', $username);
        Config::set('mail.mailers.smtp.password', $password);
    }
}
