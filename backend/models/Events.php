<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;


class Events {
    protected $db;

    private function validateFields($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id) {
        if (empty($event_desc) || empty($event_start) || empty($event_end) || empty($event_slots) || empty($event_ageneed) || empty($event_category_id)) {
            throw new \Exception('All fields are required');
        }
    }

    private function validateDate($event_start, $event_end) {
        $date_start = \DateTime::createFromFormat('Y-m-d H:i:s', $event_start);
        $date_end = \DateTime::createFromFormat('Y-m-d H:i:s', $event_end);
        if ($date_start && $date_start->format('Y-m-d H:i:s') !== $event_start || $date_end && $date_end->format('Y-m-d H:i:s') !== $event_end){
            throw new \Exception('Invalid event date');
        }
    }

    private function validateEventId($event_id) {
        if ($event_id <= 0) {
            throw new \Exception('Invalid event ID');
        }
    }

    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createEvent($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id){
        $this->validateFields($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id);
        $this->validateDate($event_start, $event_end);

        $sql = "INSERT INTO `events`(`event_desc`, `event_start`, `event_end`, `event_slots`, `event_ageneed`, `event_category_id`) 

        VALUES (:col1, :col2, :col3, :col4, :col5, :col6)";

        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_desc, PDO::PARAM_STR);
        $query->bindValue(':col2', $event_start, PDO::PARAM_STR);
        $query->bindValue(':col3', $event_end, PDO::PARAM_STR);
        $query->bindValue(':col4', $event_slots, PDO::PARAM_STR);
        $query->bindValue(':col5', $event_ageneed, PDO::PARAM_STR);
        $query->bindValue(':col6', $event_category_id, PDO::PARAM_INT);
        $query->execute();
    }


    public function getEventByDescription($event_description){
        if (empty($event_description)) {
            throw new \Exception('Description is required');
        }
        $sql = "SELECT * FROM `events` WHERE `event_desc` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_description, PDO::PARAM_STR);

        $query->execute();
        return $result = $query->fetch();
    }

    public function getEventById($eventId) {
        $this->validateEventId($eventId);
        $sql = "SELECT * FROM `events` WHERE `event_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $eventId, PDO::PARAM_INT);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getAllEvents(){
        $sql = "SELECT * FROM `events`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }

    public function updateEvent($event_id, $event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id){
        $this->validateFields($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id);
        $this->validateDate($event_start, $event_end);

        $sql = "UPDATE `events` SET 
        event_desc = :col1,
        event_start = :col2,
        event_end = :col3,
        event_slots = :col4,
        event_ageneed = :col5,
        event_category_id = $event_category_id WHERE `event_id` = $event_id";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_desc, PDO::PARAM_STR);
        $query->bindValue(':col2', $event_start, PDO::PARAM_STR);
        $query->bindValue(':col3', $event_end, PDO::PARAM_STR);
        $query->bindValue(':col4', $event_slots, PDO::PARAM_STR);
        $query->bindValue(':col5', $event_ageneed, PDO::PARAM_STR);
        $query->execute();
    }

    public function deleteEvent($event_id){
        $sql = "DELETE FROM `events` WHERE `event_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_id, PDO::PARAM_INT);
        $query->execute();
    } 
}
