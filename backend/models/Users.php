<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Users {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createEvent($user_username, $user_mail, $user_passwd, $user_birth, $user_role){
        $sql = "INSERT INTO `users`(`user_username`, `user_mail`, `user_passwd`, `user_birth`, `user_role`) 
        VALUES (:col1, :col2, :col3, :col4, :col5)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_username, PDO::PARAM_STR);
        $query->bindValue(':col2', $user_mail, PDO::PARAM_STR);
        $query->bindValue(':col3', $user_passwd, PDO::PARAM_STR);
        $query->bindValue(':col4', $user_birth, PDO::PARAM_STR);
        $query->bindValue(':col5', $user_role, PDO::PARAM_STR);
        $query->execute();
    }

    public function getUserId($user_id){
        $sql = "SELECT * FROM `user` WHERE `user_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_id, PDO::PARAM_INT);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getAllUsers(){
        $sql = "SELECT * FROM `users`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }

    public function deleteUser($user_id){
        $sql = "DELETE FROM `users` WHERE `user_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_id, PDO::PARAM_INT);
        $query->execute();
    }
}
