<?php
// get all events
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Users;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = new Users();
    $userDatas = $users->getAllUsers();

    if($userDatas){
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'TotalUsers' => count($userDatas),
        ];

        foreach($userDatas as $userData){
            $userRole = $userData['user_role'];
            $userBirth = $userData['user_birth'];
            $userUsername = $userData['user_username'];
            $idUser = $userData['user_id'];
            $userEmail = $userData['user_mail'];

            $jsonData['Users'][] = [
                'IdUser' => $idUser,
                'UserUsername' => $userUsername,
                'UserMail' => $userEmail,
                'UserBirth' => $userBirth,
                'UserRole' => $userRole,
            ];
        }
    }else {
        $jsonData['Users'][] = null;
    }
}else {
    http_response_code(405);
    $jsonData = [
        'code' => 405,
        'status' => 'error',
        'message' => 'Method ' . $_SERVER['REQUEST_METHOD'] . ' not allowed.'
    ];
}

echo json_encode($jsonData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
