<?php

namespace JFStudio;

use JFStudio\Cookie;

class Translator 
{
    public $ready = null;
    public $language = null;
    public $words = [];
    
    const LOAD_FROM_STORAGE = true;
    const ACCEPTED_LANGUAGES = ['en', 'es'];
    const DEFAULT_LANGUAGE = 'es';

	private static $instance;

	public static function getInstance(string $language = self::DEFAULT_LANGUAGE)
 	{
	    if(self::$instance instanceof self === false) {
	      self::$instance = new self($language);
	    }

	    return self::$instance;
 	}

	public function __construct(string $language = self::DEFAULT_LANGUAGE)
    {
        $this->init($language);
    } 

	public function __destruct() { }

	public function __clone() { }

    public function init(string $language = self::DEFAULT_LANGUAGE) {
        $this->getLanguage($language);
        $this->getWords();
    }

    public function changeLanguage(string $language = null) {
        $this->setLanguage($language);
        $this->init();
    }

    public function sanitizeLanguage(string $language = null) {
        return explode('-',$language)[0];
    }

    public function getWords() {
        if($this->words != null)
        {
            return $this->words;
        }
        
        $words = file_get_contents("../../src/languages/{$this->language}.json");

        $this->words = json_decode($words, true);
    }
    
    public function getBrowserLanguage() {
        if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
        {
            $language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        } else {
            $language = 'es';
        }
        
        return in_array($language, self::ACCEPTED_LANGUAGES) ? $language : 'en';
    }

    public function getLanguage(string $language = self::DEFAULT_LANGUAGE) {
        $language = isset($language) ? $language : self::DEFAULT_LANGUAGE;
        $language = Cookie::get('language') ? Cookie::get('language') : $language;
        
        if($language == null)
        {
            $language = $this->sanitizeLanguage($this->getBrowserLanguage());
        }
        
        $this->setLanguage($language);

        return $this->language;
    }

    public function t(string $key) : string {
        return isset($this->words[$key]) ? $this->words[$key] : $key;
    }

    public function setLanguage($language) {
        $this->language = $language;
    }
}