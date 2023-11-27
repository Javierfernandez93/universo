<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $items = array_map(function($value){
        return ["message"=>$value];
    },explode(",",Site\SystemVar::_getValue("quick_questions")));

    shuffle($items);
    array_values($items);
    array_slice($items,0,5);

    $data['message'] = [
        'message' => Site\Parser::doParser(Site\SystemVar::_getValue("welcome_message"),[
            "company_name" => Site\SystemVar::_getValue("company_name"),
        ]),
        'items' => $items
    ];
    $data['r'] = 'DATA_OK';
    $data['s'] = 1;
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

echo json_encode($data); 