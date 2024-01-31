<?php

namespace Site;

use HCStudio\Orm;

class UserFeedback extends Orm {
  protected $tblName  = 'user_feedback';

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null)
  {
    if($data == null)
    {
      return false;
    }

    $UserFeedback = new self;
    $UserFeedback->message = $data['message'];
    $UserFeedback->user_login_id = $data['user_login_id'];
    $UserFeedback->create_date = time();
    $UserFeedback->status = 2;

    return $UserFeedback->save();
  }
}