<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Session;
use HCStudio\Token;
use HCStudio\Util;

use JFStudio\Cookie;

use Site\CatalogUserType;
use Site\PermissionPerUserSupport;
use Site\UserLogin;
use Site\BuyPerUser;
use Site\Log;
use Constants;

class UserSupport extends Orm {
  protected $tblName  = 'user_support';
  private   $Session = null;
  private   $Token   = null;

  public    $_data    = [];
  public    $_parent  = [];
  public    $_parent_id = false;
  public    $_save_class = false;
  public    $logged  = false;
  public    $expiration_salt_date = 2;
  public    $offes_per_user = 3 ;
  public    $products_per_user = 3 ;
  public    $promo_per_user = 3 ;
  private   $field_control = 'password';
  private   $field_session = 'email';
  private   $_field_type = 'email';

  const PID_NAME = 'pidSupport';
  const EXCEL_HEADERS = [
    'name' => 'names',
    'subelementos' => 'subelements',
    'númerodelote' => 'property_number',
    'desarrollo' => 'real_state',
    'desarrolladora' => 'real_state_developer',
    'afiliado' => 'affiliation',
    'fechadeapertura' => 'start_date',
    'fechadecierre' => 'end_date',
    'díasenproceso' => 'working_days',
    'estadodeventa' => 'sale_state',
    'procesorh' => 'rh_state',
    'operativoap' => 'op_operation',
    'operativocierre' => 'close_operation',
    'financiamiento' => 'financing',
    'monto' => 'amount',
    'porcentajedeenganche' => 'percentaje',
    'verificar' => 'verify',
    'comisión' => 'commission',
    'gerencia' => 'gerency',
    'COORDINACIÓN' => 'coordination',
    'ASESOR' => 'asesor',
    'correoelectrónico' => 'email',
    'nacionalidad' => 'nationality',
    'residencia' => 'residence',
    'SEXO' => 'gender',
    'fechadenacimiento' => 'birthdate',
    'teléfono' => 'phone',
    'estatus' => 'status',
    'OBSERVACIÓN' => 'observation',
  ];

  public function __construct(bool $save_class = false,bool $autoLoad = true) {
    parent::__construct();
    
    $this->_save_class = $save_class;
    
    $this->Session = new Session($this->tblName);
    $this->Token = new Token();

    if($autoLoad)
    {
      if($this->logoutRequest()) return false;

      if($this->loginRequest())
      {
        $this->login();
      } else if($this->hasPid()) {
        if($this->isValidPid())
          $this->login($this->Token->params[$this->field_session],$this->Token->params[$this->field_control]);

      } else if($this->hasPidRequestCookie() === true) {
        $this->loginWithPid(Cookie::get(self::PID_NAME));
      } 
    }
  }
   
  public function hasPidRequestCookie() : bool
  {
    return Cookie::get(self::PID_NAME) ? true : false;
  }

  public function hasPidRequest()
  {
    return isset($_GET[self::PID_NAME]) === true && is_array($_GET[self::PID_NAME]) ? true : false;
  }
  
  public function hasPid() : bool {
    return $this->Session->get(self::PID_NAME) ? true : false;
  }

  public function loginWithPid(array $pid = null)
  {
    if($this->Token->checkToken($pid) == true)
    {
      $this->login($this->Token->params[$this->field_session], $this->Token->params['password']);
    }
  }

  public function isSeller() : bool
  {
    if($this->logged === true)
    {
      return $this->catalog_user_type_id === CatalogUserType::$SELLER;
    }
  }

  public function hasPermission(string $permission = null) : bool
  {
    if($this->getId())
    {
      if(isset($permission) === true)
      {
        return (new PermissionPerUserSupport)->_hasPermission($this->getId(),$permission);
      }
    }

    return false;
  }
  
  public function checkCS() {
    return $this->Session->get(self::PID_NAME);
  }

  public function setFieldSession($field_session = false) {
    $this->_setFieldSession($field_session);
  }

  public function getPid()
  {
    if(isset($this->Session)) {
      return $this->Session->get(self::PID_NAME);
    }

    return false;
  }

  public function _setFieldSession($field_session = false) {
    if($field_session) $this->field_session = $field_session;
  }

  public function getFieldSession() {
    return ['fieldsession'=>$this->field_session,'field_type'=>$this->_field_type];
  }

  public function getTotalCountRegisters() {
    $first_day = mktime(0, 0, 0, 3, 1, date('Y'));
    $last_day = mktime(0, 0, 0, date('m')+1, 0, date('Y'));
    
    return $this->getCountRegisters("AND signup_date BETWEEN {$first_day} AND {$last_day}");
  }
  
  public function getActualMonthRegisters() {
    $first_day = mktime(0, 0, 0, date('m'), 1, date('Y'));
    $last_day = mktime(0, 0, 0, date('m')+1, 0, date('Y'));
    
    return $this->getCountRegisters("AND signup_date BETWEEN {$first_day} AND {$last_day}");
  }

  public function getLastMonthCountRegisters() {
    $first_day = mktime(0, 0, 0, date('m')-1, 1, date('Y'));
    $last_day = mktime(0, 0, 0, date('m'), 0, date('Y'));

    return $this->getCountRegisters("AND signup_date BETWEEN {$first_day} AND {$last_day}");
  }

  public function getCountRegisters($filter = "") {
    $sql = "SELECT 
              COUNT(user_login.user_login_id) as c
            FROM 
              user_login
            WHERE 
              user_login.status = '1'
              {$filter}
            ";
    return $this->connection()->field($sql);
  }

  public function logoutRequest(bool $logout = true) {
    $logout = Util::getParam('adminLogout');

    if($this->hasPidRequestCookie())
    {
      Cookie::destroy(self::PID_NAME);
    }

    if($logout) return $this->logout();
  }

  public function deleteSession() {
    $this->Session->destroy();
  }
  public function isAbiableToSingUp()
  {
    if(!$this->logged)
      if($this->getId() === 0)
        if(!$this->_data && !$this->_parent)
          return true;

    return false;
  }

  public function logout($reload = true)
  {
    $this->deleteSession();
    if($reload) header("Refresh: 0;url=./index.php");
  }

  /* starts security */
  public function getPassForUser() {
    return $this->isAbiableSalt((new Token())->randomKey(10));
  }

  private function getUniqueSalt() {
    if($salt = $this->isAbiableSalt((new Token())->randomKey(5))) return $salt;

    $this->getUniqueSalt();
  }

  private function isAbiableSalt($salt) {
    $sql = "SELECT {$this->tblName}.salt FROM {$this->tblName} WHERE {$this->tblName}.salt = '{$salt}'";

    if($this->connection()->field($sql)) return false;

    return $salt;
  }

  public function isUserOnline($company_id = false) {
    if($company_id)
    {
      $sql = "SELECT {$this->tblName}.last_login_date FROM {$this->tblName} WHERE {$this->tblName}.company_id = '{$company_id}'";
      return $this->isOnline($this->connection()->field($sql));
    }

    return false;
  }

  public function isOnline($last_login_date = false)
  {
    if($last_login_date >= strtotime("-5 minutes")) return true;

    return false;
  }

  public function getData($company_id = false,$filter = '')  {
    if($company_id)
    {
      $sql = "SELECT
                {$this->tblName}.company_id,
                {$this->tblName}.names,
                {$this->tblName}.last_login_date,
                user_settings.background,
                user_settings.personal_message,
                user_settings.gender,
                user_settings.country_id,
                user_settings.image
              FROM
                {$this->tblName}
              LEFT JOIN
                user_settings
              ON
                user_settings.user_login_id = {$this->tblName}.company_id
              WHERE
                {$this->tblName}.company_id = {$company_id}
              AND
                {$this->tblName}.status = '1'
                {$filter}";

      return $this->connection()->row($sql);
    }
    return false;
  }

  public function getCompanyIdByMail($email = false) {
    if($email)
    {
      $sql = "SELECT
                {$this->tblName}.company_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.email = '{$email}'";

      return $this->connection()->field($sql);
    }
    return false;
  }

  private function needChangeControlData() {
    if(!$this->last_login_date) return true;

    if(strtotime('+ '.$this->expiration_salt_date.' minutes',$this->last_login_date) < time()) return true;

    return false;
  }

  public function renewSalt() {
    $this->setSalt(true);
  }

  private function setSalt($force_to_set_salt = false) {
    if($this->needChangeControlData() || $force_to_set_salt)
    {
      $this->salt = $this->getUniqueSalt();
      $this->save();
    }
  }

  private function saveControlData() {
    if($this->needChangeControlData())
    {
      $this->ip_user_address = $_SERVER['REMOTE_ADDR'];
      $this->last_login_date = time();
      $this->save();
    }
  }

  private function doLogin() {
    if($this->hasLogged())
    {
      $this->setSalt();
      $this->setPid();
      $this->saveControlData();
      $this->logged = true;
    }
    return $this->logged;
  }

  public function login($field_session = false,$field_control = false) {
    $field_session = ($field_session) ? $field_session : Util::getParam($this->field_session,false);
    $field_control = ($field_control) ? $field_control : sha1(Util::getParam($this->field_control,false));

    $this->loadWhere("{$this->field_session}=? AND {$this->field_control}=?",[$field_session,$field_control]);
    
    return $this->doLogin();
  }

  public function createPid()
  {
    $data = [
      $this->field_session => $this->{$this->field_session},
      $this->field_control => $this->{$this->field_control},
      "securitySalt" => sha1($this->last_login . $this->ip_user_address . $this->salt),
    ];
    return $this->Token->getToken($data,true,true);
  }
  public function loadDataByClassName($ClassName,$var)
  {
    if($ClassName && $var)
    {
      if(!isset($this->_data[$var]))
      {
        $_parent_id = ($this->_parent_id) ? $this->_parent_id : $this->getId();

        $Class = new $ClassName();
        $Class->loadWhere('user_login_id = ?',$_parent_id);

        if(!$Class->getId()) $Class->user_login_id = $_parent_id;

        $this->_data[$var] = $Class->atributos();

        if($this->_save_class) {
          if(!$Class->getId()) $Class->user_login_id = $this->getId();

          $this->_parent[$var] = $Class;
        }

        return true;
      }
    }
    return false;
  }
  /* deprecated function */
  public function addGoldCoins($coins = true)
  {
    if($coins)
    {
      $this->_parent['user_coin']->gold_coin = ($this->_parent['user_coin']->gold_coin + $coins);

      if($this->_parent['user_coin']->save()) return true;
    }
    return false;
  }
  /* deprecated function */
  public function addSilverCoins($coins = true)
  {
    if($coins)
    {
      $this->_parent['user_coin']->silver_coin = ($this->_parent['user_coin']->silver_coin + $coins);

      if($this->_parent['user_coin']->save()) return true;
    }
    return false;
  }
  public function loadProfile()
  {
    $this->loadDataByClassName(__NAMESPACE__.'\UserLocation','user_location');
    $this->loadDataByClassName(__NAMESPACE__.'\UserSettings','user_settings');
    $this->loadDataByClassName(__NAMESPACE__.'\UserRegistration','user_registration');
    $this->loadDataByClassName(__NAMESPACE__.'\UserCoin','user_coin');
  }
  public function getUniqueToken($lenght = 5, $field = 'secret', $table = 'user_login', $field_as = 'total')
  {
    if($token = $this->Token->randomKey($lenght))
    {
      $sql = "SELECT count({$table}.{$field}) as {$field_as} FROM {$table} WHERE {$table}.{$field} = '{$token}'";

      if($this->connection()->field($sql)) $this->getUniqueToken();
      else return $token;
    }

    return false;
  }

  public function setPid() {
    $pid = $this->createPid();
    $this->Session->set(self::PID_NAME,$pid);
  }

  public function hasLogged() {
    return ($this->getId() == 0) ? false : true;
  }

  public function loginFacebookRequest() {
    if(isset($_GET['user_key']) || isset($_POST['user_key']))
      return true;

    return false;
  }

  public function loginRequest() {
    if(isset($_GET[$this->field_session]) || isset($_POST[$this->field_session]))
    {
      if(isset($_GET[$this->field_control]) || isset($_POST[$this->field_control])) 
      {
        return true;
      }
    }

    return false;
  }

  public function isValidPid() {
    $pid = $this->Session->get(self::PID_NAME);  
    return ($this->Token->checkToken($pid)) ? true : false;
  }

  public function hasData($data)
  {
    if(is_array($data))
    {
      foreach ($data as $key => $field)
        if(!isset($field) || empty($field)) return false;

    } else if(!$data || $data == "") return false;

    return true;
  }

  public function isUniqueMail($email = false) {
    $sql = "SELECT email FROM user_support WHERE user_support.email = '{$email}' LIMIT 1";
    return ($this->connection()->field($sql)) ? false : true;
  }

  public function isUniqueNickname($nick_name = false) {
    $sql = "SELECT nick_name FROM user_login WHERE user_login.nick_name = '{$nick_name}' LIMIT 1";
    return ($this->connection()->field($sql)) ? false : true;
  }

  public function getNames(int $user_support_id = null) 
  {
    if (isset($user_support_id) === true) {
      $sql = "SELECT 
                LOWER(CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name,{$this->tblName}.sur_name)) as names
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_support_id = '{$user_support_id}'
              ";
      return $this->connection()->field($sql); 
    }
  }

  public function getName() 
  {
    if (!$this->logged) {
      return false;
    }
      
    return $this->names;
  }
  
  public function getPhone(int $user_support_id = null) 
  {
    if (isset($user_support_id) === true) {
      $sql = "SELECT 
                {$this->tblName}.phone
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_support_id = '{$user_support_id}'
              ";
      return $this->connection()->field($sql); 
    }
  }

  public function getSupportData(int $user_support_id = null) 
  {
    if (isset($user_support_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.names,
                {$this->tblName}.image
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_support_id = '{$user_support_id}'
              ";

      return $this->connection()->row($sql); 
    }
  }

  public function getNickNameByUserId($user_login_id = false) {
    $sql = "SELECT user_login.nick_name FROM user_login WHERE user_login.company_id = '{$user_login_id}'";
    return $this->connection()->field($sql);
  }

  public function getCompanyIdByNickName($nick_name = false) {
    if($nick_name)
    {
      $sql = "SELECT company_id FROM user_login WHERE user_login.nick_name = '{$nick_name}' LIMIT 1";

      return $this->connection()->field($sql);
    }
    return false;
  }

  public function getUserDataByCompanyId($company_id = false) {
    return $this->_getUserDataByCompanyId($company_id);
  }

  private function _getUserDataByCompanyId($company_id = false) {
    if($company_id)
    {
        $sql = "SELECT
                    user_login.email,
                    user_login.company_id,
                    user_login.names AS names,
                    user_settings.country_id,
                    user_settings.image
                FROM
                    user_login
                LEFT JOIN
                    user_settings
                ON
                    user_settings.user_login_id = user_login.company_id
                WHERE
                    user_login.company_id = {$company_id} ";

        return $this->connection()->row($sql);
    }

    return false;
  }

  public function getUserDataByEmail($email = false) {
    return $this->_getUserDataByEmail($email);
  }

  public function getUserLoginIdByEmail(string $email = null) 
  {
    if(!$email)
    {
      return false;
    }

    return (new UserLogin(false,false))->findField("email = ?",[$email],"user_login_id");
  }
  private function _getUserDataByEmail($email = false) {
    if($email)
    {
        $sql = "SELECT
                    user_login.email,
                    user_login.company_id,
                    user_login.names AS names,
                    user_settings.country_id,
                    user_settings.image
                FROM
                    user_login
                LEFT JOIN
                    user_settings
                ON
                    user_settings.user_login_id = user_login.company_id
                WHERE
                    user_login.email = '{$email}' ";

        return $this->connection()->row($sql);
    }

    return false;
  }

  public function getUsersForSale()
  {
     $sql = "SELECT
                {$this->tblName}.nick_name as name
            FROM
                {$this->tblName}
            WHERE
                {$this->tblName}.nick_name != ''";

      return $this->connection()->rows($sql);
  }

  public function verifyUniqueNickName($nick_name){
     $sql = "SELECT
                    user_login.company_id
                FROM
                    user_login
                WHERE
                    user_login.nick_name = '{$nick_name}' ";


      $id_nick_name = $this->connection()->row($sql);

      return ($id_nick_name && $id_nick_name['company_id'] != $this->getId() ) ? true : false;
  }

  public function thereIsCoincidenceMail($email = false){
    $sql = "SELECT mail FROM user_login WHERE user_login.email LIKE '{$email}' LIMIT 1";
    return ($this->connection()->field($sql)) ? false : true;
  }

  public function getUsersQuery($name = false)
  {
    if($name) {
      $sql = "SELECT
                {$this->tblName}.company_id,
                {$this->tblName}.names,
                {$this->tblName}.email
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.names LIKE '%{$name}%'
              OR
                {$this->tblName}.email LIKE '%{$name}%'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }

  public function getAllUsersWithNoHash()
  {
    $sql = "SELECT
              user_login.company_id,
              user_login.names,
              user_login.hash,
              user_login.email
            FROM
              user_login
            WHERE 
              user_login.hash = '@QG'
              OR
              user_login.hash = ''
            ";

    return $this->connection()->rows($sql);
  }

  public function getAll()
  {
    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.names,
              {$this->tblName}.email
            FROM
              {$this->tblName}
            WHERE 
              {$this->tblName}.active = '1'
            ";

    return $this->connection()->rows($sql);
  }
  public function getUsersAgencyForSearch() {
    $sql = "SELECT
              user_login_agency.company_id,
              user_login_agency.last_login_date,
              user_login_agency.names,
              user_login_agency.email
            FROM
              user_login_agency
            WHERE 
              user_login_agency.company_id > 0
            ORDER BY
              user_login_agency.company_id
            ASC
            ";

    return $this->connection()->rows($sql);
  }

  public function getUsersIp()
  {
      $sql = "SELECT
              user_login.company_id,
              user_login.ip_user_address
            FROM
              user_login
            LEFT JOIN 
              user_location 
            ON
              user_location.company_id = user_login.company_id
            WHERE 
              user_login.company_id > 0
            AND
              user_login.status = '1'
            AND
              user_login.ip_user_address != ''
            AND 
              user_location.locale = '' 
            ";

      return $this->connection()->rows($sql);
  }

  public function getUsersForSearch($filter = "")
  {
    $sql = "SELECT
              user_login.company_id,
              user_setting.personal_message,
              user_setting.gender,
              user_setting.age,
              user_setting.image,
              user_setting.phone,
              user_setting.country,
              user_login.last_login_date,
              user_data.names,
              user_login.email,
              user_login.signup_date
            FROM
              user_login
            LEFT JOIN
              user_setting
            ON
              user_setting.user_login_id = user_login.user_login_id
            LEFT JOIN
              user_data
            ON
              user_data.user_login_id = user_login.user_login_id
            WHERE 
              user_login.company_id > 0
              {$filter}
            ORDER BY
              user_login.company_id
            ASC
            LIMIT 10
            ";

    return $this->connection()->rows($sql);
  }

  public function getUnactiveUsers() {
    $time = strtotime("- 2 months");
    $sql = "SELECT
              user_login.company_id,
              user_login.last_login_date,
              user_login.names
            FROM
              user_login
            WHERE 
              user_login.last_login_date < '{$time}'
            ORDER BY
              user_login.company_id
            ASC
            ";

    return $this->connection()->rows($sql);
  }

  public function getInfo($user_support_id = null)  
  {
    if(isset($user_support_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.phone,
                {$this->tblName}.names,
                {$this->tblName}.image
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_support_id = '{$user_support_id}'
                ";

      return $this->connection()->row($sql);
    }
    return false;
  }

  public function getUserType() 
  {
    if(!$this->logged) {
      return false;
    }

    return ucfirst((new CatalogSupportType)->findField('catalog_support_type_id = ? AND status = 1',[$this->catalog_support_type_id],"name")) ?? 'admin';
  }

  public function getImageForProfile() {
    return isset($this->image) === true ? $this->image : '../../src/img/no-image.png';
  }

  public function getShortName() {
    return $this->names;
  }

  public function deleteClient($user_login_id = null)
  {
    if(isset($user_login_id) === true)
    {
      $UserLogin = new UserLogin;

      if($UserLogin->loadWhere("user_login_id = ?",$user_login_id))
      {
        $UserLogin->status = Constants::DELETE;

        return $UserLogin->save();
      }
    }

    return false;
  }

  public function deleteSeller($user_support_id = null)
  {
    if(isset($user_support_id) === true)
    {
      $UserSupport = new UserSupport(false,false);

      if($UserSupport->loadWhere("user_support_id = ?",$user_support_id))
      {
        $UserSupport->status = Constants::DELETE;

        return $UserSupport->save();
      }
    }

    return false;
  }

  public function getAllClients($filter = "")
  {
    $sql = "SELECT
              user_login.user_login_id,
              user_login.email,
              user_login.verified,
              user_account.image,
              user_contact.phone,
              user_contact.cellular,
              LOWER(CONCAT_WS(' ',user_data.names,user_data.last_name,user_data.sur_name)) as names,
              client_per_seller.user_support_id
            FROM
              user_login
            LEFT JOIN 
              user_data
            ON 
              user_data.user_login_id = user_login.user_login_id
            LEFT JOIN 
              user_contact
            ON 
              user_contact.user_login_id = user_login.user_login_id
            LEFT JOIN 
              user_account
            ON 
              user_account.user_login_id = user_login.user_login_id
            LEFT JOIN 
              user_type
            ON 
              user_type.user_login_id = user_login.user_login_id
            LEFT JOIN 
              client_per_seller
            ON 
              client_per_seller.user_login_id = user_login.user_login_id
            WHERE
              user_login.status = '1'
            AND 
              user_type.catalog_user_type_id = '1'
              {$filter}
              ";
              
    return $this->connection()->rows($sql);
  }

  public function getAllSellers()
  {
    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.email,
              {$this->tblName}.phone,
              {$this->tblName}.cellular,
              {$this->tblName}.image,
              LOWER(CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name,{$this->tblName}.sur_name)) as names
            FROM
              {$this->tblName}
            WHERE
              {$this->tblName}.status = '1' 
            AND 
              {$this->tblName}.catalog_support_type_id = '".CatalogSupportType::ADMINISTRATOR."'
            ORDER BY 
              {$this->tblName}.create_date 
            DESC
              ";

    return $this->connection()->rows($sql);
  }

  public function getBeneficiaries($user_login_id = null)
  {
    // if(isset($user_login_id) === true)
    // {
    //   $UserType = new UserType;

    //   if($users = $UserType->getByType($user_login_id,CatalogUserType::BENEFICIARY))
    //   {
    //     foreach ($users as $key => $user) {
    //       $_users[$key] = $this->getClient($user,CatalogUserType::BENEFICIARY);
    //     }

    //     return $_users;
    //   }
    // }

    return false;
  }

  public function getAvals($user_login_id = null)
  {
    // if(isset($user_login_id) === true)
    // {
    //   $UserType = new UserType;

    //   if($users = $UserType->getByType($user_login_id,CatalogUserType::$AVAL))
    //   {
    //     foreach ($users as $key => $user) {
    //       $_users[$key] = $this->getClient($user,CatalogUserType::$AVAL);
    //     }

    //     return $_users;
    //   }
    // }

    return false;
  }

  public function getClient($user_login_id = null,$catalog_user_type_id = 1)
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                user_login.user_login_id,
                user_login.email,
                user_contact.phone,
                user_contact.cellular,
                user_data.names,
                user_data.gender,
                user_data.birthday,
                user_data.last_name,
                user_data.sur_name,
                LOWER(CONCAT_WS(' ',user_data.names,user_data.last_name,user_data.sur_name)) as name
              FROM
                user_login
              LEFT JOIN 
                user_data
              ON 
                user_data.user_login_id = user_login.user_login_id
              LEFT JOIN 
                user_contact
              ON 
                user_contact.user_login_id = user_login.user_login_id
              LEFT JOIN 
                user_type
              ON 
                user_type.user_login_id = user_login.user_login_id
              WHERE
                user_login.user_login_id = '{$user_login_id}'
              AND 
                user_login.status = '1'
              AND 
                user_type.catalog_user_type_id = '{$catalog_user_type_id}'
                ";
                
      return $this->connection()->row($sql);
    }

    return false;
  }

  public function getSeller($user_support_id = null)
  {
    if(isset($user_support_id) === true)
    {
      return $this->getUserSupport($user_support_id);
    }

    return false;
  }

  public function getUserSupport($user_support_id = null)
  {
    if(isset($user_support_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.names,
                {$this->tblName}.last_name,
                {$this->tblName}.affiliation_id,
                {$this->tblName}.sur_name,
                {$this->tblName}.email,
                {$this->tblName}.gender,
                {$this->tblName}.phone,
                {$this->tblName}.cellular
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_support_id = '{$user_support_id}'
              AND 
                {$this->tblName}.status = '1'
                ";

      return $this->connection()->row($sql);
    }

    return false;
  }

  public function getAdmin($user_support_id = null)
  {
    if(isset($user_support_id) === true)
    {
      return $this->getUserSupport($user_support_id);
    }

    return false;
  }

  public function getAllSupports($user_support_id = null)
  {
    $filter = isset($user_support_id) ? "AND {$this->tblName}.user_support_id != '{$user_support_id}'" : '';

    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              LOWER(CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name,{$this->tblName}.sur_name)) as names,
              {$this->tblName}.email,
              {$this->tblName}.image,
              {$this->tblName}.cellular,
              {$this->tblName}.phone,
              {$this->tblName}.create_date
            FROM
              {$this->tblName}
            WHERE 
              {$this->tblName}.status = '1'
            AND 
              {$this->tblName}.catalog_support_type_id = '".CatalogSupportType::ADMINISTRATOR."'
              {$filter}
              ";

    return $this->connection()->rows($sql);
  }

  public function getAllSupportsFilter($name = null,$filter = "")
  {
    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              LOWER(CONCAT_WS(' ',{$this->tblName}.names,{$this->tblName}.last_name,{$this->tblName}.sur_name)) as names,
              {$this->tblName}.email,
              {$this->tblName}.image,
              {$this->tblName}.cellular,
              {$this->tblName}.phone,
              {$this->tblName}.create_date
            FROM
              {$this->tblName}
            WHERE 
              {$this->tblName}.status = '1'
            AND 
              {$this->tblName}.catalog_user_type_id = '".CatalogUserType::SELLER."'
            AND 
              {$this->tblName}.names LIKE '%{$name}%'
              {$filter}
              ";

    return $this->connection()->rows($sql);
  }

  public function countAdminUsers($catalog_user_type_id = null)
  {
    if(isset($catalog_user_type_id) === true)
    {
      $sql = "SELECT
                COUNT({$this->tblName}.{$this->tblName}_id) as c
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.status = '1'
              AND 
                {$this->tblName}.catalog_user_type_id = '{$catalog_user_type_id}'
                ";

      return $this->connection()->field($sql);
    }

    return false;
  }

  public function countUsers($catalog_user_type_id = null)
  {
    if(isset($catalog_user_type_id) === true)
    {
      $sql = "SELECT
                COUNT(user_type.user_type_id) as c
              FROM
                user_type
              WHERE 
                user_type.status = '1'
              AND 
                user_type.catalog_user_type_id = '{$catalog_user_type_id}'
                ";

      return $this->connection()->field($sql);
    }

    return false;
  }
  
  public function getUsers(string $filter = '')
  {
    if(!$this->getId())
    {
      return false;
    }

    if($this->affiliation_id) {
      $filter .= " AND user_support.affiliation_id = '{$this->affiliation_id}'";
    }
    
    return $this->connection()->rows("SELECT
      user_login.user_login_id,
      user_login.catalog_campaing_id,
      user_login.signup_date,
      user_login.company_id,
      user_login.email,
      user_account.image,
      user_account.has_academy,
      user_account.on_manivela,
      user_data.names,
      user_address.country_id,
      user_contact.phone,
      affiliation.name as affiliation,
      user_referral.referral_id,
      user_support.names as sponsor_name,
      user_referral_data.names as referral_name
    FROM
      user_login
    LEFT JOIN 
      user_data
    ON 
      user_data.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_account
    ON 
      user_account.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_contact
    ON 
      user_contact.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_address
    ON 
      user_address.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_referral
    ON 
      user_referral.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_data as user_referral_data
    ON 
      user_referral_data.user_login_id = user_referral.referral_id
    LEFT JOIN 
      user_support
    ON 
      user_support.user_support_id = user_referral.user_support_id
    LEFT JOIN 
      affiliation
    ON 
      affiliation.affiliation_id = user_support.affiliation_id
    WHERE 
      user_login.status = '1'
      {$filter}
    GROUP BY user_login.user_login_id
    ORDER BY 
      user_login.signup_date
    DESC
    ");
  }
  
  public function getClients(string $filter = '')
  {
    if(!$this->getId())
    {
      return false;
    }

    if($this->affiliation_id) {
      self::appendSupportSellersFilter($filter,$this->getId());
    }
    
    return $this->connection()->rows("SELECT
      user_login.user_login_id,
      user_login.catalog_campaing_id,
      user_login.signup_date,
      user_login.company_id,
      user_login.email,
      user_account.image,
      user_account.has_academy,
      user_account.on_manivela,
      user_data.names,
      user_address.country_id,
      user_contact.phone,
      affiliation.name as affiliation,
      user_referral.referral_id,
      user_support.names as sponsor_name,
      user_referral_data.names as referral_name
    FROM
      user_login
    LEFT JOIN 
      user_data
    ON 
      user_data.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_account
    ON 
      user_account.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_contact
    ON 
      user_contact.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_address
    ON 
      user_address.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_referral
    ON 
      user_referral.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_data as user_referral_data
    ON 
      user_referral_data.user_login_id = user_referral.referral_id
    LEFT JOIN 
      user_support
    ON 
      user_support.user_support_id = user_referral.user_support_id
    LEFT JOIN 
      affiliation
    ON 
      affiliation.affiliation_id = user_support.affiliation_id
    WHERE 
      user_login.status = '1'
      {$filter}
    GROUP BY user_login.user_login_id
    ORDER BY 
      user_login.signup_date
    DESC
    ");
  }
  
  public function getUserReferralId(int $user_login_id = null)
  {
    return (new UserReferral)->getUserReferralId($user_login_id);
  }

  public function getLandingById(int $user_login_id = null)
  {
    return (new UserAccount)->getLandingById($user_login_id);
  }

  public function getUserCredentials(int $user_login_id = null)
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                user_login.email,
                user_login.password
              FROM
                user_login
              WHERE 
                user_login.status = '1'
              AND 
                user_login.user_login_id = '{$user_login_id}'
                ";

      return $this->connection()->row($sql);
    }
  }

  public function getUser(int $user_login_id = null)
  {
    if(!isset($user_login_id))
    {
      return false;
    }
    
    $user = $this->connection()->row("SELECT
      user_login.user_login_id,
      user_login.company_id,
      user_login.signup_date,
      user_login.email,
      user_account.landing,
      user_account.image,
      user_data.names,
      user_data.rfc,
      user_data.curp,
      user_data.nationality,
      user_contact.phone,
      user_address.address,
      user_address.country,
      user_address.state,
      user_address.zip_code,
      user_address.city,
      user_address.colony,
      user_address.country_id
    FROM
      user_login
    LEFT JOIN 
      user_data
    ON 
      user_data.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_account
    ON 
      user_account.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_address
    ON 
      user_address.user_login_id = user_login.user_login_id
    LEFT JOIN 
      user_contact
    ON 
      user_contact.user_login_id = user_login.user_login_id
    WHERE 
      user_login.status = '1'
    AND 
      user_login.user_login_id = '{$user_login_id}'
    ORDER BY 
      user_login.signup_date
    DESC
      ");

    $user['user_references'] = (new UserReference)->findAll("user_login_id = ? AND status != ?",[$user_login_id,-1]);

    return $user;
  }
  
  public function getUserEmail(int $user_login_id = null)
  {
    if(!isset($user_login_id))
    {
      return false;
    }

    return $this->connection()->field("SELECT user_login.email FROM user_login WHERE user_login.user_login_id = '{$user_login_id}'");
  }

  public function getAdministrators(string $filter = '')
  {
    return $this->connection()->rows("SELECT
      {$this->tblName}.{$this->tblName}_id,
      {$this->tblName}.names,
      {$this->tblName}.email,
      {$this->tblName}.create_date,
      {$this->tblName}.status,
      catalog_support_type.name,
      affiliation.name as affiliation
    FROM
      {$this->tblName}
    LEFT JOIN 
      catalog_support_type
    ON 
      catalog_support_type.catalog_support_type_id = {$this->tblName}.catalog_support_type_id
    LEFT JOIN 
      affiliation
    ON 
      affiliation.affiliation_id = {$this->tblName}.affiliation_id
    WHERE 
      {$this->tblName}.status = '1'
      {$filter}
    ORDER BY 
      {$this->tblName}.create_date
    DESC
      ");
  }
  
  public function getCountUsers()
  {
    $sql = "SELECT
              COUNT(user_login.user_login_id) as c
            FROM
              user_login
            WHERE 
              user_login.status = '1'
              ";

    return $this->connection()->field($sql);
  }
  
  public function getBuysList(string $filter = null)
  {
    if($this->getId())
    {
      return (new BuyPerUser)->getList($filter);
    }
  }
  
  public function addLog(array $data = null,int $log_type = null)
  {
    if($this->getId())
    {
      return Log::addNewRecord($this->getId(),$data,$log_type);
    }
  }

  public function getAdminUserGains(array $data = null)
  {
    if($commissions = (new CommissionPerUser)->getAllForAdmin($data))
    {
      return array_map(function($commission) {
        return $commission;
      },$commissions);
    }
  } 

  public static function sanitizeHeader(string $header = null)
  {
    $headerTranslated = '';

    foreach(self::EXCEL_HEADERS as $keyValue => $headerValue)
    {
      if(strtolower($header) == strtolower($keyValue))
      {
        $headerTranslated = $headerValue;
      }
    }

    return $headerTranslated;
  }

  public static function sanitizeHeaders(array $headers = null)
  {
    $headers = array_map(function($header){
      return self::sanitizeHeader(preg_replace('/\s+/', '', $header));
    },$headers);

    return sizeof($headers) > 0 ? $headers : self::EXCEL_HEADERS;
  }

  public static function searchFirstHeaders(array $data = null)
  {
    $_key = -1;

    foreach($data as $key => $values)
    {
      if($valueFilter = array_filter($values))
      {
        if(sizeof($valueFilter) > 5)
        {
          $_key = $key;

          break;
        }
      }
    }
    
    return $_key;
  }

  public static function getWitheSpacesCounter(array $data = null)
  {
    $i = 0;
    $found = false;

    foreach($data as $value)
    {
      if(!$value && !$found)
      {
        $i++;
      } else {
        $found = true;
      }
    }

    return $i;
  }

  public static function getHeaders(array $data = null)
  {
    $key = self::searchFirstHeaders($data);

    $whiteSpaces = self::getWitheSpacesCounter($data[$key]);
    
    $keys = array_slice($data[$key],0,sizeof(array_filter($data[$key]))+$whiteSpaces);
    
    return [
      'key' => $key,
      'headers' => self::sanitizeHeaders($keys)
    ];
  }

  public static function getIndexHeader(array $headers = null,string $name = null)
  {
    return array_search($name,$headers);
  }

  public static function sanitizeUserDataForImport(array $data = null)
  {
    $headersData = self::getHeaders($data);
    $_data = [];

    foreach($data as $key => $value)
    {
      if($key > ($headersData['key']))
      {
        if(sizeof(array_filter($value)) > 5)
        {       
          foreach($headersData['headers'] as $header)
          {
            if($header)
            {

              $_value[$header] = $value[self::getIndexHeader($headersData['headers'],$header)];
            }
          } 

          $_data[] = $_value;
        }
      }
    }

    return [
      'headers' => $headersData['headers'],
      'data' => $_data
    ];
  }

  public function getUserDetail(int $user_login_id = null)
  {
    if(!$user_login_id)
    {
      return false;
    }

    $user = [];

    $user['user_kyc'] = (new CatalogKyc)->findAll("status = ?",1);
    $user['user_kyc'] = array_map(function($catalog_kyc) use($user_login_id){
      $catalog_kyc['value'] = (new UserKyc)->getOrCreate([
        'catalog_kyc_id' => $catalog_kyc['catalog_kyc_id'],
        'user_login_id' => $user_login_id
      ]);

      return $catalog_kyc;
    },$user['user_kyc']);

    $user['user_feedback'] = (new UserFeedback)->allByOrdered("user_login_id = ? AND status != ?",[$user_login_id,-1]);

    return $user;
  }

  public function getUsersCount(int $catalog_user_type_id = null)
  {
    if(!$this->logged)
    {
      return false;
    }
    
    if(!$catalog_user_type_id)
    {
      return false;
    }

    return (new UserLogin(false,false))->countWhere("catalog_user_type_id = ?",$catalog_user_type_id);
  }

  public function getLastUsers(string $limit = null,string $filter = null)
  {
    if(!$this->logged)
    {
      return false;
    }

    return (new UserLogin(false,false))->getLastSigned("LIMIT {$limit}",$filter);
  }

  public function deleteKycValue(array $data = null)
  {
    if(!$this->logged)
    {
      return false;
    }

    if(!$data)
    {
      return false;
    }

    $UserKyc = new UserKyc;
    
    if(!$UserKyc->loadWhere("user_login_id = ? AND catalog_kyc_id = ?",[$data['user_login_id'],$data['catalog_kyc_id']]))
    {
      return false;
    }

    $UserKyc->value = '';
    
    return $UserKyc->save();
  }

  public function userEmailExist(string $email = null)
  {
    if(!$this->logged)
    {
      return false;
    }

    if(!$email)
    {
      return false;
    }

    return (new UserLogin)->loadWhere("email = ? AND status = 1",[$email]);
  }
  
  public function getUserLoginIdByName(string $names = null)
  {
    if(!$this->logged)
    {
      return false;
    }

    if(!$names)
    {
      return false;
    }

    return (new UserData)->getUserLoginIdByName($names);
  }

  public static function safeAdd(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $UserSupportNew = new self(false,false);

    if($user_support_id = $UserSupportNew->findField('email = ?',$data['email'],"user_support_id"))
    {
      return $user_support_id;
    }

    $UserSupportNew->names = ucwords(strtolower($data['names']));
    $UserSupportNew->email = strtolower($data['email']);
    $UserSupportNew->password = sha1($data['password']);
    $UserSupportNew->affiliation_id = isset($data['affiliation_id']) ? $data['affiliation_id'] : 0;
    $UserSupportNew->catalog_support_type_id = isset($data['catalog_support_type_id']) ? $data['catalog_support_type_id'] : 1;
    $UserSupportNew->create_date = time();
    
    return $UserSupportNew->save() ? $UserSupportNew->getId() : false;
  }

  public function getUserToEdit(int $user_login_id = null) : array
  {

    if(!$this->logged)
    {
      return false;
    }

    if(!$user_login_id)
    {
      return false;
    }

    $user = [];

    $UserLogin = new UserLogin(false,false);
    $user['user_login'] = $UserLogin->findRow("user_login_id = ?",$user_login_id);
    
    $UserData = new UserData;
    $user['user_data'] = $UserData->findRow("user_login_id = ?",$user_login_id);
    
    $UserAddress = new UserAddress;
    $user['user_address'] = $UserAddress->findRow("user_login_id = ?",$user_login_id);
    
    $UserContact = new UserContact;
    $user['user_contact'] = $UserContact->findRow("user_login_id = ?",$user_login_id);
    
    $UserReferral = new UserReferral;
    $user['user_referral'] = $UserReferral->findRow("user_login_id = ?",$user_login_id);
    
    $UserAccount = new UserAccount;
    $user['user_account'] = $UserAccount->findRow("user_login_id = ?",$user_login_id);
    
    $UserReference = new UserReference;
    $user['user_reference'] = $UserReference->findAll("user_login_id = ? AND status = 1",$user_login_id);

    return $user;
  }

  public function getLeadershipStats()  
  {
    if(!$this->logged)
    {
      return false;
    }
   
    $affiliations = (new Affiliation)->getAll();

    if(!$affiliations)
    {
      return false;
    }

    $UserReferral = new UserReferral;

    $stats = array_map(function($affiliation) use($UserReferral){
      $affiliation['count_clients'] = 0;
      $affiliation['count_leads'] = 0;
      $affiliation['count_sellers'] = 0;

      $sellers = $UserReferral->findAll("user_support_id = ? AND status = 1",$affiliation['user_support_id'],['referral_id']);


      if($sellers)
      {
        $affiliation['count_sellers'] = sizeof($sellers);

        $referral_ids = array_column($sellers,'referral_id'); 
        $referral_ids = array_unique($referral_ids);
        $referral_ids = implode(",",$referral_ids);

        $affiliation['count_clients'] = $UserReferral->getCountUsersByIn($referral_ids,CatalogUserType::CLIENT);
        $affiliation['count_leads'] = $UserReferral->getCountUsersByIn($referral_ids,CatalogUserType::LEAD);
      }

      return $affiliation;
    },$affiliations);

    array_multisort(array_column($stats, 'count_clients'), SORT_DESC, $stats);


    return $stats;  
  }

  public function getPermissionsGroup(string $code)
  {
    if(!$this->logged || !$code)
    {
      return false;
    }

    return PermissionGroup::getAll($code);
  }  

  public function deleteUsers(array $user_login_ids)
  {
    if(!$this->logged || !$user_login_ids)
    {
      return false;
    }

    foreach($user_login_ids as $user_login_id)
    {
      $this->deleteUser($user_login_id);
    }

    return true;  
  }

  public function deleteUser(int $user_login_id)
  {
    if(!$this->logged || !$user_login_id)
    {
      return false;
    }

    return (new UserLogin(false,false))->find($user_login_id)->updateStatus(Constants::DELETE); 
  }

  public function setAcademyAs(int $user_login_id,int $status)
  {
    if(!$this->logged || !$user_login_id)
    {
      return false;
    }

    return (new UserAccount)->where("user_login_id","=",$user_login_id)->updateField("has_academy",$status); 
  }

  public function getSystemVars()
  {
    if(!$this->logged) {
      return false;
    }

    $catalog_system_var = (new CatalogSystemVar)->findAll("status = 1");
    $SystemVar = new SystemVar; 

    return array_map(function($catalog_system_var) use($SystemVar){
      $catalog_system_var['vars'] = $SystemVar->findAll("catalog_system_var_id = ? AND status = 1",$catalog_system_var['catalog_system_var_id']); 
      return $catalog_system_var;
    },$catalog_system_var);
  }

  public static function appendSupportFilter(string &$filter,int $user_support_id) : void
  {
    if($user_support_id)
    {
      $filter .= " AND user_referral.user_support_id = '{$user_support_id}'";
    }
  }

  public static function appendSupportSellersFilter(string &$filter,int $user_support_id) : void
  {
    $sellersIds = (new UserReferral)->getSellersFromSupportId($user_support_id);
    
    if(!$sellersIds) {
      return;
    }
    
    $sellersIds = implode(",",$sellersIds);
    
    $filter .= " AND user_referral.referral_id IN({$sellersIds})";
  }

  public function getPayments(string $filter = '')
  {
    if(!$this->logged) {
      return false;
    }

    $sellersIds = (new UserReferral)->getSellersFromSupportId($this->getId());

    if(!$sellersIds) {
      return;
    }

    if($this->affiliation_id)
    {
      self::appendSupportSellersFilter($filter,$this->getId());
    }

    return (new PaymentProperty)->getPayments($filter);
  }

  public function getStatsPaymentsResume(int $catalog_payment_type_id) 
  {
    if(!$this->logged) {
      return false;
    }

    $sellersIds = (new UserReferral)->getSellersFromSupportId($this->getId());

    if(!$sellersIds) {
      return;
    }

    $filter = '';

    if($this->affiliation_id)
    {
      self::appendSupportSellersFilter($filter,$this->getId());
    }
    
    return (new PaymentProperty)->getStatsPaymentsResume($catalog_payment_type_id,$filter);
  }

}