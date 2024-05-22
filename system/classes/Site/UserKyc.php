<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Connection;

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

  public static function getFileByNameFullRouteAsFile(array $data = null)
  {
    if(!$data) {
      return false;
    }

    $catalog_kyc_id = (new CatalogKyc)->findField("code = ?",$data['code'],"catalog_kyc_id");

    $UserKyc = new self;
    $userKyc = $UserKyc->findRow("user_login_id = ? AND catalog_kyc_id = ? ",[$data['user_login_id'],$catalog_kyc_id],["value","user_kyc_id"]);

    if(!$userKyc)
    {
      return false;
    }
    
    $userKyc['value'] = strtok($userKyc['value'],"?");
    $ext = pathinfo($userKyc['value'], PATHINFO_EXTENSION);

    return [
      'fileType' => 'ASSET',
      'assetId' => $userKyc['user_kyc_id'],
      'name' => self::getFullFileRoute($userKyc['value']),
      'extension' => $ext,
      'isImage' => in_array($ext,['jpg','jpeg','png','gif'])
    ];
  }

  public static function getFullFileRoute(string $file = null)
  {
    if(!$file)
    {
      return false;
    }

    return Connection::getMainPath().str_replace("../..","",$file); 
  }

  public static function getFileByName(array $data = null)
  {
    if(!$data) {
      return false;
    }

    $CatalogKyc = new CatalogKyc;

    $catalog_kyc_id = $CatalogKyc->findField("code = ?",$data['code'],"catalog_kyc_id");

    if(!$catalog_kyc_id)
    {
      return false;
    }

    $UserKyc = new self;

    $value = $UserKyc->loadWhere("user_login_id = ? AND catalog_kyc_id = ? ",[$data['user_login_id'],$catalog_kyc_id],"value");

    if(!$value)
    {
      return false;
    }

    return $value;
  }
}