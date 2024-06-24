<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->hasPermission('list_manivela'))
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$UserSupport->logged)
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$data['user'])
{
    error(Constants::RESPONSES['INVALID_DATA']);
}

$data['user']['names'] = ucwords(strtolower($data['user']['Cliente']));
$data['user']['email'] = strtolower($data['user']['Correo']);


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
} else {
    $user_login_id = $UserSupport->getUserLoginIdByEmail($data['user']['email']);
}

# save real state developer
$data['developer']['real_state_developer_id'] = Site\RealStateDeveloper::safeAdd([
    'name' => 'GRUPO ARKA'
]);

$data['proyect']['real_state_id'] = Site\RealState::safeAdd([
    'title' => ucfirst(strtolower($data['user']['Desarrollo'])),
    'real_state_developer_id' => $data['developer']['real_state_developer_id'],
    'main' => 0
]);

$data['property']['property_id'] = Site\Property::safeAdd([
    'real_state_id' => $data['proyect']['real_state_id'],
    'title' => $data['user']['Unidad'],
    'down_payment_price' => 0,
    'price' => $data['user']['Precio_Venta'],
    'percentaje' => $data['user']['Porcentaje_Enganche'],
    'month_finance' => 0
]);

$data['payment_property']['payment_property_id'] = Site\PaymentProperty::safeAdd([
    'property_id' => $data['property']['property_id'],
    'user_login_id' => $user_login_id,
    'payment_number' => 0,
    'image' => '',
    'create_date' => time(),
    'start_date' => 0,
    'end_date' => 0,
    'catalog_payment_type_id' => (new Site\CatalogPaymentType)->findField('title = ?',$data['user']['Status_venta'],'catalog_payment_type_id'),
]);

success(Constants::RESPONSES['DATA_OK']);