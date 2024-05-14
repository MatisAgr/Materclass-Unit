<?php
// create event
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['CategoryName'])){
        $jsonData = [];

        $categoryName = $_POST['CategoryName'];

        $events = new Events();

        $idEvent = $events->createCategory();
        
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'IdEvent' => $idEvent,
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