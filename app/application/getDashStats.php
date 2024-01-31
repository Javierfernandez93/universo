<?php

use Site\UserLogin;

 define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $data["stats"] = [
        'total' => [
            'clients' => $UserSupport->getUsersCount(Site\CatalogUserType::CLIENT),
            'sellers' => $UserSupport->getUsersCount(Site\CatalogUserType::SELLER),
            'leads' => $UserSupport->getUsersCount(Site\CatalogUserType::LEAD)
        ],
        'lastClients' => $UserSupport->getLastUsers(5,"AND user_login.catalog_user_type_id = '".Site\CatalogUserType::CLIENT."'"),
        'lastLeads' => $UserSupport->getLastUsers(5,"AND user_login.catalog_user_type_id = '".Site\CatalogUserType::LEAD."'"),
        'chart' => [
            [
                "create_date" => "2018-01-01",
                "users" => 122,
            ]
        ]
    ];

    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 