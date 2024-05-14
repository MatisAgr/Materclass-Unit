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
        return $this->db->LastInsertId();
    }

    public function getEventById($event_id){
        $sql = "SELECT * FROM `events` WHERE `event_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_id, PDO::PARAM_STR);
        return $result = $query->fetch();
    }

    public function getAllEvents(){
        $sql = "SELECT * FROM `events`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}
