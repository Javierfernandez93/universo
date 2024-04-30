<?php

namespace Site;

use HCStudio\Orm;

class PaymentProperty extends Orm {
    protected $tblName  = 'payment_property';
    
    public function __construct() {
        parent::__construct();
    }
   
    public static function safeAdd(array $data = null)
    {
      if(!$data)
      {
        return false;
      }
  
      $PaymentProperty = new self;
      
      if($payment_property_id = $PaymentProperty->findField('property_id = ? AND user_login_id = ?', [$data['property_id'],$data['user_login_id']],"payment_property_id"))
      {
        return $payment_property_id;
      }
      
      return self::add($data);
    }
  
    public static function add(array $data = null) {
        if(!$data) {
            return false;   
        }

        $PaymentProperty = new self;
        $PaymentProperty->loadArray($data);
        $PaymentProperty->create_date = time();
        
        return $PaymentProperty->save() ? $PaymentProperty->getId() : false;
    }

    public function findPropertyUserInfo(int $property_id = null) {
        if(!$property_id) {
            return false;
        }

        $property = $this->connection()->row("
            SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.status,
                {$this->tblName}.property_id,
                property.title,
                real_state.title,
                user_data.names,
                user_referral.referral_id
            FROM
                {$this->tblName} 
            LEFT JOIN 
                property 
            ON 
                {$this->tblName}.property_id = property.property_id
            LEFT JOIN 
                real_state 
            ON 
                real_state.real_state_id = property.real_state_id
            LEFT JOIN 
                user_data 
            ON 
                user_data.user_login_id = {$this->tblName}.user_login_id
            LEFT JOIN 
                user_referral 
            ON 
                user_referral.user_login_id = {$this->tblName}.user_login_id
            WHERE 
                {$this->tblName}.property_id = '{$property_id}'
        ");

        if(!$property) {
            return false;
        }


        $property['last_payment_number'] = $this->getLastPaymentNumber([
            'user_login_id' => $property['user_login_id'],
            'property_id' => $property['property_id'],
        ]);

        return $property;
    }

    public function getPayments(string $filter = null) {

        $payments = $this->connection()->rows("
            SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.status,
                {$this->tblName}.property_id,
                property.title,
                property.price,
                real_state.title as real_state,
                user_data.names,
                user_support.names as support_name,
                user_referral.referral_id,
                catalog_payment_type.catalog_payment_type_id,
                catalog_payment_type.title as payment_type,
                user_data_seller.names as seller_names,
                affiliation.name as affiliation_name,
                user_referral_seller.user_support_id 
            FROM
                {$this->tblName} 
            LEFT JOIN 
                property 
            ON 
                {$this->tblName}.property_id = property.property_id
            LEFT JOIN 
                real_state 
            ON 
                real_state.real_state_id = property.real_state_id
            LEFT JOIN 
                user_data 
            ON 
                user_data.user_login_id = {$this->tblName}.user_login_id
            LEFT JOIN 
                catalog_payment_type 
            ON 
                catalog_payment_type.catalog_payment_type_id = {$this->tblName}.catalog_payment_type_id
            LEFT JOIN 
                user_referral 
            ON 
                user_referral.user_login_id = {$this->tblName}.user_login_id
            LEFT JOIN 
                user_data as user_data_seller
            ON 
                user_data_seller.user_login_id = user_referral.referral_id
            LEFT JOIN 
                user_referral as user_referral_seller
            ON 
                user_referral_seller.user_login_id = user_data_seller.user_login_id
            LEFT JOIN 
                user_support 
            ON 
                user_support.user_support_id = user_referral_seller.user_support_id 
            LEFT JOIN 
                affiliation 
            ON 
                affiliation.affiliation_id = user_support.affiliation_id
            WHERE 
                {$this->tblName}.status = '1'
                {$filter}
            GROUP BY 
                {$this->tblName}.property_id
        ");

        if(!$payments) {
            return false;
        }

        $UserData = new UserData;

        return array_map(function($payment) use($UserData){
            if($payment['referral_id'])
            {
                $payment['seller'] = $UserData->getNames($payment['referral_id']);
            }
            
            $payment['last_payment_number'] = $this->getLastPaymentNumber([
                'user_login_id' => $payment['user_login_id'],
                'property_id' => $payment['property_id'],
            ]);

            $payment['price'] = number_format($payment['price'] / 100, 2, '.', '');

            return $payment;
        }, $payments);
    }

    public function getLastPaymentNumber(array $data = null) {
        return $this->connection()->field("
            SELECT 
                MAX({$this->tblName}.payment_number) 
            FROM 
                {$this->tblName} 
            WHERE 
                {$this->tblName}.user_login_id = '{$data['user_login_id']}' 
            AND 
                {$this->tblName}.property_id = '{$data['property_id']}'
        ");
    }

    public static function pull(array $data = null) {
        if(!$data)
        {
            return false;
        }

        $PaymentProperty = new self;
        $PaymentProperty->user_login_id = $data['user_login_id'];
        $PaymentProperty->property_id = $data['property_id'];
        $PaymentProperty->image = $data['image'];
        $PaymentProperty->create_date = time();

        return $PaymentProperty->save();
    }
}