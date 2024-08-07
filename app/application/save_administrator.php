<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    // filtering data
    $data['administrator']['permissions'] = array_filter($data['administrator']['permissions'],function($permission) {
        return $permission['checked'] ?? false;
    });

    $data['administrator']['email'] = strtolower($data['administrator']['email']);

    if($UserSupport->isUniqueMail($data['administrator']['email']))
    {
        $UserSupportNew = new Site\UserSupport(false,false);
        $UserSupportNew->names = ucwords(strtolower($data['administrator']['names']));
        $UserSupportNew->email = $data['administrator']['email'];
        $UserSupportNew->affiliation_id = isset($data['administrator']['affiliation_id']) ? $data['administrator']['affiliation_id'] : 0;
        $UserSupportNew->catalog_support_type_id = isset($data['administrator']['catalog_support_type_id']) ? $data['administrator']['catalog_support_type_id'] : 1;
        $UserSupportNew->password = sha1($data['administrator']['password']);
        $UserSupportNew->create_date = time();
        
        if($UserSupportNew->save())
        {
            if(sizeof($data['administrator']['permissions']) > 0)
            {
                if(savePermissions($UserSupportNew->getId(),$data['administrator']['permissions']))
                {
                    $data['permissions_saved'] = true;
                }
            }

            $EmailManager = JFStudio\EmailManager::getInstance();
            $EmailManager->dispatch('welcome_admin',[
                'email' => $data['administrator']['email'],
                'names' => $data['administrator']['names'],
                'password' => $data['administrator']['password'],
            ]); 

            $data['s'] = 1;
            $data['r'] = 'SAVE_OK';   
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_SAVE';   
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'MAIL_ALREADY_EXISTS';    
    }
} else {
    $data['s'] = 0;
    $data['r'] = 'NOT_FIELD_SESSION_DATA';
}

function savePermissions(int $user_support_id = null,array $permissions = null) : bool
{
    foreach ($permissions as $permission)
    {
        $PermissionPerUserSupport = new Site\PermissionPerUserSupport;
        $PermissionPerUserSupport->loadWhere("user_support_id = ? AND catalog_permission_id = ?",[$user_support_id,$permission['catalog_permission_id']]);
        $PermissionPerUserSupport->user_support_id = $user_support_id;
        $PermissionPerUserSupport->catalog_permission_id = $permission['catalog_permission_id'];
        $PermissionPerUserSupport->create_date = time();
        $PermissionPerUserSupport->save();
    }

    return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 