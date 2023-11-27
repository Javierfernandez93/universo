<?php

namespace Site;

use JFStudio\Cookie;
use JFStudio\Curl;

use HCStudio\Orm;
use HCStudio\Session;
use HCStudio\Token;
use HCStudio\Util;
use HCStudio\Connection;

use World\Country;

use Site\AdviceType;
use Site\BuyPerUser;
use Site\UserPlan;
use Site\Exercise;
use Site\UserBridgeAccount;
use Site\UserTradingAccount;
use Site\ProductPermission;
use Site\MembershipPerUser;
use Site\TransactionRequirementPerUser;

class UserLogin extends Orm {
  protected $tblName  = 'user_login';
  private $Session = false;
  private $Token   = false;
  
  public $_data = [];
  public $_parent = [];
  public $_parent_id = false;
  public $save_class = false;
  public $logged  = false;
  
  private $field_control = 'password';
  private $field_session = 'email';
  private $_field_type = 'email';
  
  public $temporal_permissions = [];

  /* constants */
  const SECRET_LENGHT = 22;
  const SALT_LENGHT = 5;
  const DEFAULT_FIELD_SESSION = 'email';
  const PID_NAME = 'pidUser';
  
  const VERIFIED_MAIL = 1;
  
  const FREE = 0;
  const DEMO = 1;
  const TRADING = 2;

  /* signup */
  const SIGNUP_DAYS = 124;
  const REFERRAL_PATH = 'apps/signup/?uid=';
  
  // const DUMMIE_TRADING_URL = 'http://localhost:8888/dummytraderweb/app/application/do_signup';
  // const DUMMIE_TRADING_BUY_URL = 'http://localhost:8888/dummytraderweb/app/application/saveBuyQuick';
  // const DUMMIE_TRADING_LOGIN_URL = 'http://localhost:8888/dummytraderweb/app/application/loginExternal';

  const DUMMIE_TRADING_URL = 'https://www.dummietrading.com/app/application/do_signup';
  const DUMMIE_TRADING_BUY_URL = 'https://www.dummietrading.com/app/application/saveBuyQuick';
  const DUMMIE_TRADING_LOGIN_URL = 'https://www.dummietrading.com/app/application/loginExternal';

  public function __construct(bool $save_class = false,bool $autoLoad = true,bool $redir = true) {
    parent::__construct();
    
    $this->save_class = $save_class;
    $this->Session = new Session($this->tblName);
    $this->Token = new Token;

    if($autoLoad === true)
    {
      if($this->logoutRequest()) return false;

      if($this->loginRequest())
      {
        $this->login();
      } else if($this->hasPid()) {
        if($this->isValidPid())
        {
          $this->login($this->Token->params[$this->field_session],$this->Token->params[$this->field_control]);
        }
      } else if($this->hasPidRequest() === true) {
        $this->loginWithPid($_GET[self::PID_NAME]);
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
  
  public function loginWithPid(array $pid = null)
  {
    if($this->Token->checkToken($pid) == true)
    {
      $this->login($this->Token->params[$this->field_session], $this->Token->params['password']);
    }
  }

  public function hasPermission(string $permission = null) : bool
  {
    if($this->logged === true)
    {
      if(isset($permission) === true)
      {
        return (new PermissionPerUserSupport)->_hasPermission($this->getId(),$permission);
      }
    }
  }
  
  public function hasPid() : bool {
    return $this->Session->get(self::PID_NAME) ? true : false;
  }

  public function setFieldSession(string $field_session = null) {
    $this->field_session = $field_session ?? self::DEFAULT_FIELD_SESSION;
  }

  public function getFieldSession() {
    return ['fieldsession'=>$this->field_session,'field_type'=>$this->_field_type];
  }

  public function logoutRequest() {
    $logout = Util::getVarFromPGS('logout');

    if($logout) {
      if($this->hasPidRequestCookie())
      {
        Cookie::destroy(self::PID_NAME);
      }

      return $this->logout();
    }
  }

  public function deleteSession() {
    $this->Session->destroy();
  }

  public function isAbiableToSingUp() : bool
  {
    if(!$this->logged)
      if($this->getId() === 0)
        if(!$this->_data && !$this->_parent)
          return true;

    return false;
  }

  public function getDataForSignupExternal() : array
  {
    if($this->logged === true)
    {
      return [
        'email' => $this->email,
        'password' => $this->password,
        'names' => $this->_data['user_data']['names'],
        'image' => $this->_data['user_account']['image'],
        'phone' => $this->_data['user_contact']['phone'],
        'country_id' => $this->_data['user_address']['country_id'],
      ];
    }

    return [];
  }

  public function getCountryId()
  {
    if($this->getId())
    {
      return $this->_data['user_address']['country_id'] ? $this->_data['user_address']['country_id'] : 159;// default mx
    }
  }
  
  public function logout(bool $reload = true) 
  {
    $this->deleteSession();

    if($reload) 
      header("Refresh: 0;url=./index.php");
  }

  /* starts security */
  public function getPassForUser() {
    return $this->isAbiableSalt((new Token())->randomKey(10));
  }

  private function getUniqueSalt() {
    if($salt = $this->isAbiableSalt((new Token())->randomKey(self::SALT_LENGHT))) return $salt;

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

  public function isOnline(int $last_login_date = null) : bool
  {
    return $last_login_date >= strtotime("-5 minutes");
  }

  private function needChangeControlData() {
    if(!$this->last_login_date) return true;

    return strtotime('+ '.$this->expiration_salt_date.' minutes',$this->last_login_date) < time();
  }

  public function renewSalt() : bool {
    return $this->setSalt(true);
  }

  private function setSalt(bool $force_to_set_salt = false) : bool {
    if($this->needChangeControlData() || $force_to_set_salt)
    {
      $this->salt = $this->getUniqueSalt();

      return $this->save();
    }

    return false;
  }

  private function saveControlData() 
  {
    if($this->needChangeControlData())
    {
      $this->ip_user_address = $_SERVER['REMOTE_ADDR'];
      $this->last_login_date = time();

      return $this->save();
    }

    return false;
  }

  private function doLogin() 
  {
    if($this->hasLogged())
    {
      if($this->setSalt(true))
      {
        if($this->setPid())
        {
          if($this->saveControlData())
          {
            if($this->loadProfile())
            {
              $this->logged = true;
            }
          }
        }
      }
    }

    return $this->logged;
  }

  public function login(string $field_session = null,string $field_control = null) 
  {
    $field_session = isset($field_session) ? $field_session : Util::getVarFromPGS($this->field_session,false);
    $field_control = isset($field_control) ? $field_control : sha1(Util::getVarFromPGS($this->field_control,false));
    
    if($this->loadWhere("{$this->field_session}=? AND {$this->field_control}=?",[$field_session,$field_control]))
    {
      return $this->doLogin();
    }
  }

  public function loginWithMemory() 
  {
    return $this->login($this->email,$this->password);
  }

  public function createPid()
  {
    return $this->Token->getToken([
      $this->field_session => $this->{$this->field_session},
      $this->field_control => $this->{$this->field_control},
      "securitySalt" => sha1($this->last_login . $this->ip_user_address . $this->salt),
    ],true,true);
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

        if($this->save_class) {
          if(!$Class->getId()) $Class->user_login_id = $this->getId();

          $this->_parent[$var] = $Class;
        }

        return true;
      }
    }
    return false;
  }

  public function loadProfile() : bool
  {
    $this->loadDataByClassName(__NAMESPACE__.'\UserData','user_data');
    $this->loadDataByClassName(__NAMESPACE__.'\UserAddress','user_address');
    $this->loadDataByClassName(__NAMESPACE__.'\UserContact','user_contact');
    $this->loadDataByClassName(__NAMESPACE__.'\UserAccount','user_account');

    return true;
  }

  public static function updateSecret(string $email = null) : bool|string
  {
    $UserLogin = new self(false,false);
    
    if($UserLogin->loadWhere('email = ?',$email))
    {
      $UserLogin->secret = Token::__randomKey(self::SECRET_LENGHT);
      
      return $UserLogin->save() ? $UserLogin->secret : false;
    }
    
    return false;
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

  public function setPid() : bool {
    $this->Session->set(self::PID_NAME,$this->createPid());

    return true;
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
      if(isset($_GET[$this->field_control]) || isset($_POST[$this->field_control])) {
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
      foreach ($data as $field)
        if(!isset($field) || empty($field)) return false;

    } else if(!$data || $data == "") return false;

    return true;
  }

  public static function redirectTo(string $route_name = null)
  {
    Util::redirectTo(TO_ROOT."/apps/login/",[
      'page' => Util::getCurrentURL(),
      'route_name' => $route_name
    ]);
  }

  function checkRedirection()
  {
    // @todo
  }

  public function getPid()
  {
    if(isset($this->Session)) {
      return $this->Session->get(self::PID_NAME);
    }

    return false;
  }

  public function isValidMail(string $email = null) {
    $sql = "
            SELECT 
              {$this->tblName}.email
            FROM 
              {$this->tblName}
            WHERE
              {$this->tblName}.email = '{$email}'
            ";

    return $this->connection()->field($sql) ? false : true;
  }
  
  public function isUniqueMail($email = false) {
    $sql = "SELECT email FROM user_login WHERE user_login.email = '{$email}' LIMIT 1";
    return ($this->connection()->field($sql)) ? false : true;
  }

  public function doSignup(array $data = null) 
  {
    $UserLogin = new UserLogin(false,false);
    $UserLogin->email = $data['email'];
    $UserLogin->password = sha1($data['password']);
    $UserLogin->signup_date = time();
    $UserLogin->verified_mail = self::VERIFIED_MAIL;
    
    if($UserLogin->save())
    {
      $UserLogin->company_id = $UserLogin->getId();
      
      if($UserLogin->save())
      {
        $UserData = new UserData;
        $UserData->user_login_id = $UserLogin->company_id;
        $UserData->names = trim($data['names']);
        
        if($UserData->save())
        {
          $UserContact = new UserContact;
          $UserContact->user_login_id = $UserLogin->company_id;
          $UserContact->phone = $data['phone'];
          
          if($UserContact->save())
          {
            $UserAddress = new UserAddress;
            $UserAddress->user_login_id = $UserLogin->company_id;
            $UserAddress->address = '';
            $UserAddress->colony = '';
            $UserAddress->city = $data['city'] ?? '';
            $UserAddress->state = '';
            $UserAddress->country = $data['country'] ?? '';
            $UserAddress->country_id = isset($data['country_id']) && !empty($data['country_id']) ? $data['country_id'] : 0;
            
            // d($UserAddress);

            if($UserAddress->save())
            {
              $UserAccount = new UserAccount;
              $UserAccount->user_login_id = $UserLogin->company_id;
              $UserAccount->landing = $data['user_account']['landing'];
              $UserAccount->image = UserAccount::DEFAULT_IMAGE;

              if(isset($data['referral']))
              {
                $UserReferral = new UserReferral;
                $UserReferral->referral_id = isset($data['referral']['user_login_id']) && !empty($data['referral']['user_login_id']) ? $data['referral']['user_login_id'] : 1;
                $UserReferral->user_login_id = $UserLogin->company_id;
                $UserReferral->catalog_level_id = 0;
                $UserReferral->status = UserReferral::WAITING_FOR_PAYMENT;
                $UserReferral->create_date = time();
                $UserReferral->save();
              }

              if($UserAccount->save())
              {
                return $UserLogin->company_id;
              }
            }
          }
        }
      }
    }

    return false;
  }

  public function getEmail(int $user_login_id = null) 
  {
    if (isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.email
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
      return $this->connection()->field($sql); 
    }

    return false;
  }

  public function getFirsNameLetter() 
  {
    if ($this->getId()) 
    {
      return mb_substr((new UserData)->getNames($this->company_id), 0, 1);
    }
  }

  public function getNames() 
  {
    if ($this->getId()) 
    {
      return ucfirst((new UserData)->getNames($this->company_id));
    }
  }

  /* profile fun */  
  public function getPlan()
  {
    return (new UserPlan)->getPlan($this->company_id);
  }
  
  public function hasPlan() : bool
  {
    return (new UserPlan)->hasPlan($this->company_id);
  }

  public function hasCard() : bool
  { 
    return (new UserCard)->hasCard($this->company_id);
  }

  public function getLanding() : string 
  {
    if($this->getId())
    {
      return self::_getLanding($this->company_id);
    }
  }

  public static function _getLanding(int $user_login_id = null) : string 
  {
    if(isset($user_login_id) === true)
    {
      return Connection::getMainPath().'/apps/signup/?uid='.$user_login_id;
    }
  }

  public function getReferralId() : string 
  {
    if($this->getId())
    {
      return (new UserReferral)->getReferralId($this->company_id);
    }
  }

  /* profile fun */  
  public function getProfile(int $user_login_id = null)
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.email,
                {$this->tblName}.user_login_id,
                user_contact.phone,
                user_address.country_id,
                user_data.names,
                user_account.image
              FROM 
                {$this->tblName}
              LEFT JOIN
                user_data 
              ON 
                user_data.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN
                user_contact 
              ON 
                user_contact.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN
                user_address 
              ON 
                user_address.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN
                user_account 
              ON 
                user_account.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN
                user_referral 
              ON 
                user_referral.referral_id = {$this->tblName}.user_login_id
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
      
      return $this->connection()->row($sql);
    }
  }

  /* profile fun */  
  public function getReferralCount()
  {
    if($this->getId())
    {
      return (new UserReferral)->getReferralCount($this->company_id);
    }

    return 0;
  }
  
  public function getReferral()
  {
    if($this->getId())
    {
      return (new UserReferral)->getReferral($this->company_id);
    }

    return 0;
  }
  
  public function getLastTransactions()
  {
    if($this->getId())
    {
      return (new TransactionRequirementPerUser)->getLastTransactions($this->company_id,"LIMIT 5");
    }
  }

  public function getSignupDate(int $company_id = null)
  {
    if(isset($company_id))
    {
      $sql = "SELECT
                {$this->tblName}.signup_date
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$company_id}'";

      return $this->connection()->field($sql);
    }

    return 0;
  }

  public static function _isActive(int $company_id = null) : bool
  {
    return (new BuyPerUser)->isActive($company_id);
  }

  public function isActive() : bool
  {
    if($this->getId())
    {
      return self::_isActive($this->company_id);
    }

    return false;
  }

  public function getLastSigned(string $limit = null)
  {
    if($users = $this->_getLastSigned($limit))
    {
      $Country = new Country;

      return array_map(function($user) use($Country){
        $user['advice_type'] = AdviceType::SIGNUP;
        $user['showed'] = false;
        $user['country'] = $Country->getCountryName($user['country_id']);
        return $user;
      },$users);
    }

    return false;
  }

  public function _getLastSigned(string $limit = null)
  {
    $minSignupDate = strtotime("-".self::SIGNUP_DAYS." days");
  
    $sql = "SELECT
              {$this->tblName}.signup_date,
              user_data.names,
              user_address.country_id
            FROM
              {$this->tblName}
            LEFT JOIN
              user_data
            ON 
              user_data.user_login_id = {$this->tblName}.user_login_id
            LEFT JOIN
              user_address
            ON 
              user_address.user_login_id = {$this->tblName}.user_login_id
            WHERE 
              {$this->tblName}.signup_date >= '{$minSignupDate}'
              {$limit}";

    return $this->connection()->rows($sql);
  }

  public function getUserData(int $user_login_id = null)
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                user_data.user_login_id,
                user_data.names,
                user_account.image
              FROM
                user_data
              LEFT JOIN
                user_account
              ON 
                user_account.user_login_id = user_data.user_login_id
              WHERE 
                user_data.user_login_id = '{$user_login_id}'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }

  public function getBuysForAdvices()
  {
    return (new BuyPerUser)->getBuysForAdvices();
  }

  public function getPidQuery() : string
  {
    return $this->logged === true ? "?".http_build_query(["pid" => $this->getPid()]) : '';
  }

  public function getTimeZone()
  {
    if($this->hasTimeZoneConfigurated())
    {
      return (new UserAccount)->getTimeZone($this->company_id);
    }

    return UserAccount::DEFAULT_TIME_ZONE;
  }

  public function hasTimeZoneConfigurated()
  {
    if($this->logged === true)
    {
      return $this->_data['user_account']['catalog_timezone_id'] ? true : false;
    }
  }

  public function getReferralLanding()
  {
    if($this->logged === true)
    {
      return $this->_data['user_account']['landing'] ? $this->_data['user_account']['landing'] : self::REFERRAL_PATH.$this->company_id;
    }
  }

  public static function getAccountType(int $user_login_id = null) : int
  { 
    if((new Exercise)->hasExerciseStatus($user_login_id,"'".Exercise::IN_PROGRESS."','".Exercise::WAITING."'"))
    {
      return self::DEMO;
    } else if((new UserTradingAccount)->hasAccountStatus($user_login_id,"'".Exercise::IN_PROGRESS."','".Exercise::WAITING."'")) {
      return self::TRADING;
    } else {
      return self::FREE;
    }
  }

  public function getData($company_id = false,$filter = '')  
  {
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

  public function getCompanyIdByMail(string $email = null) 
  {
    if(isset($email) === true)
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

  public function getProfileImage() 
  {
    if($this->logged === true)
    {
      return $this->_data['user_account']['image'] != "" ? $this->_data['user_account']['image'] : UserAccount::DEFAULT_IMAGE;
    }

    return false;
  }

  public function getNetworkInfo() : array|bool
  {
    if($this->logged === true)
    {
      if($network = (new UserReferral)->getNetwork(-1,$this->company_id))
      {
        $total = array_sum(array_map("count", $network));

        return [
          'directs' => sizeof($network[0]),
          'total' => $total
        ];
      }
    }

    return false;
  }

  public function getNetworkChild(int $company_id = null) : array|bool
  {
    if($this->logged === true)
    {
      if($network = (new UserReferral)->getNetwork(10,$company_id))
      {
        return $network;
      }
    }

    return false;
  }

  public function changePassword(string $password = null) : bool
  {
    if($this->logged === true)
    {
      $this->password = sha1($password);

      return $this->save();
    }

    return false;
  }

  public function getBridgeAccount(int $catalog_broker_id = null) : array|bool
  {
    if($this->logged === true)
    {
      if($account = (new UserBridgeAccount)->get($this->company_id,$catalog_broker_id))
      {
        return $account;
      }
    }

    return false;
  }
  
  public function getCountryName() : string|bool
  {
    if($this->logged === true)
    {
      return (new Country)->getCountryName($this->_data['user_address']['country_id']);
    }

    return false;
  }

  public function isPasswordMatch(string $password = null) : string|bool
  {
    if($this->logged === true)
    {
      return sha1($password) == $this->password;
    }

    return false;
  }

  public function isUniqueLanding(string $landing = null) : bool
  {
    return (new UserAccount)->isUniqueLanding($landing);
  }

  public function getUser(int $user_login_id = null)
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                user_login.user_login_id,
                user_login.signup_date,
                user_login.company_id,
                user_login.email,
                user_data.names
              FROM
                user_login
              LEFT JOIN 
                user_data
              ON 
                user_data.user_login_id = user_login.user_login_id
              WHERE 
                user_login.status = '1'
              AND  
                user_login.user_login_id = '{$user_login_id}'
              ORDER BY 
                user_login.signup_date
              DESC
                ";
  
      return $this->connection()->row($sql);
    }
  }

  public function needToUpdatePassword(string $email = null) : bool
  {
    if(isset($email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.email
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND  
                {$this->tblName}.update_password = '1'
                ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function updateAsVerified(array $data = null) : bool
  {
    if($company_id = $this->getIdBySecretAndEmailForEmailValidation($data['secret'],$data['email']))
    {
      if($this->loadWhere('company_id = ?',$company_id))
      {
        $this->verified_mail = self::VERIFIED_MAIL;
        
        return $this->save();
      }
    }

    return false;
  }
  
  public function updatePassword(array $data = null) : bool
  {
    if($company_id = $this->getIdBySecretAndEmail($data['secret'],$data['email']))
    {
      if($this->loadWhere('company_id = ?',$company_id))
      {
        $this->verified_mail = self::VERIFIED_MAIL;
        $this->secret = '';
        $this->update_password = 0;
        
        return $this->save();
      }
    }

    return false;
  }

  public function getIdBySecretAndEmail(string $secret = null,string $email = null) : int|bool
  {
    if(isset($secret,$email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.company_id
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND 
                {$this->tblName}.secret = '{$secret}'
              AND  
                {$this->tblName}.update_password = '1'
                ";
  
      return $this->connection()->field($sql);
    }

    return false;
  }

  public function getIdBySecretAndEmailForEmailValidation(string $secret = null,string $email = null) : int|bool
  {
    if(isset($secret,$email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.company_id
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND 
                {$this->tblName}.secret = '{$secret}'
                ";
  
      return $this->connection()->field($sql);
    }

    return false;
  }

  public function isValidSecret(string $secret = null,string $email = null) : bool
  {
    if(isset($secret,$email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.email
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND 
                {$this->tblName}.secret = '{$secret}'
              AND  
                {$this->tblName}.update_password = '1'
                ";
  
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function isValidSecretForValidateEmail(string $secret = null,string $email = null) : bool
  {
    if(isset($secret,$email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.email
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND 
                {$this->tblName}.secret = '{$secret}'
                ";
  
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function getCompanyIdByEmail(string $email = null) : bool|string
  {
    if(isset($email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.company_id
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
                ";

      return $this->connection()->field($sql);
    }

    return false;
  }
 
  public function isVerifiedMail(string $email = null) : bool
  {
    if(isset($email) === true)
    {
      $sql = "SELECT
                {$this->tblName}.verified_mail
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.email = '{$email}'
              AND 
                {$this->tblName}.verified_mail = '1'
                ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function hasUserAti() 
  {
    if ($this->logged || $this->getId()) 
    {
      return (new UserAti)->hasUserAti($this->company_id);
    }
  }

  public function getAtiAccount() 
  {
    if ($this->logged || $this->getId()) 
    {
      return (new UserAti)->getUser($this->company_id);
    }
  }

  public function hasUserDummie() 
  {
    if ($this->logged || $this->getId()) 
    {
      return (new UserDummie)->hasUserDummie($this->company_id);
    }
  }

  public function getDummieAccount() 
  {
    if ($this->logged || $this->getId()) 
    {
      return (new UserDummie)->getUser($this->company_id);
    }
  }

  public function loginWithId(int $company_id = null) 
  {
    if($this->loadWhere('company_id = ?',$company_id))
    {
      return $this->login($this->email,$this->password);
    }
  }

  public static function signOnDummieTrading(array $data = null)
  {
    if(isset($data))
    {
      $UserLogin = new self(false,false);
      $UserLogin->loginWithId($data['user_login_id']);
      
      $Curl = new Curl;
      $Curl->get(self::DUMMIE_TRADING_URL,[
        'email' => $UserLogin->email,
        'password' => $UserLogin->password,
        'phone' => $UserLogin->_data['user_contact']['phone'],
        'country_id' => $UserLogin->_data['user_address']['country_id'],
        'names' => $UserLogin->_data['user_data']['names'],
        'encrpyt' => false
      ]);
      
      if($response = $Curl->getResponse(true))
      {
        if($response['s'] == 1 || $response['r'] == 'MAIL_ALREADY_EXISTS')
        {
          UserDummie::add([
            'dummie_user_login_id' => $response['user_login_id'],
            'user_login_id' => $UserLogin->company_id
          ]);

          $Curl = new Curl;
          
          $Curl->get(self::DUMMIE_TRADING_BUY_URL,[
            'user' => Util::USERNAME,
            'password' => Util::PASSWORD,
            'user_login_id' => (new UserDummie)->getDummieUserLoginId($data['user_login_id']),
            'checkout_data' => [
              'site_name' => Connection::proyect_name,
              'buy_per_user_id' => $data['buy_per_user_id']
            ],
            'country_id' => $UserLogin->_data['user_address']['country_id'],
            'package_id' => Package::transporter($data['package_id'])
          ]);

          if($response = $Curl->getResponse(true))
          {
            return $response['s'] == 1;
          }
        } 
      }
    }

    return false;
  }

  public function generateDummieLoginToken() 
  {
    if ($this->logged || $this->getId()) 
    {
      $Token = new Token;

      if($token = $Token->getToken([
        'email' => $this->email,
        'password' => $this->password
      ]))
      {
        return self::DUMMIE_TRADING_LOGIN_URL."?".http_build_query($token);
      }
    }
  }

  public function hasProductPermission(string $code = null)
  {
    if (!$this->getId() || !isset($code)) {
      return false;
    }

    return $this->_hasProductPermission($code,$this->company_id);
  }
  
  public function _hasProductPermission(string $code = null,int $user_login_id = null)
  {
    if (!isset($user_login_id)) {
      return false;
    }
    
    $product_id = (new Product)->getIdByCode($code);

    if(!isset($this->temporal_permissions[$product_id]))
    {
      $hasPermission = ProductPermission::hasPermission([
        'product_id' => (new Product)->getIdByCode($code),
        'user_login_id' => $user_login_id
      ]);

      $this->temporal_permissions[$product_id] = $hasPermission;
    }
    
    return $this->temporal_permissions[$product_id];
  }
  
  public function getBinaryTree()
  {
    if (!$this->getId()) {
      return false;
    }

    return $this->_getBinaryTree($this->company_id);
  }
 
  
  public function getTeamPending()
  {
    if (!$this->getId()) {
      return false;
    }

    $users = (new UserReferral)->findAll("referral_id = ? AND status = ?",[$this->company_id,0]);

    if(!$users)
    {
      return false;
    }

    $UserData = new UserData;

    return array_map(function($user) use($UserData){
      $user['names'] = $UserData->getNames($user['user_login_id']);
      return $user;
    },$users);
  }
 
  public function insertReferralOnSide(array $data = null)
  {
    if(in_array($data['side'],[UserReferral::LEFT,UserReferral::RIGHT])) 
    {
      $node = $this->getNode($this->company_id,$data['side']);

      if(!$node)
      {
        return UserReferral::appendReferral([
          'side' => $data['side'],
          'user_login_id' => $data['user_login_id'],
          'referral_id' => $this->company_id,
        ]);
      }
      
      $network = $this->getNetworkChild($node['user_login_id']);
      
      if(!$network)
      {
        return UserReferral::appendReferral([
          'side' => UserReferral::LEFT,
          'user_login_id' => $data['user_login_id'],
          'referral_id' => $node['user_login_id'],
        ]);
      } else if(isset($network[0]) && sizeof($network[0]) == 1) {
        return UserReferral::appendReferral([
          'side' => UserReferral::RIGHT,
          'user_login_id' => $data['user_login_id'],
          'referral_id' => $node['user_login_id'],
        ]);
      }
      
      foreach($network as $level)
      {
        foreach($level as $user_login_id)
        {
          $team = $this->_getBinaryTree($user_login_id);

          if(!$team)
          {
            UserReferral::appendReferral([
              'side' => UserReferral::LEFT,
              'user_login_id' => $data['user_login_id'],
              'referral_id' => $user_login_id,
            ]);

          } else if(sizeof($team) == 1) {
            UserReferral::appendReferral([
              'side' => UserReferral::RIGHT,
              'user_login_id' => $data['user_login_id'],
              'referral_id' => $user_login_id,
            ]);
          }
        }
      }
    }
  }

  public function _getBinaryTree(int $referral_id = null)
  {
    if (!isset($referral_id)) {
      return false;
    }

    return $this->connection()->rows("SELECT 
        user_referral.user_login_id,
        user_account.image,
        user_data.names
      FROM
        user_referral
      LEFT JOIN 
        user_data
      ON 
        user_data.user_login_id = user_referral.user_login_id
      LEFT JOIN 
        user_account
      ON 
        user_account.user_login_id = user_referral.user_login_id
      WHERE
        user_referral.referral_id = '{$referral_id}'
      AND 
        user_referral.status = '1'
      ORDER BY 
        user_referral.side
      ASC 
    ");
  }
  
  public function getNode(int $referral_id = null,int $side = null)
  {
    if (!isset($referral_id)) {
      return false;
    }

    return $this->connection()->row("SELECT 
        user_referral.user_login_id,
        user_referral.side,
        user_account.image,
        user_data.names
      FROM
        user_referral
      LEFT JOIN 
        user_data
      ON 
        user_data.user_login_id = user_referral.user_login_id
      LEFT JOIN 
        user_account
      ON 
        user_account.user_login_id = user_referral.user_login_id
      WHERE
        user_referral.referral_id = '{$referral_id}'
      AND 
        user_referral.side = '{$side}'
      AND 
        user_referral.status = '1'
      ORDER BY 
        user_referral.side
      ASC 
    ");
  }

  public function getCurrentMembership()
  {
    if(!$this->getId())
    {
      return false;
    }

    return (new MembershipPerUser)->getCurrentMembership($this->company_id);
  }

  public function getLastMembers()
  {
    if(!$this->getId())
    {
      return false;
    }

    $members = (new UserReferral)->getLastMembers($this->company_id);

    if(!$members) 
    {
      return false;
    }

    return array_map(function($member){
      $member['active'] = $this->_hasProductPermission(Product::PAY_BUSINESS,$member['user_login_id']);
      return $member;
    },$members);
  }
  
  public function getIncome()
  {
    if(!$this->getId())
    {
      return false;
    }

    $members = (new UserReferral)->getLastMembers($this->company_id);

    if(!$members) 
    {
      return false;
    }

    return array_map(function($member){
      $member['active'] = $this->_hasProductPermission(Product::PAY_BUSINESS,$member['user_login_id']);
      return $member;
    },$members);
  }
  
  public function getTopCountries()
  {
    if(!$this->getId())
    {
      return false;
    }

    $members = (new UserReferral)->getLastMembersCountries($this->company_id);

    if(!$members) 
    {
      return false;
    }

    $members = array_map(function($member){
      $member['active'] = $this->_hasProductPermission(Product::PAY_BUSINESS,$member['user_login_id']);
      return $member;
    },$members);

    $_members = [];

    foreach($members as $member)
    {
      if(!isset($_members[$member['country_id']]['country_id']))
      {
        $_members[$member['country_id']]['country_id'] = $member['country_id'];
      }

      if(!isset($_members[$member['country_id']]['inactives']))
      {
        $_members[$member['country_id']]['inactives'] = 0;
      }

      if(!isset($_members[$member['country_id']]['actives']))
      {
        $_members[$member['country_id']]['actives'] = 0;
      }

      if($member['active'])
      {
        $_members[$member['country_id']]['actives'] += 1;
      } else {
        $_members[$member['country_id']]['inactives'] += 1;
      }
      
      $_members[$member['country_id']]['total'] =  $_members[$member['country_id']]['inactives'] +  $_members[$member['country_id']]['actives'];
    }
    
    $Country = new Country;

    return array_map(function($member) use($Country) {
      $member['country'] = $Country->getCountryNameAndInternet($member['country_id']);
      return $member;
    },array_values($_members));
  }
}