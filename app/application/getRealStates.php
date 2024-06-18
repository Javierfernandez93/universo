<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$realStates = (new Site\RealState)->getAll();

if(!$realStates)
{
    error(JFStudio\Constants::RESPONSES['INVALID_DATA']);
}

success(null,[
    'realStates' => $realStates
]);