<?php

namespace JFStudio;

class PayPal {
    // const CLIENT_ID = "AfR2RRNUmTU82_mkmKJvUgCnYYrILn-p3NKjlHAOnLpIHXiNVR0Ag7vpouPxiLuPwG8O8ad65BCJF1oo"; 
    // const CLIENT_SECRET = "ENgAx4PgpYXzBgbiPvL74RaOL3LuHfjpqdwq1Rk3z2xn9sFkxiswVig4IqZfiJjx5XHrFJExMHFYaoDD";

    /* states */
    const APPROVED = 'approved';

    const CLIENT_ID = ""; 
    const CLIENT_SECRET = "";

    const RETURN_URL = "https://www.Sitegroup.io/apps/paypal/";
    const CANCEL_URL = "https://www.Sitegroup.io/apps/backoffice";
    const URL = "https://www.Sitegroup.io/apps/admin/subcore/application/validate_buy.php";
    
    const MODE = 'live'; // 'live', 'sandbox'
    
    const FAILED = "failed";
    const TEMPORAL_VALIDATION = true;

    private static $instance;
    
	public static function getInstance()
 	{
    	if(!self::$instance instanceof self)
      		self::$instance = new self;

    	return self::$instance;
 	}
}