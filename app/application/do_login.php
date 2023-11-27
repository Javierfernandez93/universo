<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['password']) $_POST['password'] = $data['password'];
if($data['password']) $_GET['password'] = $data['password'];

if($data['email']) $_POST['email'] = $data['email'];
if($data['email']) $_GET['email'] = $data['email'];

if($data["email"])
{
	if($data["password"])
	{		
		$UserLogin = new Site\UserLogin;

		if(!$UserLogin->needToUpdatePassword($data["email"]))
		{
			if($UserLogin->logged === true)
			{
				if($UserLogin->isVerifiedMail($data['email']))
				{
					if($redirecTo = (new HCStudio\Session())->getFlash('redirecTo')) {
						$data["redirecTo"] = $redirecTo;
					}
		
					if(filter_var($data['rememberMe'], FILTER_VALIDATE_BOOLEAN) == true)
					{
						JFStudio\Cookie::set(Site\UserLogin::PID_NAME,$UserLogin->getPid());
					}
					
					$data["data"] = $data;
					$data["s"] = 1;
					$data["r"] = "LOGGED_OK";
				} else {
					$UserLogin->logout(false);

					if($secret = Site\UserLogin::updateSecret($data['email']))
					{
						if(sendEmailToVerify($data['email'],$secret))
						{
							$data["s"] = 0;
							$data["r"] = "NEED_UPDATE_PASSWORD";
						} else {
							$data["s"] = 0;
							$data["r"] = "ERROR_SENDING_EMAIL";
						}
					} else {
						$data["s"] = 0;
						$data["r"] = "NOT_SECRET";
					}

					$data["s"] = 0;
					$data["r"] = "NOT_VERIFIED";
				}
			} else {
				$data["s"] = 0;
				$data["r"] = "INVALID_PASSWORD";
			}
		} else {
			$UserLogin->logout(false);

			if($secret = Site\UserLogin::updateSecret($data['email']))
			{
				if(sendEmailToUpdatePassword($data['email'],$secret))
				{
					$data["s"] = 0;
					$data["r"] = "NEED_UPDATE_PASSWORD";
				} else {
					$data["s"] = 0;
					$data["r"] = "ERROR_SENDING_EMAIL";
				}
			} else {
				$data["s"] = 0;
				$data["r"] = "NOT_SECRET";
			}
		}
	} else {
		$data["s"] = 0;
		$data["r"] = "NOT_PASSWORD";
	}
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function sendEmailToUpdatePassword(string $email = null,string $secret = null) : bool
{
    if(isset($email,$secret) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("","update-password","mail-new",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $CatalogMailController = Site\CatalogMailController::init(1);

            $Layout->setVar([
                "email" => $email,
                "secret" => $secret
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
            $mail->addAddress($email, 'Usuario Site');     

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Actualiza tu contraseña';
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

function sendEmailToVerify(string $email = null,string $secret = null) : bool
{
    if(isset($email,$secret) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("","verify-account","mail-new",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $CatalogMailController = Site\CatalogMailController::init(1);

            $Layout->setVar([
                "email" => $email,
                "secret" => $secret
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
            $mail->addAddress($email, 'Usuario Site');     

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Verifica tu cuenta';
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 