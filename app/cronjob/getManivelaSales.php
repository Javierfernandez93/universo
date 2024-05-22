<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

$Api = Manivela\Api::getInstance();

$sales = $Api->getSales();

if(!$sales)
{
    error('NOT_SALES');
}

foreach($sales as $key => $sale)
{
    $data['user'] = [
        'names' => ucwords(strtolower($sale['Cliente'])),
        'email' => strtolower($sale['Correo']),
    ];

    # save user client
    if(!$UserSupport->userEmailExist($data['user']['email']))
    {
        $data['user']['email'] = isset($data['user']['email']) && !empty($data['user']['email']) ? $data['user']['email'] : Site\UserLogin::makeEmailFromName($data['user']['names']);
        
        $user_login_id = (new Site\UserLogin(false,false))->doSignup([
            'user_login' => [
                'password' => $data['user']['email'],
                'email' => $data['user']['email'],
                'catalog_user_type_id' => Site\CatalogUserType::CLIENT,
            ],
            'user_data' => [
                'names' => $data['user']['names'],
                'nationality' => 'Méxicano'
            ],
            'user_contact' => [
                'phone' => '',
            ],
            'user_account' => [
                'landing' => Site\UserAccount::formatLandingByEmail($data['user']['email'])
            ],
            'user_referral' => [
                'user_login_id' => 0
            ]
        ]);
    }

    # save real state developer
    $data['developer']['real_state_developer_id'] = Site\RealStateDeveloper::safeAdd([
        'name' => 'GRUPO ARKA'
    ]);

    $data['proyect']['real_state_id'] = Site\RealState::safeAdd([
        'title' => ucfirst(strtolower($sale['Desarrollo'])),
        'real_state_developer_id' => $data['developer']['real_state_developer_id'],
        'main' => 0
    ]);

    $data['property']['property_id'] = Site\Property::safeAdd([
        'real_state_id' => $data['proyect']['real_state_id'],
        'title' => $sale['Etapa'],
        'down_payment_price' => 0,
        'price' => $sale['Precio_Venta'],
        'percentaje' => $sale['Porcentaje_Enganche'],
        'month_finance' => 0
    ]);
}

success(Constants::RESPONSES['DATA_OK']);