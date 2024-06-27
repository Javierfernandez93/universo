<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

success(null,[
    "stats" => Site\SystemVar::getValues([
        "company_email",
        "company_address",
        "social_instagram",
        "social_whatsapp",
        "experience",
        "real_state",
        "sales",
        "families",
        "people",
        "countries",
    ])
]);