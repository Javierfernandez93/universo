<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('send_bridge_mail'))
    {
        $data['names'] = !empty(trim($data['names'])) ? $data['names'] : $data['user_names'];
    
        if(!$data['email'])
        {
            $data['email'] = (new Site\UserLogin(false,false))->getEmail($data['user_login_id']);
        }

        if(sendEmail($data))   
        {
            Site\BuyPerBridge::setAsMailSent($data['buy_per_bridge_id']);

            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_SEND_EMAIL';
        }
    } else {
        $UserSupport->addLog([
            'data' => $data,
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}


function sendEmail(array $data = null) : bool
{   
    if(isset($data) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("",'new-payment',"mail-new",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $CatalogMailController = Site\CatalogMailController::init(1);

            $Layout->setVar($data);

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
            // $mail->AddAddress('support@bridgemarkets.eu', 'BridgeMarkets');
            // $mail->AddAddress('finance@bridgemarkets.eu', 'BridgeMarkets');
            $mail->AddAddress('support@exma-trading.com', 'Exma');
            $mail->AddAddress('admin@universodejade.com', 'Admin Site');
            $mail->AddAddress('javier.fernandez.pa93@gmail.com', 'Admin');

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = "Pago Site {$data['account']} - {$data['type']}";
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            d($e);
        }
    }

    return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 