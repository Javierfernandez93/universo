<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$catalog_tags = (new Site\CatalogTag)->findAll("status = ?",Constants::AVIABLE);

if(!$catalog_tags) {
    error();
}

success(null,[
    'catalog_tags' => $catalog_tags
]);