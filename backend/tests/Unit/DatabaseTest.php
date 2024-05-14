<?php
require_once 'models/Database.php';

use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class DatabaseTest extends TestCase {
    public function testConnect() {
        $dbModel = new Database();

        $pdo = $dbModel->connect();
        $this->assertInstanceOf(PDO::class, $pdo);
        $stmt = $pdo->query("SELECT 1");
        $this->assertTrue($stmt !== false);
    }
}