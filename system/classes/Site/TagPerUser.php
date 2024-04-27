<?php

namespace Site;

use HCStudio\Orm;

use Constants;

class TagPerUser extends Orm {
    protected $tblName  = 'tag_per_user';
    
    public function __construct() {
        parent::__construct();
    }

    public static function deleteUserTag(int $tag_per_user_id = null)
    {
        if(!$tag_per_user_id)
        {
            return false;
        }

        $TagPerUser = new self;
        
        if(!$TagPerUser->loadWhere("tag_per_user_id = ?",$tag_per_user_id))
        {
            return false;
        }

        $TagPerUser->status = Constants::DELETE;
        
        return $TagPerUser->save();
    }

    public static function addTagPerUser(array $data = null)
    {
        if(!$data)
        {
            return false;
        }

        $TagPerUser = new self;
        
        $TagPerUser->loadWhere("user_login_id = ? AND catalog_tag_id = ?", [$data['user_login_id'], $data['catalog_tag_id']]);

        $TagPerUser->user_login_id = $data['user_login_id'];
        $TagPerUser->catalog_tag_id = $data['catalog_tag_id'];
        $TagPerUser->create_date = time();
        $TagPerUser->status = Constants::AVIABLE;
        
        return $TagPerUser->save();
    }

    public static function getCatalogTags(array $users = null)
    {
        $TagPerPerUser = new self;

        return array_map(function($user) use($TagPerPerUser){
            $user['tags'] = $TagPerPerUser->getAll($user['user_login_id']);

            return $user;
        }, $users);
    }

    public function getAll(int $user_login_id = null)
    {
        if(!$user_login_id)
        {
            return false;
        }

        // d("
        return $this->connection()->rows("
            SELECT
                {$this->tblName}.{$this->tblName}_id,
                catalog_tag.tag,
                catalog_tag.color
            FROM 
                {$this->tblName}
            LEFT JOIN
                catalog_tag
            ON 
                catalog_tag.catalog_tag_id = {$this->tblName}.catalog_tag_id
            WHERE  
                {$this->tblName}.user_login_id = '{$user_login_id}'
            AND 
                {$this->tblName}.status = '1'
        ");
    }
}