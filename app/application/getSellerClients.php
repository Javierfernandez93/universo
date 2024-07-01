<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if(!$UserLogin->logged)
{
    unauthorized();
}

$data['catalog_user_type_id'] = isset($data['catalog_user_type_id']) ? $data['catalog_user_type_id'] : Site\CatalogUserType::CLIENT;

$users = $UserLogin->getUsers($data['catalog_user_type_id']);

if(!$users)
{
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'users' => Site\TagPerUser::getCatalogTags($users),
]);