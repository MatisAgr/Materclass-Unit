<?php
session_start();
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Users;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['userUsername'], $_POST['userMail'], $_POST['userPassword'])){
        $userUsername = $_POST['userUsername'];
        $userMail = $_POST['userMail'];
        $userPassword = sha1($_POST['userPassword']);
        $userBirth = ($_POST['userBirth'])? $_POST['userBirth'] : '';
        $userRole = 'user';
        
        $jsonData = [];
        $users = new Users();

        // Vérification si l'e-mail de l'utilisateur existe dans la base de données
        $userData = $users->getUserByEmail($userMail);
        if(!$userData){
            $idUser = $users->createUser($userUsername, $userMail, $userPassword, $userBirth, $userRole);

            // Données de session
            $_SESSION['userId'] = $idUser;
            $_SESSION['userMail'] = $userMail;
            $_SESSION['userRole'] = $userRole;

            $jsonData = [
                'code' => 200,
                'status' => 'success',
                'UserUsername' => $userUsername,
                'UserMail' => $userMail,
                'UserBirth' => $userBirth,
                'UserRole' => $userRole,
                'Session' => [
                    'Id' => $_SESSION['userId'],
                    'Email' => $_SESSION['userMail'],
                    'Role' => $_SESSION['userRole']
                ]
            ];
        }else {
            http_response_code(401);
            $jsonData =  [
                'code' => 401,
                'status' => 'error',
                'message' => 'This email exists in the database'
            ];
        }
        
    }else {
        http_response_code(400);
        $jsonData = [
            'code' => 400,
            'status' => 'error',
            'message' => 'One or some arguments are missing.'
        ];
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
