<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;
use Exception;
use DateTime;

class Users {
    protected $db;

    private function validateEmail($email){
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email address');
        }
    }

    private function validateUserId($user_id){
        if ($user_id <= 0) {
            throw new Exception('Invalid user ID');
        }
    }

    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createUser($user_username, $user_mail, $user_passwd, $user_birth, $user_role){
        if (empty($user_username) || empty($user_mail) || empty($user_passwd) || empty($user_birth) || empty($user_role)) {
            throw new Exception('All fields are required');
        }
        $date = DateTime::createFromFormat('Y-m-d', $user_birth);
        if ($date && $date->format('Y-m-d') !== $user_birth) {
            throw new \Exception('Invalid birth date');
        }

        $valid_roles = ['user', 'admin'];
        if (!in_array($user_role, $valid_roles)) {
            throw new \Exception('Invalid role');
        }

        $existingUser = $this->getUserByEmail($user_mail);
        if ($existingUser) {
            throw new \Exception('Email already exists');
        }

        $this->validateEmail($user_mail);
        $hashed_password = password_hash($user_passwd, PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users`(`user_username`, `user_mail`, `user_passwd`, `user_birth`, `user_role`) 
        VALUES (:col1, :col2, :col3, :col4, :col5)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_username, PDO::PARAM_STR);
        $query->bindValue(':col2', $user_mail, PDO::PARAM_STR);
        $query->bindValue(':col3', $hashed_password, PDO::PARAM_STR);
        $query->bindValue(':col4', $user_birth, PDO::PARAM_STR);
        $query->bindValue(':col5', $user_role, PDO::PARAM_STR);
        $query->execute();

        return $this->db->lastInsertId();
    }

    public function getUserId($user_id){
        $this->validateUserId($user_id);
        $sql = "SELECT * FROM `users` WHERE `user_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_id, PDO::PARAM_INT);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getUserByEmail($user_email){
        $this->validateEmail($user_email);
        $sql = "SELECT * FROM `users` WHERE `user_mail` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_email, PDO::PARAM_STR);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getUserByEmailAndPassword($user_email, $user_passwd){
        if (empty($user_email) || empty($user_passwd)) {
            throw new Exception('All fields are required');
        }
        $this->validateEmail($user_email);
        $sql = "SELECT * FROM `users` WHERE `user_mail` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_email, PDO::PARAM_STR);
        $query->execute();
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($user_passwd, $user['user_passwd'])) {
            return $user;
        }
        return false;
    }

    public function getAllUsers(){
        $sql = "SELECT * FROM `users`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }

    public function deleteUser($user_id){
        $this->validateUserId($user_id);
        $sql = "DELETE FROM `users` WHERE `user_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $user_id, PDO::PARAM_INT);
        $query->execute();
    }


    // reservation for event methods
    public function createReservation(){

    }

    public function getAllEventsForUser($user_id){
        $this->validateUserId($user_id);
        $sql = "SELECT * FROM `invoices` WHERE `user_id` = $user_id";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}
