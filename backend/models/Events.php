<?php

class Events {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createEvent($event_desc, $event_start, $event_end, $event_slots, $event_ageneed, $event_category_id){
        $sql = "INSERT INTO `events`(`event_desc`, `event_start`, `event_end`, `event_slots`, `event_ageneed`, `event_category_id`) 
        VALUES (:col1, :col2, :col3, :col4, :col5, $event_category_id)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_desc, PDO::PARAM_STR);
        $query->bindValue(':col2', $event_start, PDO::PARAM_STR);
        $query->bindValue(':col3', $event_end, PDO::PARAM_STR);
        $query->bindValue(':col4', $event_slots, PDO::PARAM_STR);
        $query->bindValue(':col5', $event_ageneed, PDO::PARAM_STR);
        $query->execute();
        return $this->db->LastInsertId();
    }

    public function getEventById($event_id){
        $sql = "SELECT * FROM `event` WHERE `event_id` = $event_id";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getAllEvents(){
        $sql = "SELECT * FROM `event`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}
