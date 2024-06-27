<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

success(null,[
    "entries" => (new Site\Blog)->getAll()
]);