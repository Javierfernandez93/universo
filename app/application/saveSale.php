<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_PERMISSION']);
}

// formatting data 
$data['property']['extension'] = $data['property']['extension'] == 'true' ? 1 : 0;
$data['property']['promotion'] = $data['property']['promotion'] == 'true' ? 1 : 0;
$data['property']['extension'] = $data['property']['extension'] == 'true' ? 1 : 0;
$data['property']['extension_date'] = $data['property']['extension'] ? strtotime($data['property']['extension_date']) : 0;
$data['property']['price'] = HCStudio\Util::getNumbers($data['property']['price'],0);
$data['property']['real_state_id'] = $data['real_state']['real_state_id'];
$data['payment_property']['start_date'] = strtotime($data['payment_property']['start_date']);
$data['user']['new'] = filter_var($data['user']['new'],FILTER_VALIDATE_BOOLEAN);

$data['user']['names'] = rand(1,10000);

// saving user
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
            'nationality' => $data['user']['nationality']
        ],
        'user_account' => [
            'landing' => Site\UserAccount::formatLandingByEmail($data['user']['email'])
        ],
        'user_referral' => [
            'user_login_id' => 1
        ]
    ]);
}

// saving property 
$data['property']['property_id'] = Site\Property::add($data['property']);

if(!$data['property']['property_id'])
{
    error(JFStudio\Constants::RESPONSES['DATA_ERROR']);
}

// saving payment property
$data['payment_property']['property_id'] = $data['property']['property_id'];
$data['payment_property']['user_login_id'] = $data['user']['user_login_id'];
$data['payment_property']['payment_property_id'] = Site\PaymentProperty::add($data['payment_property']);

if(!$data['payment_property']['payment_property_id'])
{
    error(JFStudio\Constants::RESPONSES['DATA_ERROR']);
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],$data);