<?php

namespace Site;

use Site\PaymentGateway;
use Site\TronWallet;

use HCStudio\Util;
use HCStudio\Orm;

use JFStudio\Constants;

class FeePerPaymentGateway extends Orm {
  protected $tblName  = 'fee_per_payment_gateway';

  const WAITING_FOR_ROLLBACK = 0;
  const PAYED = 1;

  public function __construct() {
    parent::__construct();
  }

  public static function calculateFee(float $amount = null,float $fee = null) : float 
  {
    return Util::getPercentaje($amount,$fee);
  }

  public static function add(array $data = null) 
  {
    if(isset($data) === true)
    {
        $FeePerPaymentGateway = new self;
        
        if(!$FeePerPaymentGateway->exist($data['payment_gateway_id']))
        {
            $FeePerPaymentGateway->payment_gateway_id = $data['payment_gateway_id'];
            $FeePerPaymentGateway->fee = self::calculateFee($data['amount'],$data['fee']);
            $FeePerPaymentGateway->create_date = time();
            $FeePerPaymentGateway->status = self::WAITING_FOR_ROLLBACK;
            
            if($FeePerPaymentGateway->save())
            {
                return PaymentGateway::updateFeePerPaymentGatewayId($data['payment_gateway_id'],$FeePerPaymentGateway->getId());
            }
        }
    }

    return false;
  }

  public function exist(int $payment_gateway_id = null) 
  {
    if(isset($payment_gateway_id) === true)
    {
        $sql = "SELECT 
                    {$this->tblName}.{$this->tblName}_id 
                FROM 
                    {$this->tblName} 
                WHERE
                    {$this->tblName}.payment_gateway_id = '{$payment_gateway_id}'
                AND 
                    {$this->tblName}.status != '".Constants::DELETE."'
                ";

        return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function getAll() 
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.text 
            FROM 
              {$this->tblName} 
            WHERE
              {$this->tblName}.status IN (".Constants::AVIABLE.")
            ";

    return $this->connection()->rows($sql);
  }

  public static function setArrayFeePaymentGatewayAs(array $fee_per_payment_gateway_ids = null,int $status = null) : bool
  {
    $saved = 0;

    foreach($fee_per_payment_gateway_ids as $fee_per_payment_gateway_id)
    {
      if(self::setFeePaymentGatewayAs($fee_per_payment_gateway_id,$status))
      {
        $saved++;
      }
    }

    return $saved == sizeof($fee_per_payment_gateway_ids);
  }

  public static function setFeePaymentGatewayAs(int $fee_per_payment_gateway_id = null,int $status = null)
  {
    if(isset($fee_per_payment_gateway_id,$status) === true)
    {
      $FeePerPaymentGateway = new self;
      
      if($FeePerPaymentGateway->loadWhere('fee_per_payment_gateway_id = ?',$fee_per_payment_gateway_id))
      {
        $FeePerPaymentGateway->rollback_date = time();
        $FeePerPaymentGateway->rollback_address = TronWallet::COMPANY_ADDRESS;
        $FeePerPaymentGateway->status = $status;
        
        return $FeePerPaymentGateway->save();
      }
    }

    return true;
  }

}