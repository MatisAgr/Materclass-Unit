<?php
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $jsonData = [
        'code' => 200,
        'status' => 'success'
    ];

    $events = new Events();
    $eventDatas = $events->getAllEvents();

    if($eventDatas){
        foreach($eventDatas as $eventData){
            $idEvent = $eventData['event_id'];
            $eventDescription = $eventData['event_desc'];
            $eventSlots = $eventData['event_slots'];
            $eventAgeneed = $eventData['event_ageneed'];
            $eventCategoryId = $eventData['event_category_id'];
            $eventStart = $eventData['event_start'];
            $eventEnd = $eventData['event_end'];

            $jsonData['Events'][] = [
                'IdEvent' => $idEvent,
                'EventDescription' => $eventDescription,
                'EventSlots' => $eventSlots,
                'EventAgeneed' => $eventAgeneed,
                'EventCategoryId' => $eventCategoryId,
                'EventStart' => $eventStart,
                'EventEnd' => $eventEnd
            ];
        }
    }else {
        $jsonData['Events'][] = null;
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
