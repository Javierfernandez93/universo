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

    public function init() {
        $this->getLanguage();
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
        $this->words = $this->getWordsCookie($this->language);
        
        if($this->words == null || self::LOAD_FROM_STORAGE == false) 
        {
            $words = file_get_contents("../../src/languages/{$this->language}.json");
            $words = json_decode($words, true);

            $this->setWordsCookie($this->language, $this->words);
        }
    }

    public function getBrowserLanguage() {
        $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        
        return in_array($lang, self::ACCEPTED_LANGUAGES) ? $lang : 'en';
    }

    public function getLanguage() {
        $this->language = $this->getLanguageCookie();

        if($this->language == null)
        {
            $this->language = $this->sanitizeLanguage($this->getBrowserLanguage());
            $this->setLanguage($this->language);
        }

        return $this->language;
    }

    public function getWordsCookie(string $language = null) {
        $words = Cookie::get("w_{$language}");

        if($words != null)
        {
            return $words;
        }

        return null;
    }

    public function getLanguageCookie() {
        return Cookie::get('language');
    }

    public function setWordsCookie($language,$words) {
        // Cookie::set("w_{$language}", $words);
    }

    public function setLanguageCookie($language) {
        // Cookie::set('language', $language);
    }

    public function setLanguage($language) {
        $this->language = $language;
        $this->setLanguageCookie($this->language);
    }
}