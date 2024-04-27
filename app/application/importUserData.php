<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->hasPermission('add_client'))
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$UserSupport->logged)
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

// (new Site\UserLogin)->truncate();
// (new Site\UserContact)->truncate();
// (new Site\UserReferral)->truncate();
// (new Site\UserAddress)->truncate();
// (new Site\UserAccount)->truncate();
// (new Site\UserData)->truncate();
// (new Site\Property)->truncate();
// (new Site\RealStateDeveloper)->truncate();
// die;

$data['user']['coordination'] = isset($data['user']['coordination']) && !empty($data['user']['coordination']) ? $data['user']['coordination'] : Site\SystemVar::_getValue("company_name");

# save afiliation
$data['affiliation'] = [
    'affiliation_id' => Site\Affiliation::safeAdd([
        'user_support_id' => $UserSupport->getId(),
        'name' => $data['user']['affiliation']
    ]) 
];

# save leadership
$data['leadership'] = [
    'names' => $data['user']['coordination'],
    'email' => Site\UserLogin::makeEmailFromName($data['user']['coordination']),
    'phone' => '',
];

$data['leadership']['user_support_id'] = Site\UserSupport::safeAdd([
    'names' => $data['leadership']['names'],
    'password' => $data['leadership']['email'],
    'email' => $data['leadership']['email'],
    'affiliation_id' => $data['affiliation']['affiliation_id'],
    'catalog_support_type_id' => Site\CatalogSupportType::LEADERSHIP,
]);

$data['seller'] = [
    'names' => $data['user']['asesor'],
    'email' => Site\UserLogin::makeEmailFromName($data['user']['asesor']),
    'phone' => '',
];

# validate Email
if(!$UserSupport->userEmailExist($data['seller']['email']))
{
    // saving seller data
    $data['seller']['user_login_id'] = (new Site\UserLogin(false,false))->doSignup([
        'names' => $data['seller']['names'],
        'password' => $data['seller']['email'],
        'email' => $data['seller']['email'],
        'catalog_user_type_id' => Site\CatalogUserType::SELLER,
        'user_contact' => [
            'phone' => $data['seller']['phone'],
        ],
        // 'user_address' => [],
        'user_data' => [
            'nationality' => 'Méxicano'
        ],
        'user_account' => [
            'landing' => Site\UserAccount::formatLandingByEmail($data['seller']['email'])
        ],
        'user_referral' => [
            'user_support_id' => $data['leadership']['user_support_id']
        ]
    ]);
} else {
    $data['seller']['user_login_id'] = (new Site\UserLogin(false,false))->findField("email = ?",$data['seller']['email'],"user_login_id");
}


# save user client
if(!$UserSupport->userEmailExist($data['user']['email']))
{
    $data['user']['email'] = isset($data['user']['email']) && !empty($data['user']['email']) ? $data['user']['email'] : Site\UserLogin::makeEmailFromName($data['user']['names']);
    
    $user_login_id = (new Site\UserLogin(false,false))->doSignup([
        'names' => $data['user']['names'],
        'password' => $data['user']['email'],
        'email' => $data['user']['email'],
        'catalog_user_type_id' => Site\CatalogUserType::CLIENT,
        'user_contact' => [
            'phone' => $data['user']['phone'],
        ],
        // 'user_address' => [],
        'user_data' => [
            'nationality' => $data['user']['nationality']
        ],
        'user_account' => [
            'landing' => Site\UserAccount::formatLandingByEmail($data['user']['email'])
        ],
        'user_referral' => [
            'user_login_id' => $data['seller']['user_login_id'] 
        ]
    ]);
}

# save real state developer
$data['developer']['real_state_developer_id'] = Site\RealStateDeveloper::safeAdd([
    'name' => $data['user']['real_state_developer']
]);

$data['proyect']['real_state_id'] = Site\RealState::safeAdd([
    'title' => $data['user']['real_state'],
    'real_state_developer_id' => $data['developer']['real_state_developer_id'],
    'main' => 0
]);

$data['property']['property_id'] = Site\Property::safeAdd([
    'real_state_id' => $data['proyect']['real_state_id'],
    'title' => $data['user']['property_number'],
    'down_payment_price' => 2000,
    'price' => $data['user']['amount'],
    'percentaje' => $data['user']['percentaje'],
    'month_finance' => HCStudio\Util::getNumbers($data['user']['financing'])
]);

success(Constants::RESPONSES['DATA_OK']);