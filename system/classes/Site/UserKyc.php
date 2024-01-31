<?php

namespace Site;

use HCStudio\Orm;

class UserKyc extends Orm {
  protected $tblName  = 'user_kyc';

  public function __construct() {
    parent::__construct();
  }
  
  public static function updateKycFields(array $data = null) 
  {
    if(!$data) {
      return false;
    }

    $UserKyc = new self;
    $UserKyc->loadArray($data);
    
    return $UserKyc->save();
  }

  public static function updateKyc(array $data = null) 
  {
    if(!$data) {
      return false;
    }

    $UserKyc = new self;
  
    if(!$UserKyc->loadWhere("user_login_id = ? AND catalog_kyc_id = ?",[$data['user_login_id'],$data['catalog_kyc_id']]))
    {
      return false;
    }

    $UserKyc->value = $data['value'];
    
    return $UserKyc->save();
  }

  public function getOrCreate(array $data = null) 
  {
    if(!$data) {
      return false;
    }

    $UserKyc = new self;
  
    if(!$UserKyc->loadWhere("user_login_id = ? AND catalog_kyc_id = ? ",[$data['user_login_id'],$data['catalog_kyc_id']]))
    {
      $UserKyc->catalog_kyc_id = $data['catalog_kyc_id'];
      $UserKyc->user_login_id = $data['user_login_id'];
      $UserKyc->status = 1;
      $UserKyc->create_date = time();

      $UserKyc->save();
    }

    return $UserKyc->value;
  }
}