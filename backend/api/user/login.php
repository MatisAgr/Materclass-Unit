<?php
session_start();
header('Content-type:application/json');

// Définition des en-têtes CORS ici pour éviter des duplications avec .htaccess
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// Répondre immédiatement à la requête OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); 
    exit;
}

require_once '../../vendor/autoload.php';

use Masterticket\Users;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['userMail'], $_POST['userPassword'])){
        $userMail = $_POST['userMail'];
        $userPassword = sha1($_POST['userPassword']);
        $jsonData = [];
        $users = new Users();

        // Vérification si l'e-mail de l'utilisateur existe dans la base de données
        $verifUserExist = $users->getUserByEmailAndPassword($userMail, $userPassword);
        if($verifUserExist){
            $userRole = $verifUserExist['user_role'];
            $userBirth = $verifUserExist['user_birth'];
            $userUsername = $verifUserExist['user_username'];
            $idUser = $verifUserExist['user_id'];
 
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
                'message' => 'Your email or password is not correct'
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
