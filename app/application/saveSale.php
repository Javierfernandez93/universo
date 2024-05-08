<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
}

// formatting data 
$data['property']['promotion'] = $data['property']['promotion'] == 'true' ? 1 : 0;
$data['property']['extension'] = $data['property']['extension'] == 'true' ? 1 : 0;
$data['property']['extension_date'] = $data['property']['extension'] ? strtotime($data['property']['extension_date']) : 0;

// $data['property']['price'] = str_replace(",","",$data['property']['price']);
$data['property']['real_state_id'] = $data['real_state']['real_state_id'];

$data['payment_property']['end_date'] = isset($data['payment_property']['end_date']) && !empty($data['payment_property']['end_date']) ? strtotime($data['payment_property']['end_date']) : 0;
$data['payment_property']['start_date'] = isset($data['payment_property']['start_date']) && !empty($data['payment_property']['start_date']) ? strtotime($data['payment_property']['start_date']) : 0;
$data['user']['new'] = filter_var($data['user']['new'],FILTER_VALIDATE_BOOLEAN);
$data['seller']['new'] = filter_var($data['user']['new'],FILTER_VALIDATE_BOOLEAN);

// saving seller
if($data['seller']['new'])
{
    $data['seller']['email'] = isset($data['seller']['email']) && !empty($data['seller']['email']) ? $data['seller']['email'] : Site\UserLogin::makeEmailFromName($data['seller']['names'].$data['seller']['last_name']);

    $data['seller']['user_login_id'] = (new Site\UserLogin(false,false))->doSignup([
        'user_login' => [
            'password' => $data['seller']['email'],
            'email' => $data['seller']['email'],
            'catalog_user_type_id' => Site\CatalogUserType::SELLER,
        ],
        'user_contact' => [
            'phone' => isset($data['seller']['phone']) ? $data['seller']['phone'] : '',
        ],
        // 'user_address' => [],
        'user_data' => [
            'names' => $data['seller']['names'],
            'last_name' => $data['seller']['last_name'],
            'sur_name' => $data['seller']['sur_name'],
            'nationality' => $data['seller']['nationality']
        ],
        'user_account' => [
            'landing' => Site\UserAccount::formatLandingByEmail($data['seller']['email'])
        ],
        'user_referral' => [
            'user_support_id' => $data['seller']['user_support_id']
        ]
    ]);
}

// saving client
if($data['user']['new'])
{
    $data['user']['email'] = isset($data['user']['email']) && !empty($data['user']['email']) ? $data['user']['email'] : Site\UserLogin::makeEmailFromName($data['user']['names'].$data['user']['last_name']);

    $data['user']['user_login_id'] = (new Site\UserLogin(false,false))->doSignup([
        'user_login' => [
            'password' => $data['user']['email'],
            'email' => $data['user']['email'],
            'catalog_user_type_id' => Site\CatalogUserType::CLIENT,
        ],
        'user_contact' => [
            'phone' => isset($data['user']['phone']) ? $data['user']['phone'] : '',
        ],
        // 'user_address' => [],
        'user_data' => [
            'names' => $data['user']['names'],
            'last_name' => $data['user']['last_name'],
            'sur_name' => $data['user']['sur_name'],
            'nationality' => $data['user']['nationality']
        ],
        'user_account' => [
            'landing' => Site\UserAccount::formatLandingByEmail($data['user']['email'])
        ],
        'user_referral' => [
            'referral_id' => $data['seller']['user_login_id'],
            'user_support_id' => 0
        ]
    ]);
} else {
    Site\UserReferral::updateReferralId($data['user']['user_login_id'],$data['seller']['user_login_id']);
}

// saving property 
if(!$data['property']['property_id'])
{
    $data['property']['user_support_id'] = $UserSupport->getId();
    $data['property']['property_id'] = Site\Property::safeAdd($data['property']);
} else {
    $Property = new Site\Property; 
    $Property->loadArray($data['property']);
    $Property->save();
}

if(!$data['property']['property_id'])
{
    error('NOT_PROPERTY_ID');
}

// saving payment property
$data['payment_property']['property_id'] = $data['property']['property_id'];
$data['payment_property']['user_login_id'] = $data['user']['user_login_id'];

// saving property 
if(!$data['payment_property']['payment_property_id'])
{
    $data['payment_property']['payment_property_id'] = Site\PaymentProperty::safeAdd($data['payment_property']);
} else {
    $PaymentProperty = new Site\PaymentProperty; 
    $PaymentProperty->loadArray($data['payment_property']);
    $PaymentProperty->save();
} 


if(!$data['payment_property']['payment_property_id'])
{
    error('NOT_PAYMENT_PROPERTY_ID');
}

success(Constants::RESPONSES['DATA_OK'],$data);