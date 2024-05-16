<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Invoices {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createInvoice($invoice_user_id, $invoice_event_id, $invoice_date){
        $sql = "INSERT INTO `invoices`(`invoice_user_id`, `invoice_event_id`, `invoice_date`) 
        VALUES (:col1, :col2, :col3)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $invoice_user_id, PDO::PARAM_STR);
        $query->bindValue(':col2', $invoice_event_id, PDO::PARAM_STR);
        $query->bindValue(':col3', $invoice_date, PDO::PARAM_STR);
        $query->execute();
    }

    public function getInvoiceById($invoice_id){
        $sql = "SELECT * FROM `invoices` WHERE `invoice_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $invoice_id, PDO::PARAM_STR);
        $query->execute();
        return $result = $query->fetch();
    }

    public function getAllInvoices(){
        $sql = "SELECT * FROM `invoices`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }

    public function getAllEventsForUser($user_id){
        $sql = "SELECT * FROM `invoices` WHERE `invoice_user_id` = $user_id";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}