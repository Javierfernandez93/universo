<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$link = HCStudio\Util::getParam('link');

if($link)
{
	if((new Site\ShortUrl)->existCode($link)) {
		Site\ShortUrl::redirectToUrlByCode($link);
	}
}