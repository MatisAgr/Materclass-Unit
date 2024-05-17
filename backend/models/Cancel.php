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
        if ($event_id <= 0 || empty($event_id)) {
            throw new \Exception('Invalid event ID');
        }
        if (empty($cancel_reason)) {
            throw new \Exception('Cancel reason is required');
        }
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