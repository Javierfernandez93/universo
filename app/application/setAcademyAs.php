<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

if(!isset($data['user_login_id']))
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

if(!isset($data['status']))
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

$UserSupport->setAcademyAs($data['user_login_id'],$data['status']);

if($data['status'] == 1)
{
    JFStudio\EmailManager::getInstance()->dispatch('welcome_academy',[
        'names' => $UserSupport->getNames($data['user_login_id']),
        'email' => $UserSupport->getUserEmail($data['user_login_id']),
    ]);
}

success(Constants::RESPONSES['DATA_OK']);