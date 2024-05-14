<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Events {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createEvent($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id){
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
        $sql = "SELECT * FROM `events` WHERE `event_desc` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_description, PDO::PARAM_INT);
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
        $sql = "UPDATE `events` SET 
        event_desc = :col1,
        event_start = :col2,
        event_end = :col3,
        event_slots = :col4,
        event_ageneed = :col5,
        event_category_id = $event_category_id WHERE `event_id` = :col6";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_desc, PDO::PARAM_STR);
        $query->bindValue(':col2', $event_start, PDO::PARAM_STR);
        $query->bindValue(':col3', $event_end, PDO::PARAM_STR);
        $query->bindValue(':col4', $event_slots, PDO::PARAM_STR);
        $query->bindValue(':col5', $event_ageneed, PDO::PARAM_STR);
        $query->bindValue(':col6', $event_id, PDO::PARAM_STR);
        $query->execute();
    }

    public function deleteEvent($event_id){
        $sql = "DELETE FROM `events` WHERE `event_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_id, PDO::PARAM_INT);
        $query->execute();
    }
}
