<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Category {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createEvent($category_name){
        $sql = "INSERT INTO `categories`(`category_name`) 
        VALUES (:col1)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_name, PDO::PARAM_STR);
        $query->execute();
    }

    public function getEventById($category_id){
        $sql = "SELECT * FROM `categories` WHERE `category_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_id, PDO::PARAM_STR);
        var_dump($query);
        die();
        return $result = $query->fetch();
    }

    public function getAllEvents(){
        $sql = "SELECT * FROM `events`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}
