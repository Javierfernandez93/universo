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

        if($path = createLpoaDocument($data))
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

function createLpoaDocument(array $data = null)
{
    $pdf = new FPDI();

    $pdf->AddPage(); 
    $pdf->setSourceFile(Site\Lpoa::getSourceTemplate(TO_ROOT,$data['sponsor']['lpoa'])); 
    $tplIdx = $pdf->importPage(1); 
    $pdf->useTemplate($tplIdx); 

    $pdf->SetFont('Arial', '', '11'); 
    $pdf->SetTextColor(0,0,0);

    $titleCords = Site\Lpoa::getCoords('title');
    $pdf->SetXY($titleCords['x'], $titleCords['y']);
    $pdf->Write(0, properText($data['title']) . ' ' . properText($data['names']));

    $investorNumberCords = Site\Lpoa::getCoords('investorNumber');
    $pdf->SetXY($investorNumberCords['x'], $investorNumberCords['y']);
    $pdf->Write(0, $data['investor']['number']);

    $offset = 0;

    if($data['month'] == 6) {
        $offset = 24;
    } else if($data['month'] == 12) {
        $offset = 50;
    }

    $monthCords = Site\Lpoa::getCoords('month');
    $pdf->SetXY($monthCords['x']+$offset, $monthCords['y']);
    $pdf->Write(0, 'x');


    $offset = 0;

    if($data['percentage'] == 35) {
        $offset = 15;
    }

    $percentageCords = Site\Lpoa::getCoords('percentage');
    $pdf->SetXY($percentageCords['x']+$offset, $percentageCords['y']);
    $pdf->Write(0, 'x');

    importPage($pdf,2);

    $pdf->SetFont('Arial', '', '8'); 
    $pdf->SetTextColor(0,0,0);

    $namesCords = Site\Lpoa::getCoords('names');
    $pdf->SetXY($namesCords['x'], $namesCords['y']);
    $pdf->Write(0, properText($data['names']));

    $currentDateCords = Site\Lpoa::getCoords('currentDate');
    $pdf->SetXY($currentDateCords['x'], $currentDateCords['y']);
    $pdf->Write(0, $data['currentDate']);
    
    $signatureCords = Site\Lpoa::getCoords('signature');
    $pdf->Image($data['signature'], $signatureCords['x'], $signatureCords['y'], 40);


    $path = Site\Lpoa::getSourceTemplateOutput(TO_ROOT,$data['company_id']);

    $pdf->Output(Site\Lpoa::getSourceTemplateOutput(TO_ROOT,$data['company_id']), 'F');
    
    return $path;
}

echo json_encode($data);