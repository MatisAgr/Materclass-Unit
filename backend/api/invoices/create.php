<?php
// create reservation
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;
use Masterticket\Category;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonData = [];
    
    if(isset($_POST['idEvent'], $_POST['idUser'])){
        $idEvent = $_POST['idEvent'];
        $idUser = $_POST['idUser'];

        $events = new Events();
        $eventData = $events->getEventById($idEvent);

        if($eventData){
        
        }else {
            http_response_code(401);
            $jsonData =  [
                'code' => 401,
                'status' => 'error',
                'message' => 'No data for this event'
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