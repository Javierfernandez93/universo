<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";
require_once TO_ROOT . "/vendor/autoload.php";

use setasign\Fpdi\Fpdi;

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{       
    if($data['sponsor'])
    {
        $data['company_id'] = $UserLogin->company_id;
        $data = sanitizeData($data);

        if($path = createAofDocument($data))
        {
            $data["pelData"] = [
                'data' => $data,
                'path' => $path
            ];
            $data["path"] = $path;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_NUMBER";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_SPONSOR";
    }
} else {
    $data["s"] = 0;
    $data["r"] = "INVALID_CREDENTIALS";
}

function importPage($pdf = null,int $page)
{
    $pdf->AddPage(); 
    $tplIdx = $pdf->importPage($page); 
    $pdf->useTemplate($tplIdx);
}

function properText(string $str = null) :  string {
    return iconv('utf-8','cp1252',$str); 
}

function sanitizeData(array $data = null)
{
    $data['names'] = ucwords(strtolower($data['names']));    
    $data['currentDate'] = HCStudio\Util::getDateWithYear();

    return $data;
}

function createAofDocument(array $data = null)
{
    $pdf = new FPDI();

    $pdf->AddPage(); 
    $pdf->setSourceFile(Site\Lpoa::getSourceTemplateAof(TO_ROOT,'aof')); 

    $tplIdx = $pdf->importPage(1); 
    $pdf->useTemplate($tplIdx); 

    $pdf->SetFont('Arial', '', '11'); 
    $pdf->SetTextColor(0,0,0);

    $name = Site\Lpoa::getCoords('nameAof');
    $pdf->SetXY($name['x'], $name['y']);
    $pdf->Write(0, properText($data['title']) . ' ' . properText($data['names']));

    $investorNumberCords = Site\Lpoa::getCoords('investorNumberAof');
    $pdf->SetXY($investorNumberCords['x'], $investorNumberCords['y']);
    $pdf->Write(0, $data['investor']['number']);

    importPage($pdf,2);

    $pdf->SetFont('Arial', '', '8'); 
    $pdf->SetTextColor(0,0,0);

    $currentDateCords = Site\Lpoa::getCoords('currentDateAof');
    $pdf->SetXY($currentDateCords['x'], $currentDateCords['y']);
    $pdf->Write(0, $data['currentDate']);
    
    $signatureCords = Site\Lpoa::getCoords('signatureAof');
    $pdf->Image($data['signature'], $signatureCords['x'], $signatureCords['y'], 40);

    $path = Site\Lpoa::getSourceTemplateOutput(TO_ROOT,$data['company_id']);

    $pdf->Output(Site\Lpoa::getSourceTemplateOutput(TO_ROOT,$data['company_id']), 'F');
    
    return $path;
}

echo json_encode($data);