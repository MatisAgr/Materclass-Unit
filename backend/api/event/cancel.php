<?php

header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['EventId']) && isset($_POST['CancelReason'])){
        $jsonData = [];
        $eventId = $_POST['EventId'];
        $cancelReason = $_POST['CancelReason'];

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

        $events->cancelEvent($eventId, $cancelReason);

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
