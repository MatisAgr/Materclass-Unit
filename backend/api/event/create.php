<?php
// create event
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['EventDescription'], $_POST['EventSlots'], $_POST['EventAgeneed'])){
        $jsonData = [];

        $eventDescription = $_POST['EventDescription'];
        $eventStart = $_POST['EventStart'];
        $eventEnd = $_POST['EventEnd'];
        $eventSlots = $_POST['EventSlots'];
        $eventAgeneed = $_POST['EventAgeneed'];
        $eventCategoryId = $_POST['CategoryId'];

        $events = new Events();

        $events->createEvent($eventDescription, $eventStart, $eventEnd, $eventSlots, $eventAgeneed, $eventCategoryId);
        
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'EventDescription' => $eventDescription,
            'EventSlots' => $eventSlots,
            'EventAgeneed' => $eventAgeneed,
            'EventCategoryId' => $eventCategoryId,
            'EventStart' => $eventStart,
            'EventEnd' => $eventEnd
        ];

    }else {
        http_response_code(405);
        $jsonData = [
            'code' => 405,
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