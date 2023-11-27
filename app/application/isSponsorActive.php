<?php

use GPBMetadata\Google\Type\Money;

 define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $data['active'] = (new Site\LicencePerUser)->isActiveSomeTime((new Site\UserReferral)->getReferralId($UserLogin->company_id));
    $data["s"] = 1;
	$data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}
echo json_encode($data);