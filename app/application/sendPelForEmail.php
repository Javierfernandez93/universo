<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data)
{
    if(sendEmail($data['data'],$data['path']))
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_SEND_MAIL";
    }
}

function sendEmail(array $data = null,string $file_path = null) : bool
{   
    if(isset($data) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("",'new-sign',"mail-new",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $CatalogMailController = Site\CatalogMailController::init(1);

            $Layout->setVar([
                "names" => $data['names'],
                "email" => $data['email'],
                "number" => $data['investor']['number'],
            ]);

            $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF; // PHPMailer\PHPMailer\SMTP::DEBUG_SERVER
            $mail->isSMTP(); 
            // $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            $mail->Host = $CatalogMailController->host;
            $mail->SMTPAuth = true; 
            $mail->Username = $CatalogMailController->mail;
            $mail->Password =  $CatalogMailController->password;
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; 
            $mail->Port = $CatalogMailController->port; 

            //Recipients
            $mail->setFrom($CatalogMailController->mail, $CatalogMailController->sender);
            
            // $mail->AddAddress('javier.fernandez.pa93@gmail.com', 'Javier');
            $mail->AddAddress('support@bridgemarkets.eu', 'BridgeMarkets');
            $mail->AddAddress('corporate@universodejade.com', 'Corporativo Site');
            $mail->AddAddress('admin@universodejade.com', 'Admin Site');

            $mail->AddAttachment($file_path, "LPOA-{$data['investor']['number']}");

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = "LPOA - Account ID {$data['investor']['number']}";
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            d($e);
        }
    }

    return false;
}

echo json_encode($data);