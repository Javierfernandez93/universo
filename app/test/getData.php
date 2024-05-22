<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

d($_FILES);
d($data);

success(Constants::RESPONSES['DATA_OK'],['data' => $data]);