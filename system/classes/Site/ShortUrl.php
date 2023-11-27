<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Token;
use HCStudio\Connection;
use HCStudio\Util;

use JFStudio\Constants;

use BlockChain\Wallet;

class ShortUrl extends Orm {
	protected $tblName = 'short_url';
	const SHORT_LINK_URL = "Sitegroup.io";
	const CODE_LENGHT = 7;
	const DEFAULT_TITLE = 'Short Link';
	const DEFAULT_SOURCE = 'Sitegroup.io';
	const DEFAULT_DELAY_TIME = 5;
	const DEFAULT_MEDIUM = 'página';	
	const GHOST = 0; // NONTRACKING
	
	public function __construct() {
		parent::__construct();
	}

	public function getDomain(string $domain= null)
	{

		return Connection::protocol."://".($domain ? $domain : self::SHORT_LINK_URL);
	}

	public function __constructLinkCode()
	{
		return Connection::protocol."://".$this->_constructLinkCode($this->domain,$this->code);
	}

	public function _constructLinkCode($domain = null,$code = null)
	{
		return "{$domain}/{$code}";
	}

	public function constructLinkCode(string $code = null,string $domain = null)
	{
		return $this->getDomain($domain)."/".$code;
	}

	public function getCode()
	{
		return (new Token)->randomKey(self::CODE_LENGHT);
	}

	public function getShortUrlEWallet(int $user_login_id = null,string $url = null,string $title = null)
	{
		if(isset($user_login_id,$url,$title) === true)
		{
			if($short = self::addShort([
				'user_login_id' => $user_login_id,
				'url' => $url,
				'domain' => Connection::getMainPath(),
				'title' => $title
			]))
			{
				return $short;
			}
		}

		return false;
	}

	public static function addShort(array $data = null) : array|bool
	{
		if(isset($data) === true)
		{
			$ShortUrl = new ShortUrl;
			$ShortUrl->title = $data['title'] ?? self::DEFAULT_TITLE;
			$ShortUrl->user_login_id = $data['user_login_id'];
			$ShortUrl->domain = $data['domain'] ? $data['domain'] : self::SHORT_LINK_URL;
			$ShortUrl->url = $data['url'];
			$ShortUrl->code = $data['code'] ?? $ShortUrl->getCode();
			$ShortUrl->source = $data['source'] ?? self::DEFAULT_SOURCE;
			$ShortUrl->create_date = time();
			
			if($ShortUrl->save())
			{
				return [
					'url' => $ShortUrl->constructLinkCode($ShortUrl->code,$ShortUrl->domain),
					'short_url_id' => $ShortUrl->getId()
				];
			}
		}

		return false;
	}

	public function existCode(string $code = null) : bool
	{
		if(isset($code) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.code
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.code = '{$code}'
					AND 
						{$this->tblName}.status = '".Constants::AVIABLE."'
					";
			
			return $this->connection()->field($sql) ? true : false;
		}

		return false;
	}

	public function get(int $short_url_id = null)
	{
		if(isset($short_url_id) === true)
		{
			if($short = $this->_get($short_url_id))
			{
				$short['url'] = $this->constructLinkCode($short['code'],$short['domain']);

				return $short;
			}
		}

		return false;
	}
	
	public function _get(int $short_url_id = null)
	{
		if(isset($short_url_id) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id,
						{$this->tblName}.code,
						{$this->tblName}.title,
						{$this->tblName}.url,
						{$this->tblName}.domain,
						{$this->tblName}.source,
						{$this->tblName}.create_date
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.short_url_id = '{$short_url_id}'
					AND 
						{$this->tblName}.status = '".Constants::AVIABLE."'
					";
			
			return $this->connection()->row($sql);
		}

		return false;
	}

    public function hasShorts(int $user_login_id = null) 
    {
        if(isset($user_login_id) === true)
        {
            $sql = "SELECT 
                        COUNT({$this->tblName}.{$this->tblName}_id) as shorts
                    FROM 
                        {$this->tblName}
                    WHERE
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                    HAVING 
                        shorts > 0
                        ";

            return $this->connection()->field($sql) ? true : false;
        }
        return false;
    }

    public function getLink(Wallet $Wallet = null) 
    {
        if(isset($Wallet) === true)
        {
            if(!$Wallet->short_url_id)
            {
				$Wallet = Wallet::constructWalletShortLink($Wallet);
            }

            return $this->_getLink($Wallet->short_url_id);
        }
        return false;
    }
    
    public function _getLink(int $short_url_id = null) 
    {
        if(isset($short_url_id) === true)
        {
            $sql = "SELECT 
                        CONCAT_WS('/',{$this->tblName}.domain,{$this->tblName}.code) as link
                    FROM 
                        {$this->tblName}
                    WHERE
                        {$this->tblName}.short_url_id = '{$short_url_id}'
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                        ";

            return $this->connection()->field($sql);
        }
        return false;
    }
    
	public function getUrlByCode(string $code = null) 
    {
        if(isset($code) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.url
                    FROM 
                        {$this->tblName}
                    WHERE
                        {$this->tblName}.code = '{$code}'
                    AND 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                        ";

            return $this->connection()->field($sql);
        }
        return false;
    }

	public static function redirectToUrlByCode(string $code = null)
	{
		Util::redirectTo((new self)->getUrlByCode($code));
	}
}