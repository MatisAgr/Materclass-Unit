<?php
// get all cancelations
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $events = new Events();
    $cancelationDatas = $events->getAllCancelations();

    if($cancelationDatas){
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'Cancelations' => $cancelationDatas
        ];
    }else {
        $jsonData = [
            'code' => 404,
            'status' => 'error',
            'message' => 'No cancelations found.'
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
?>
