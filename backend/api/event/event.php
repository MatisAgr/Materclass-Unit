<?php
// get one event by idEvent
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['IdEvent'])){
        $jsonData = [];
        $idEvent = $_GET['IdEvent'];

        $events = new Events();

        $eventData = $events->getEventById($idEvent);

        var_dump($eventData);
        die();
        if($eventData){

            var_dump($eventData);

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

        }       

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