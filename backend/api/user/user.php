<?php
// get a user data
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Users;
use Masterticket\Events;
use Masterticket\Invoices;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['idUser'])){
        $idUser = $_GET['idUser'];
        $users = new Users();
        $userData = $users->getUserId($idUser);

        if($userData){
            $userRole = $userData['user_role'];
            $userBirth = $userData['user_birth'];
            $userUsername = $userData['user_username'];
            $userEmail = $userData['user_mail'];

            $jsonData = [
                'IdUser' => $idUser,
                'UserUsername' => $userUsername,
                'UserMail' => $userEmail,
                'UserBirth' => $userBirth,
                'UserRole' => $userRole,
                'Events' => []
            ];

            // get all events for this user
            $events = new Events();
            $invoices = new Invoices();
            $userEventDatas = $invoices->getAllEventsForUser($idUser);
            foreach($userEventDatas as $userEventData){
                $idEvent = $userEventData['invoice_event_id'];
                $eventData = $events->getEventById($idEvent);

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
            http_response_code(401);
            $jsonData =  [
                'code' => 401,
                'status' => 'error',
                'message' => 'No data for this user id'
            ];
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
