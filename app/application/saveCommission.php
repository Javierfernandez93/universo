<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized();
}

if(!$UserSupport->hasPermission('add_commission')) {
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$UserSupport->saveCommission($data)) {
    error('DATA_ERROR');
}

success();