<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

$data['catalog_user_type_id'] = isset($data['catalog_user_type_id']) ? $data['catalog_user_type_id'] : Site\CatalogUserType::SELLER;

$users = $UserSupport->getUsers("AND user_login.catalog_user_type_id = '".$data['catalog_user_type_id']."'");

if(!$users) {
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'users' => $users 
]);