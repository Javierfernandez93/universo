<?php

namespace Site;

class Lpoa
{
    const TEMPLATE = 'src/files/pdf/lpoa-template/';
    const OUTPUT = 'src/files/pdf/lpoa';

    const COORDS = [
        'nameAof' => [
            'x' => 38,
            'y' => 48,
        ],
        'investorNumberAof' => [
            'x' => 30,
            'y' => 61,
        ],
        'currentDateAof' => [
            'x' => 64,
            'y' => 132,
        ],
        'signatureAof' => [
            'x' => 38,
            'y' => 130,
        ],
        'names' => [
            'x' => 38,
            'y' => 238,
        ],
        'title' => [
            'x' => 71,
            'y' => 75,
        ],
        'investorNumber' => [
            'x' => 58,
            'y' => 84,
        ],
        'percentage' => [
            'x' => 71,
            'y' => 234,
        ],
        'month' => [
            'x' => 49,
            'y' => 218,
        ],
        'currentDate' => [
            'x' => 38,
            'y' => 242,
        ],
        'signature' => [
            'x' => 30,
            'y' => 216,
        ],
        'names-en' => [
            'x' => 38,
            'y' => 247,
        ],
        'title-en' => [
            'x' => 75,
            'y' => 62,
        ],
        'investorNumber-en' => [
            'x' => 62,
            'y' => 71,
        ],
        'percentage-en' => [
            'x' => 33,
            'y' => 231,
        ],
        'month-en' => [
            'x' => 56,
            'y' => 212,
        ],
        'currentDate-en' => [
            'x' => 37,
            'y' => 251,
        ],
        'signature-en' => [
            'x' => 30,
            'y' => 225,
        ],
    ];

    public static function getCoords(string $key = null) : array
    {
        return isset(self::COORDS[$key]) ? self::COORDS[$key] : [];
    }

    public static function getSourceTemplateOutput(string $root = null,int $user_login_id = null) : string
    {
        return $root."/".self::OUTPUT."/{$user_login_id}.pdf";
    }

    public static function getSourceTemplate(string $root = null,string $lpoa = null) : string
    {
        $lpoa = $lpoa ? $lpoa : "fxWinningTemplate";
        
        return $root."/".self::TEMPLATE.$lpoa.".pdf";
    }

    public static function getSourceTemplateAof(string $root = null,string $lpoa = null) : string
    {
        $lpoa = $lpoa ? $lpoa : "fxWinningTemplate";
        
        return $root."/".self::TEMPLATE.$lpoa.".pdf";
    }
}