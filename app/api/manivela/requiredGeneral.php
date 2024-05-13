<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

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
        'pulseName' => 'JOSE LUIS', // nombre del cliente
        'groupId' => 'topics', 
        'groupName' => 'REGISTRO CLIENTES',
        'groupColor' => '#579bfc',
        'isTopGroup' => 1,
        'columnValues' => [
            'texto' => [
                'value' => $data['real_state']['title'],
            ],
            'n_meros' => [
                'value' => 404,
                'unit' => ''
            ],
            'texto06' => [
                'value' => 'BERNAL'
            ],
            'texto03' => [
                'value' => 'SOTO'
            ],
            'texto7' => [
                'value' => 'Guadalajara Jalisco'
            ],
            'fecha_1' => [
                'date' => '1979-02-03',
                'icon' => '',
                'time' => '',
                'changed_at' => '2024-03-27T15:21:34.848Z'
            ],
            'estado_1' => [
                'label' => [
                    'index' => 1,
                    'text' => $data['user']['gender'], // Hombre => Mujer
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
                'value' => $data['user']['nationality']
            ],
            'texto3' => [
                'value' => 'BESL790203HJCRTS03'
            ],
            'archivo0' => [
                'files' => [
                    [
                        'fileType' => 'ASSET',
                        'assetId' => 1371608154,
                        'name' => 'curp (36).pdf',
                        'extension' => 'pdf',
                        'isImage' => false
                    ]
                ]
            ],
            'estado_14' => [
                'label' => [
                    'index' => 0,
                    'text' => 'Casado',
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
                'value' => '2440 Don Pedro'
            ],
            'n_meros3' => [
                'value' => 0,
                'unit' => ''
            ],
            'texto713' => [
                'value' => 'empleado'
            ],
            'correo_electr_nico' => [
                'email' => $data['user']['email'],
                'text' => $data['user']['email']
            ],
            'tel_fono' => [
                'phone' => '13106256620'
            ],
            'estado_10' => [
                'label' => [
                    'index' => 1,
                    'text' => 'Sociedad legal',
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
                    [
                        'fileType' => 'ASSET',
                        'assetId' => 1371636798,
                        'name' => 'WhatsApp Image 2024-03-25 at 1.00.05 PM.jpeg',
                        'extension' => 'jpeg',
                        'isImage' => true
                    ]
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
                    [
                        'fileType' => 'ASSET',
                        'assetId' => 1371639534,
                        'name' => 'WhatsApp Image 2024-03-16 at 6.16.43 PM.jpeg',
                        'extension' => 'jpeg',
                        'isImage' => true
                    ]
                ]
            ],
            'texto72' => [
                'value' => 'g26059816'
            ],
            'archivo7' => [
                'files' => [
                    [
                        'fileType' => 'ASSET',
                        'assetId' => 1371648262,
                        'name' => 'WhatsApp Image 2024-03-25 at 3.07.17 PM.jpeg',
                        'extension' => 'jpeg',
                        'isImage' => true
                    ]
                ]
            ],
            'archivo4' => [
                'files' => [
                    [
                        'fileType' => 'ASSET',
                        'assetId' => 1371650206,
                        'name' => 'WhatsApp Image 2024-03-25 at 3.07.18 PM.jpeg',
                        'extension' => 'jpeg',
                        'isImage' => true
                    ]
                ]
            ],
            'n_meros4' => [
                'value' => 95307,
                'unit' => ''
            ],
            'texto39' => [
                'value' => 'CERES'
            ],
            'texto45' => [
                'value' => 'CERES'
            ],
            'texto71' => [
                'value' => 'california'
            ],
            'pa_s' => [
                'countryCode' => 'US',
                'countryName' => 'United States',
                'changed_at' => '2024-03-27T15:21:35.110Z'
            ],
            'texto1' => [
                'value' => 'Nadia bernal'
            ],
            'tel_fono0' => [
                'phone' => '14242074040'
            ],
            'correo_electr_nico_1' => [
                'email' => 'nbernal693@gmail.com',
                'text' => 'nbernal693@gmail.com'
            ],
            'texto31' => [
                'value' => 'Luis David Bernal'
            ],
            'tel_fono8' => [
                'phone' => '12094108261'
            ],
            'correo_electr_nico_16' => [
                'email' => 'dbernal990@gmail.com',
                'text' => 'dbernal990@gmail.com'
            ]
        ],
        'triggerUuid' => '565b84e3ae3e3390c1544d4aeed35539'
    ]
];

$Api = Manivela\Api::getInstance();

$response = $Api->requiredGeneral($event);

if(!$response)
{
    error('DATA_NOT_FOUND');
}

success(Constants::RESPONSES['DATA_OK'], $response);