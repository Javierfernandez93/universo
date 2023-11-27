<?php

namespace Site;

use HCStudio\Orm;
use JFStudio\Constants;

class GainPerClient extends Orm {
  protected $tblName  = 'gain_per_client';

  const PENDING = 0;
  const DEPOSITED = 1;

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null) : bool|int
  {
    if(isset($data) === true)
    {
      $GainPerClient = new GainPerClient;  
      
      if(!$GainPerClient->exist($data['user_bridge_account_id']))
      {
        $create_date = strtotime(date('Y-m-d 23:59:59', strtotime('last day of previous month')));

        $GainPerClient->user_bridge_account_id = $data['user_bridge_account_id'] ?? 0;  
        $GainPerClient->profit = $data['profit'] ?? 0;  
        $GainPerClient->create_date = $create_date;
        
        return $GainPerClient->save() ? $GainPerClient->getId() : false;
      }
    }

    return false;
  }

  public static function getGainsChart(int $user_login_id = null) : array
  {
    if(isset($user_login_id) === true)
    {
        if($gains = (new GainPerClient)->getAll($user_login_id))
        {
            return $gains;
        }
    }

    return [];
  }

  public function hasGainOnWeek(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
        $start = strtotime('monday this week');
        $end = strtotime(date("Y-m-d 23:59:59",strtotime('sunday this week')));
        
        $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id
                FROM
                  {$this->tblName}
                WHERE 
                  {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                  {$this->tblName}.create_date
                BETWEEN 
                  '{$start}'
                AND 
                  '{$end}'
                ";
                
        return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function getGainOnWeek(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
        $start = strtotime('monday this week');
        $end = strtotime(date("Y-m-d 23:59:59",strtotime('sunday this week')));
        
        $sql = "SELECT
                  {$this->tblName}.amount
                FROM
                  {$this->tblName}
                WHERE 
                  {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                  {$this->tblName}.create_date
                BETWEEN 
                  {$start}
                AND 
                  {$end}
                ";
                
        return $this->connection()->field($sql);
    }

    return false;
  }
  
  public function getGainByDates(array $data = null) : float
  {
    if(isset($data) === true)
    {
      $filter = "";

      if($data['start'] ?? null)
      {
        $filter = "AND {$this->tblName}.create_date BETWEEN '".strtotime($data['start'])."' AND '".strtotime($data['end'])."'";
      }

      $sql = "SELECT
                SUM({$this->tblName}.profit) as profits
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_bridge_account_id = '{$data['user_bridge_account_id']}'
                {$filter}
              ";
              
      if($profits = $this->connection()->field($sql))
      {
        return $profits;
      }
    }

    return 0;
  }

  public function getAll(array $data = null) 
  {
    if(isset($data) === true)
    {
      $ClientPerUser = new ClientPerUser;
      
      if($clients = $ClientPerUser->getAll($data['user_login_id']))
      {
        return array_map(function($client) use($data){
          $client['profits'] = $this->getGainByDates([
            'user_bridge_account_id' => $client['user_bridge_account_id'],
            'start' => $data['start'],
            'end' => $data['end'],
          ]);
          return $client;
        },$clients);
      }
    }

    return false;
  }

  public function exist(int $user_bridge_account_id = null) : bool
  {
    if(isset($user_bridge_account_id) === true)
    {
      $start = strtotime(date('Y-m-01 00:00:00',strtotime('last month')));
      $last = strtotime(date('Y-m-t 23:59:59',strtotime('last month')));

      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_bridge_account_id = '{$user_bridge_account_id}'
              AND 
                {$this->tblName}.create_date 
              BETWEEN
                '{$start}'
              AND 
                '{$last}'
              ";
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function hasProfitsOnMonth(int $user_bridge_account_id = null) : bool
  {
    if(isset($user_bridge_account_id) === true)
    {
      $start = strtotime(date('Y-m-01 00:00:00'));
      $last = strtotime(date('Y-m-t 23:59:59'));

      $sql = "SELECT
                SUM({$this->tblName}.profit) as profit
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_bridge_account_id = '{$user_bridge_account_id}'
              AND 
                {$this->tblName}.create_date 
              BETWEEN
                '{$start}'
              AND 
                '{$last}'
              ";

      if($profits = $this->connection()->field($sql))
      {
        return $profits > 0;
      }
    }

    return false;
  }
}