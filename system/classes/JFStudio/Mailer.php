<?php

namespace JFStudio;

use JFStudio\Layout;

use Site\CatalogMailController;
use Site\EmailLogger;

use \Exception;

class Mailer
{
    const DEFAULT_LAYOUT = 'mail-new';
    const DEFAULT_VIEW = 'mail';

    public static function send(array $data = null) 
    {
        if(!isset($data))
        {
            return false;
        }

        if(!$data['vars']['email'])
        {
            throw new Exception('Email is required');   
        }

        if(!$data['view'])
        {
            throw new Exception('view is required');   
        }

        if($data['logger'] == true)
        {
            $EmailLogger = new EmailLogger;

            if($EmailLogger->isInLog([
                'email' => $data['vars']['email'],
                'template' => $data['view'],
            ]))
            {
                return false;
            }
        }
            
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $data['layout'] = isset($data['layout']) ? $data['layout'] : self::DEFAULT_LAYOUT;
            $data['view'] = isset($data['view']) ? $data['view'] : self::DEFAULT_VIEW;

            $Layout = Layout::getInstance();
            $Layout->init("",$data['view'],$data['layout'],TO_ROOT.'/apps/mail/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
            $Layout->setScript(['']);

            $CatalogMailController = CatalogMailController::init(1);

            $Layout->setVar($data['vars']);

            $mail->SMTPDebug = \PHPMailer\PHPMailer\SMTP::DEBUG_OFF; 
            $mail->isSMTP(); 

            $mail->Host = $CatalogMailController->host;
            $mail->SMTPAuth = true; 
            $mail->Username = $CatalogMailController->mail;
            $mail->Password =  $CatalogMailController->password;
            $mail->SMTPSecure =  $CatalogMailController->protocol;
            // $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; 
            $mail->Port = $CatalogMailController->port; 

            //Recipients
            $mail->setFrom($CatalogMailController->mail, $CatalogMailController->sender);
            $mail->addAddress($data['vars']['email'], $data['vars']['names']);     

            //Content
            $mail->isHTML(true);                                  
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $data['subject'];
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            $response = $mail->send();

            EmailLogger::add([
                'email' => $data['vars']['email'],
                'template' => $data['view']
            ]);

            return $response;
        } catch (Exception $e) {
            d($e);
        }
    }
}