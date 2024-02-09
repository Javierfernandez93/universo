<?php

namespace Site;

use HCStudio\Orm;

class PullProperty extends Orm {
    protected $tblName  = 'pull_property';
    
    public function __construct() {
        parent::__construct();
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

    public function getPayments() {

        $payments = $this->connection()->rows("
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
                {$this->tblName}.status = '1'
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

        $PullProperty = new self;
        $PullProperty->user_login_id = $data['user_login_id'];
        $PullProperty->property_id = $data['property_id'];
        $PullProperty->image = $data['image'];
        $PullProperty->create_date = time();

        return $PullProperty->save();
    }
}