<?php

namespace Site;

use HCStudio\Orm;

class UserData extends Orm {
  protected $tblName  = 'user_data';

  public function __construct() {
    parent::__construct();
  }
  
  public function getNames(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                LOWER(CONCAT_WS(' ',
                  {$this->tblName}.names,
                  {$this->tblName}.last_name,
                  {$this->tblName}.sur_name
                )) as names
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->field($sql);
    }
  }

  public function getUserLoginIdByName(string $names = null) 
  {
    if(!isset($names))
    {
      return false;
    }
    
    return $this->connection()->field("SELECT
        {$this->tblName}.user_login_id
      FROM 
        {$this->tblName}
      WHERE 
        {$this->tblName}.names LIKE  '%{$names}%'
    ");
  }
    
  public function getName(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.names
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->field($sql);
    }

    return false;
  }

  public function search($names = null,$filter = "") 
  {
    if(isset($names) === true && empty($names) === false)
    {
      $sql = "SELECT
                {$this->tblName}.user_login_id,
                user_type.catalog_user_type_id,
                LOWER(CONCAT_WS(' ',
                  {$this->tblName}.names,
                  {$this->tblName}.last_name,
                  {$this->tblName}.sur_name
                )) as names
              FROM 
                {$this->tblName}
              LEFT JOIN 
                client_per_seller
              ON 
                client_per_seller.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_type
              ON 
                user_type.user_login_id = {$this->tblName}.user_login_id
              WHERE 
                (
                    {$this->tblName}.names LIKE '%{$names}%'
                  OR 
                    CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name)  LIKE '%{$names}%'
                  OR 
                    CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name,{$this->tblName}.sur_name)  LIKE '%{$names}%'
                )
                {$filter}
              ";
      
      return $this->connection()->rows($sql);
    }

    return false;
  }

  public static function translateEmploymentStatus(string $employment_status = null) 
  {
    if(!isset($employment_status))
    {
      return false;
    }
    
    switch($employment_status)
    {
      case 'single':
        return 'Soltero';
      case 'married':
        return 'Casado';
      case 'divorced':
        return 'Divorciado';
      case 'widower':
        return 'Viudo';
      default:
        return false;
    }
  }

  public static function translateFisicalStatus(string $fiscal_status = null) 
  {
    if(!isset($fiscal_status))
    {
      return false;
    }

    switch($fiscal_status)
    {
      case 'business_activity':
        return 'Actividad Empresarial';
      case 'leasing':
        return 'Arrendamiento';
      case 'salaried':
        return 'Asalariado';
      case 'interests':
        return 'Intereses';
      case 'professional_services':
        return 'Servicios profesionales';
      case 'fiscal_incorporation':
        return 'Incorporación Fiscal';
      default:
        return false;
    }
  }
  
  public static function translateMaritalStatus(string $marital_status = null) 
  {
    if(!isset($marital_status))
    {
      return false;
    }
    
    switch($marital_status)
    {
      case 'single':
        return 'Soltero';
      case 'married':
        return 'Casado';
      case 'divorced':
        return 'Divorciado';
      case 'widower':
        return 'Viudo';
      default:
        return false;
    }
  }

  public static function translateGender(string $gender = null) 
  {
    if(!isset($gender))
    {
      return false;
    }

    switch($gender)
    {
      case 'male':
        return 'Hombre';
      case 'female':
        return 'Mujer';
      default:
        return false;
    }
  }
}