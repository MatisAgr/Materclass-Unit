<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Invoices {
    protected $db;

    private function validateInvoiceId($invoice_id){
        if(empty($invoice_id) || !preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $invoice_id)){
            throw new \Exception('Invalid invoice ID');
        }
    }

    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function createInvoice($invoice_user_id, $invoice_event_id, $invoice_date){
        $date = \DateTime::createFromFormat('Y-m-d', $invoice_date);
        if ($date && $date->format('Y-m-d') !== $invoice_date) {
            throw new \Exception('Invalid date');
        }
        $sql = "INSERT INTO `invoices`(`invoice_user_id`, `invoice_event_id`, `invoice_date`) 
        VALUES (:col1, :col2, :col3)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $invoice_user_id, PDO::PARAM_STR);
        $query->bindValue(':col2', $invoice_event_id, PDO::PARAM_STR);
        $query->bindValue(':col3', $invoice_date, PDO::PARAM_STR);
        $query->execute();
    }

    public function getInvoiceById($invoice_id){
        $this->validateInvoiceId($invoice_id);
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

    public function deleteInvoice($invoice_id){
        $this->validateInvoiceId($invoice_id);
        $sql = "DELETE FROM `invoices` WHERE `invoice_id` = :col1";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $invoice_id, PDO::PARAM_STR);
        $query->execute();
    } 

    public function getAllEventsForUser($user_id){
        $sql = "SELECT * FROM `invoices` WHERE `invoice_user_id` = $user_id";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $result = $query->fetchAll();
    }
}