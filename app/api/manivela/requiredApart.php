<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

$event = [
    'userId' => -6,
    'originalTriggerUuid' => '',
    'boardId' => 2906482119,
    'pulseId' => time(),
    'pulseName' => 'Silvia', // nombre del cliente
    'groupId' => 'topics',
    'groupName' => 'JULIO',
    'groupColor' => '#579bfc',
    'isTopGroup' => 1,
    'columnValues' => [
        'texto7' => [
            'value' => $data['client']['name'] 
        ],
        'texto81' => [
            'value' => $data['client']['last_name'] 
        ],
        'texto10' => [
            'value' => $data['client']['email']
        ],
        'tel_fono0' => [
            'phone' => $data['client']['phone']
        ],
        'n_meros3' => [
            'value' => '1220',
            'unit' => ''
        ],
        'estado_114' => [
            'label' => [
                'index' => 11,
                'text' => $data['real_state']['title'],
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
                'text' => '36 msi',
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
            'value' => '16', // número de casa
            'unit' => ''
        ],
        'archivo' => [
            'files' => [
                [
                    'fileType' => 'ASSET',
                    'assetId' => 993936438,
                    'name' => 'mojonera-de-concreto.png',
                    'extension' => 'png',
                    'isImage' => true
                ]
            ]
        ],
        'estado_18' => [
            'label' => [
                'index' => 1,
                'text' => $data['affiliation']['name'],
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
];


$Api = Manivela\Api::getInstance();

$response = $Api->requiredApart($event);

if(!$response)
{
    error('DATA_NOT_FOUND');
}

success(Constants::RESPONSES['DATA_OK'], $response);