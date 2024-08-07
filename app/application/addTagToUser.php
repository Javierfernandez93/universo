<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if(!$UserLogin->logged && !$UserSupport->logged) {
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['user_login_id'])) {
    error(Constants::RESPONSES['NOT_PARAM']);
}

if(!isset($data['catalog_tag_id'])) {
    error(Constants::RESPONSES['NOT_PARAM']);
}

if(!Site\TagPerUser::addTagPerUser([
    'user_login_id' => $data['user_login_id'],
    'catalog_tag_id' => $data['catalog_tag_id']
])) {
    error('NOT_UPDATED');
}

success();