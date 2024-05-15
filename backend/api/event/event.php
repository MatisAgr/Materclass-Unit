<?php
// get one event
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Events;
use Masterticket\Category;


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['EventDescription'])){
        $jsonData = [];
        $eventDescription = $_GET['EventDescription'];

        $events = new Events();
        $eventData = $events->getEventByDescription($eventDescription);

        if($eventData){
            $idEvent = $eventData['event_id'];
            $eventDescription = $eventData['event_desc'];
            $eventSlots = $eventData['event_slots'];
            $eventAgeneed = $eventData['event_ageneed'];
            $eventCategoryId = $eventData['event_category_id'];
            $eventEnd = $eventData['event_end'];
            $eventStart = $eventData['event_start'];

            $category = new Category();
            $eventCategory = $category->getCategoryById($eventCategoryId);
            $eventCategoryName = ($eventCategory)? $eventCategory['category_name'] : '';

            $jsonData = [
                'code' => 200,
                'status' => 'success',
                'IdEvent' => $idEvent,
                'EventDescription' => $eventDescription,
                'EventSlots' => $eventSlots,
                'EventAgeneed' => $eventAgeneed,
                'EventCategoryId' => $eventCategoryId,
                'EventCategoryName' => $eventCategoryName,
                'EventStart' => $eventStart,
                'EventEnd' => $eventEnd
            ];
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