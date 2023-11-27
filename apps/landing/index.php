<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$landing = HCStudio\Util::getVarFromPGS('landing');

if($landing)
{
	if($user_login_id = (new Site\UserAccount)->getIdByLanding($landing))
	{
		HCStudio\Util::redirectTo(Site\UserLogin::_getLanding($user_login_id));
	}
}