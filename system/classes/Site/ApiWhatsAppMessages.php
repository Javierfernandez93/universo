<?php

namespace Site;

class ApiWhatsAppMessages {
    public $words = [];
    public $language = null;
    
    const LOAD_FROM_STORAGE = true;
    const LANGUAGE_PREVIX = 'whatsapp-';
    const ACCEPTED_LANGUAGES = ['en', 'es'];

	private static $instance;

	public static function getInstance()
 	{
	    if(self::$instance instanceof self === false) {
	      self::$instance = new self;
	    }

	    return self::$instance;
 	}

	public function __destruct() { }

	public function __clone() { }

    public function sanitizeLanguage(string $language = null) {
        return explode('-',$language)[0];
    }

    public static function getFileByLanguage(string $language = null) 
    {
        $words = file_get_contents('../../src/languages/'.self::LANGUAGE_PREVIX.$language.'.json');

        return json_decode($words, true);
    }

    public static function getRandomAnswer(array $answers = null)
    {
        return $answers[rand(0,sizeof($answers)-1)];
    }

    /* random responses */
    public static function getWelcomeMessage(string $language = null)
    {
        $words = self::getFileByLanguage($language);

        return self::getRandomAnswer($words['welcome']);
    }
    
    public static function getInvoiceMessage(string $language = null)
    {
        $words = self::getFileByLanguage($language);
        
        return self::getRandomAnswer($words['invoice']);
    }

    public static function getRequestMessage(string $language = null)
    {
        $words = self::getFileByLanguage($language);
        
        return self::getRandomAnswer($words['new_auth']);
    }

    public static function getUncompleteInvoiceMessage(string $language = null)
    {
        $words = self::getFileByLanguage($language);
        
        return self::getRandomAnswer($words['incomplete_invoice']);
    }
    
    public static function getPayoutMessage(string $language = null)
    {
        $words = self::getFileByLanguage($language);
        
        return self::getRandomAnswer($words['incomplete_invoice']);
    }
}
