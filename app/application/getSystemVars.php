<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $data['catalog_system_var_id'] = isset($data['catalog_system_var_id']) ? $data['catalog_system_var_id'] : 1;
    
    if($systemVars = (new Site\SystemVar)->findAll("status = ? AND catalog_system_var_id = ? ",[1,$data['catalog_system_var_id']]))
    {
        $data['systemVars'] = $systemVars;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_SYSTEM_VARS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode($data);