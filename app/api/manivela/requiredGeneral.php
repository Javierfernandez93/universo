<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$data['user_login_id'])
{
    error('USER_NOT_FOUND');
}

$user = $UserSupport->getUserToEdit($data['user_login_id']);

if(!$user)
{
    error('USER_NOT_FOUND');
}

$date = new DateTime('now', new DateTimeZone('UTC'));

$event = [
    'event' => [
        'app' => 'monday',
        'type' => 'create_pulse',
        'triggerTime' => date('Y-m-d\TH:i:s.v'),
        'subscriptionId' => 157352946,
        'userId' => -6,
        'originalTriggerUuid' => '',
        'boardId' => 3273009894,
        'pulseId' => 6340883292,
        'pulseName' => $user['user_data']['names'], // nombre del cliente
        'groupId' => 'topics', 
        'groupName' => 'REGISTRO CLIENTES',
        'groupColor' => '#579bfc',
        'isTopGroup' => 1,
        'columnValues' => [
            'texto' => [
                'value' => $data['property']['real_state'] // Nombre del proyecto,
            ],
            'n_meros' => [
                'value' => $data['property']['property_title'], // ID de la propiedad
                'unit' => ''
            ],
            'texto06' => [
                'value' => $user['user_data']['last_name'] // Apellido paterno
            ],
            'texto03' => [
                'value' => $user['user_data']['sur_name'] // Apellido materno
            ],
            'texto7' => [
                'value' => $user['user_address']['city'] // Ciudad
            ],
            'fecha_1' => [
                'date' => $user['user_data']['birthdate'], // Fecha de nacimiento
                'icon' => '',
                'time' => '',
                'changed_at' => $date->format('Y-m-d\TH:i:s.v\Z')
            ],
            'estado_1' => [
                'label' => [
                    'index' => 1,
                    'text' => Site\UserData::translateGender($user['user_data']['gender']), // Hombre => Mujer
                    'style' => [
                        'color' => '#579bfc',
                        'border' => '#4387e8',
                        'var_name' => 'bright-blue'
                    ],
                    'is_done' => 1
                ],
                'post_id' => ''
            ],
            'texto5' => [
                'value' => $user['user_data']['nationality'] // Nacionalidad
            ],
            'texto3' => [
                'value' => $user['user_data']['curp'] // CURP
            ],
            'archivo0' => [
                'files' => [
                    Site\UserKyc::getFileByNameFullRouteAsFile([
                        "user_login_id" => $user['user_login']['user_login_id'],
                        "code" => "curp"
                    ]), // CURP
                ]
            ],
            'estado_14' => [
                'label' => [
                    'index' => 0,
                    'text' => Site\UserData::translateMaritalStatus($user['user_data']['marital_status']), // Estado civil
                    'style' => [
                        'color' => '#df2f4a',
                        'border' => '#ce3048',
                        'var_name' => 'red-shadow'
                    ],
                    'is_done' => 1
                ],
                'post_id' => ''
            ],
            'texto4' => [
                'value' => $user['user_address']['address'] // Domicilio
            ],
            'n_meros3' => [
                'value' => 0, // n´mero exterior
                'unit' => ''
            ],
            'texto713' => [
                'value' => Site\UserData::translateEmploymentStatus($user['user_data']['employment_status']) // Ocupación
            ],
            'correo_electr_nico' => [
                'email' => $user['user_login']['email'],
                'text' => $user['user_login']['email']
            ],
            'tel_fono' => [
                'phone' => $user['user_contact']['phone'] // Teléfono
            ],
            'estado_10' => [
                'label' => [
                    'index' => 1,
                    'text' => Site\UserData::translateFisicalStatus($user['user_data']['fiscal_status']), // Tipo de persona
                    'style' => [
                        'color' => '#df2f4a',
                        'border' => '#ce3048',
                        'var_name' => 'red-shadow'
                    ],
                    'is_done' => 1
                ],
                'post_id' => ''
            ],
            'archivo09' => [
                'files' => [
                    Site\UserKyc::getFileByNameFullRouteAsFile([
                        "user_login_id" => $user['user_login']['user_login_id'],
                        "code" => "marriage_certificate"
                    ])
                ]
            ],
            'estado_13' => [
                'label' => [
                    'index' => 1,
                    'text' => 'No, solo un cliente va a adquirir',
                    'style' => [
                        'color' => '#225091',
                        'border' => '#225091',
                        'var_name' => 'navy'
                    ],
                    'is_done' => 1
                ],
                'post_id' => ''
            ],
            'archivo' => [
                'files' => [
                    Site\UserKyc::getFileByNameFullRouteAsFile([
                        "user_login_id" => $user['user_login']['user_login_id'],
                        "code" => "rfc"
                    ]),
                ]
            ],
            'texto72' => [
                'value' => $user['user_data']['identification_number']
            ],
            'archivo7' => [
                'files' => [
                    Site\UserKyc::getFileByNameFullRouteAsFile([
                        "user_login_id" => $user['user_login']['user_login_id'],
                        "code" => "id_full"
                    ]), // identificación completa
                ]
            ],
            'archivo4' => [
                'files' => [
                    Site\UserKyc::getFileByNameFullRouteAsFile([
                        "user_login_id" => $user['user_login']['user_login_id'],
                        "code" => "proof_of_address"
                    ]), // comprobante domicilio
                ]
            ],
            'n_meros4' => [
                'value' => 95307,
                'unit' => ''
            ],
            'texto39' => [
                'value' => $user['user_address']['city'] // Ciudad
            ],
            'texto45' => [
                'value' => $user['user_address']['city'] // Municipio
            ],
            'texto71' => [
                'value' => $user['user_address']['state']// Estado
            ],
            'pa_s' => [
                'countryCode' => Site\UserAddress::getCountryCodeByCountry($user['user_address']['country']), // @Todo
                'countryName' => $user['user_address']['country'], // País
                'changed_at' => '2024-03-27T15:21:35.110Z'
            ],
            'texto1' => [
                'value' => isset($user['user_reference'][0]) ? $user['user_reference'][0]['names'] . ' ' . $user['user_reference'][0]['last_name'] . ' ' . $user['user_reference'][0]['sur_name'] : "",// Nombre completo
            ],
            'tel_fono0' => [
                'phone' =>  $user['user_reference'][0] ? $user['user_reference'][0]['phone'] : "", // Teléfono
            ],
            'correo_electr_nico_1' => [
                'email' => isset($user['user_reference'][0]) ? $user['user_reference'][0]['email'] : "", // Email
                'text' => isset($user['user_reference'][0]) ? $user['user_reference'][0]['email'] : ""   // Texto
            ],
            'texto31' => [
                'value' => isset($user['user_reference'][0]) ? $user['user_reference'][0]['names'] . ' ' . $user['user_reference'][0]['last_name'] . ' ' . $user['user_reference'][0]['sur_name'] : "", // Nombre completo
            ],
            'tel_fono8' => [
                'phone' => isset($user['user_reference'][1]) ? $user['user_reference'][1]['phone'] : "", // Teléfono 
            ],
            'correo_electr_nico_16' => [
                'email' => isset($user['user_reference'][1]) ? $user['user_reference'][1]['email'] : "", // Email
                'text' => isset($user['user_reference'][1]) ? $user['user_reference'][1]['email'] : "" // Texto
            ]
        ],
        'triggerUuid' => '565b84e3ae3e3390c1544d4aeed35539'
    ]
];

$Api = Manivela\Api::getInstance();
$response = $Api->requiredGeneral($event);

if(!$response)
{
    error('DATA_NOT_FOUND',[
        'response' => $response
    ],true);
}

success(Constants::RESPONSES['DATA_OK'], [
    'response' => $response
]);