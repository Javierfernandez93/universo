<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

$filter = "AND user_login.catalog_user_type_id = '".Site\CatalogUserType::CLIENT."' ";

if(isset($data['user_login_id']) && $data['user_login_id'])
{
    $filter .= " AND user_login.user_login_id = '{$data['user_login_id']}'";
}

$users = $UserSupport->getClients($filter);

if(!$users)
{
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'users' => $users
]);