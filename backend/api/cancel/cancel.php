<?php
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Cancel;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $cancel = new Cancel();
    $cancelData = $cancel->getAllCancels();
    
    if($cancelData){
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'Cancels' => $cancelData
        ];
    }else {
        http_response_code(404);
        $jsonData = [
            'code' => 404,
            'status' => 'error',
            'message' => 'No cancelled events found'
        ];
    }
} else {
    http_response_code(405);
    $jsonData = [
        'code' => 405,
        'status' => 'error',
        'message' => 'Method ' . $_SERVER['REQUEST_METHOD'] . ' not allowed.'
    ];
}

echo json_encode($jsonData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);