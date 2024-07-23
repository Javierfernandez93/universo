<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized();
}

success(null,[
    'catalogCommissions' => (new Site\CatalogCommission)->findAll("status = 1")
]);