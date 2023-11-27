<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $data["user"] = [
        'company_id' => $UserLogin->company_id,
        'email' => $UserLogin->email,
        'phone' => $UserLogin->_data['user_contact']['phone'],
        'names' => $UserLogin->_data['user_data']['names'],
        'catalog_timezone_id' => $UserLogin->_data['user_account']['catalog_timezone_id'],
        'landing' => $UserLogin->_data['user_account']['landing'],
        'active' => $UserLogin->isActive(),
        'has_card' => $UserLogin->hasCard(),
        'image' => $UserLogin->getProfileImage(),
        'city' => $UserLogin->_data['user_address']['city'],
        'country_id' => $UserLogin->_data['user_address']['country_id'],
        'country' => $UserLogin->getCountryName(),
        'referral_notification' => $UserLogin->_data['user_account']['referral_notification'] ? true : false,
        'referral_email' => $UserLogin->_data['user_account']['referral_email'] ? true : false,
        'info_email' => $UserLogin->_data['user_account']['info_email'] ? true : false,
        'referral' => $UserLogin->getReferral(),
    ];

    if($paymentMethod = (new Site\PaymentMethodPerUser)->_get($UserLogin->company_id))
    {
        $data['user'] = array_merge($data['user'], (new Site\PaymentMethodPerUser)->_get($UserLogin->company_id));
    }

    $Country = new World\Country;

    if($data['include_witdraw_methods'] ?? false)
    {
        $data['withdraw_methods'] = (new Site\WithdrawMethodPerUser)->getAll($UserLogin->company_id);
    }

    if($data['include_countries'] ?? false)
    {
        $data["countries"] = $Country->getAllByWeb();
    }
    $data["s"] = 1;
    $data["r"] = "LOGGED_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 