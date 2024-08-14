<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

$data = HCStudio\Util::getParam();

if(!isset($data['user_login_id'])) {
    error('USER_LOGIN_ID_NOT_FOUND');
}

if(!isset($data['property'])) {
    error('PROPERTY_ID_NOT_FOUND');
}

$user = $UserSupport->getUserToEdit($data['user_login_id']);

if(!$user) {
    error('USER_NOT_FOUND');
}

$event = [
    'event' => [
        'userId' => -6,
        'originalTriggerUuid' => '',
        'boardId' => 2906482119,
        'pulseId' => time(),
        'pulseName' => $user['user_data']['names'], // nombre del cliente
        'groupId' => 'topics',
        'groupName' => 'JULIO',
        'groupColor' => '#579bfc',
        'isTopGroup' => 1,
        'columnValues' => [
            'texto7' => [
                'value' => '' // nombre del cliente repetido
            ],
            'texto81' => [
                'value' => $user['user_data']['last_name'] 
            ],
            'texto10' => [
                'value' => $user['user_login']['email']
            ],
            'tel_fono0' => [
                'phone' => $user['user_contact']['phone']
            ],
            'n_meros3' => [
                'value' => $data['property']['property_title'],
                'unit' => ''
            ],
            'estado_114' => [
                'label' => [
                    'index' => 11,
                    'text' => $data['property']['real_state'], // nombre del proyecto
                    'style' => [
                        'color' => '#BB3354',
                        'border' => '#A42D4A',
                        'var_name' => 'dark-red'
                    ],
                    'is_done' => ''
                ],
                'post_id' => ''
            ],
            'estado_14' => [
                'label' => [
                    'index' => 2,
                    'text' => $data['property']['month_finance'],
                    'style' => [
                        'color' => '#e2445c',
                        'border' => '#CE3048',
                        'var_name' => 'red-shadow'
                    ],
                    'is_done' => ''
                ],
                'post_id' => ''
            ],
            'n_meros4' => [
                'value' => $user['user_address']['zip_code'], // código postal
                'unit' => ''
            ],
            // 'archivo' => [ 'files' => [
            //         new CURLFILE($data['property']['image'])
            //     ]
            // ],
            // 'archivo' => [
            //     'files' => [
            //         [
            //             'fileType' => 'ASSET',
            //             'assetId' => 993936438,
            //             'name' => 'mojonera-de-concreto.png',
            //             'extension' => 'png',
            //             'isImage' => true
            //         ]
            //     ]
            // ],
            'estado_18' => [
                'label' => [
                    'index' => 1,
                    'text' => $data['property']['affiliation_name'],
                    'style' => [
                        'color' => '#e2445c',
                        'border' => '#CE3048',
                        'var_name' => 'red-shadow'
                    ],
                    'is_done' => 1
                ],
                'post_id' => ''
            ]
        ],
        'app' => 'monday',
        'type' => 'create_pulse',
        'triggerTime' => date('Y-m-d\TH:i:s.v'),
        'subscriptionId' => 157350342,
        'triggerUuid' => '3208c26fa5457e3e2b9a25fb249a6864'
    ]
];

$Api = Manivela\Api::getInstance();

$response = $Api->requiredApart($event);

if(!$response)
{
    error('DATA_NOT_FOUND');
}

success(Constants::RESPONSES['DATA_OK'], [
    'response' => $response,
]);