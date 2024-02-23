<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if(true)
{	
// •⁠  ⁠MÉXICO
// •⁠  ⁠CANADÁ
// •⁠  ⁠ESTADOS UNIDOS
// •⁠  ⁠PUERTO RICO
// •⁠  ⁠GUATEMALA
// •⁠  ⁠ALEMANIA
// •⁠  ⁠PERÚ
// •⁠  ⁠COLOMBIA
// •⁠  ⁠EL SALVADOR
// •⁠  ⁠CHILE
// •⁠  ⁠VENEZUELA
// •⁠  ⁠ESPAÑA
// •⁠  ⁠AUSTRIA
    $data['members'] = [
        [
            "total" => 200,
            "country" => [
                'country' => 'Mexico',
                'internet' => 'MX'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'country' => 'Canada',
                'internet' => 'CA'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'country' => 'Estados Unidos',
                'internet' => 'US'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'country' => 'Puerto Rico',
                'internet' => 'PR'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'country' => 'Guatemala',
                'internet' => 'GT',
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'GM',
                'country' => 'Alemania'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'CO',
                'country' => 'Colombia'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'ES',
                'country' => 'El Salvador'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'CL',
                'country' => 'Chile'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'VE',
                'country' => 'Venezuela'
            ]
        ],
        [
            "total" => 200,
            "country" => [
                'internet' => 'ES',
                'country' => 'España'
            ]
        ],
    ];
    $data['r'] = 'DATA_OK';
    $data['s'] = 1;
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 