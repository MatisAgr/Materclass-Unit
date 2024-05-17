<?php

use PHPUnit\Framework\TestCase;
use Masterticket\Database;
use Masterticket\Cancel;

class CancelTest extends TestCase {
    private $db;
    private $cancel;

    public function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->cancel = new Cancel();
    }

    public function testCancelEvent() {
        $this->cancel->cancelEvent(2, 'Test Event Canceled');

        $stmt = $this->db->query("SELECT * FROM cancel WHERE cancel_event_id = 2")->fetch();
        $this->assertEquals(2, $stmt['cancel_event_id']);
    }

    public function testCancelEventWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event ID');

        $this->cancel->cancelEvent(NULL, 'Test Event Canceled');
    }

    public function testCancelEventWithInvalidReason() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Cancel reason is required');

        $this->cancel->cancelEvent(2, NULL);
    }

    public function testGetAllCancels() {
        $stmt = $this->cancel->getAllCancels();
        $this->assertIsArray($stmt);
    }

    public function tearDown(): void {
        $this->db = null;
        $this->cancel = null;
    }
}