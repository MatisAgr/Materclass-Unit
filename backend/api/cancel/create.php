<?php

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

use Masterticket\Cancel;
use Masterticket\Events;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['EventId']) && isset($_POST['CancelReason'])){
        $jsonData = [];
        $eventId = $_POST['EventId'];
        $cancelReason = $_POST['CancelReason'];

        $cancel = new Cancel();
        $events = new Events();

        if(!$events->getEventById($eventId)){
            http_response_code(404);
            $jsonData = [
                'code' => 404,
                'status' => 'error',
                'message' => 'Event not found.',
            ];
            echo json_encode($jsonData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
            exit;
        }

        $cancel->cancelEvent($eventId, $cancelReason);

        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'message' => 'Event canceled successfully.'
        ];
    } else {
        http_response_code(400);
        $jsonData = [
            'code' => 400,
            'status' => 'error',
            'message' => 'Missing event ID or cancel reason.',
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
