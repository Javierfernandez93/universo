<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

if($data['email'])
{
    $UserLogin = new Site\UserLogin;

    if($UserLogin->isUniqueMail($data['email']))
    {
        if($UserLogin->isUniqueLanding($data['user_account']['landing']))
        {
            if($user_login_id = $UserLogin->doSignup($data))
            {
                $secret = Site\UserLogin::updateSecret($data['email']);

                if(sendEmailUser([
                    'email' => $data['email'],
                    'names' => $data['names'],
                    'password' => $data['password'],
                    'secret' => $secret
                ]))
                {
                    $data['email_sent'] = true;
                }

                if(sendPushUser($user_login_id,$data['names']))
                {
                    $data['push_sent'] = true;
                }

                // if(sendEmailSponsor($data['referral']['user_login_id'],$data['names']))
                // {
                //     $data['email_sponsor_sent'] = true;
                // }

                if(sendPushSponsor($data['referral']['user_login_id'],$data['names']))
                {
                    $data['push_sponsor_sent'] = true;
                }
                
                // if(sendWhatsApp($user_login_id))
                // {
                //     $data['whatsapp_sent'] = true;
                // }

                // if($UserLogin->login($data['email'],sha1($data['password'])))
                if(true)
                {
                    $data['s'] = 1;
                    $data['r'] = 'LOGGED_OK';
                } else {
                    $data['s'] = 0;
                    $data['r'] = 'NOT_LOGGED';
                }
            } else {
                $data['s'] = 0;
                $data['r'] = 'ERROR_ON_SIGNUP';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'USER_NAME_EXIST';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'MAIL_ALREADY_EXISTS';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'NOT_FIELD_SESSION_DATA';
}

function sendWhatsApp(int $user_login_id = null) : bool
{
    return Site\ApiWhatsApp::sendWhatsAppMessage([
        'message' => Site\ApiWhatsAppMessages::getWelcomeMessage(),
        'image' => null,
        'contact' => [
            "phone" => (new Site\UserContact)->getWhatsApp($user_login_id),
            "name" => (new Site\UserData)->getName($user_login_id)
        ]
    ]);
}

function sendPush(string $user_login_id = null,string $message = null,int $catalog_notification_id = null) : bool
{
    return Site\NotificationPerUser::push($user_login_id,$message,$catalog_notification_id,"");
}

function sendPushUser(string $user_login_id = null,string $names = null) : bool
{
    return sendPush($user_login_id,"Bienvenido a bordo {$names}, estamos felices de que te hayas registrado en Site",Site\CatalogNotification::ACCOUNT);
}

function sendPushSponsor(string $user_login_id = null,string $names = null) : bool
{
    return sendPush($user_login_id,"Felicitaciones, {$names} se unió a tu grupo de referidos",Site\CatalogNotification::REFERRAL);
}

function sendEmailSponsor(array $data = null) : bool
{
    if(isset($datanames) === true)
    {
        $UserLogin = new Site\UserLogin;

        if($email = $UserLogin->getEmail($data['user_login_id']))
        {
            return sendEmail([
                'email' => $email,
                'names' => (new Site\UserData)->getNames($data['user_login_id']),
                'subject' => 'Nuevo afiliado en Site',
                'view' => 'partnerWelcome'
            ]);
        }
    }

    return false;
}

function sendEmailUser(array $data = null) : bool
{
    if(isset($data) === true)
    {
        return sendEmail([
            ...$data,
            ...[
                'subject' => 'Bienvenido a Site, activa tu cuenta',
                'view' => 'welcome'
            ]
        ]);
    }

    return false;
}

function sendEmail(array $data = null) : bool
{
    if(isset($data) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("",$data['view'],"mail-new",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

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
            $mail->addAddress($data['email'], $data['names']);     

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $data['subject'];
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 