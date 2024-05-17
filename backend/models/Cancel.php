<?php
namespace Masterticket;

use Masterticket\Database;
use PDO;

class Cancel {
    protected $db;
    public function __construct()
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
    }

    public function cancelEvent($event_id, $cancel_reason) {
        $sql = "INSERT INTO `cancel` (`cancel_event_id`, `cancel_reason`) VALUES (:col1, :col2)";
        $query = $this->db->prepare($sql);
        $query->bindValue(':col1', $event_id, PDO::PARAM_INT);
        $query->bindValue(':col2', $cancel_reason, PDO::PARAM_STR);
        $query->execute();
    }

    public function getAllCancels() {
        $sql = "SELECT * FROM `cancel`";
        $query = $this->db->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}