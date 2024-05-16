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

    public function createCategory($category_name){
        $sql = "INSERT INTO `categories`(`category_name`) 
        VALUES (:col1)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_name, PDO::PARAM_STR);
        $query->execute();
    }

    public function getCategoryById($category_id){
        $sql = "SELECT * FROM `categories` WHERE `category_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_id, PDO::PARAM_STR);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getCategoryByName($category_name){
        $sql = "SELECT * FROM `categories` WHERE `category_name` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_name, PDO::PARAM_STR);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getAllCategory(){
        $sql = "SELECT * FROM `categories`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }

    public function updateCategory($category_id, $category_name){
        $sql = "UPDATE `categories` SET category_name = :col1 WHERE `category_id` = $category_id";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_name, PDO::PARAM_STR);
        $query->execute();
    }

    public function deleteCategory($category_id){
        $sql = "DELETE FROM `categories` WHERE `category_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $category_id, PDO::PARAM_INT);
        $query->execute();
    }
}
