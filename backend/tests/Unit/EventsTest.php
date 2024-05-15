<?php
use Masterticket\Events;
use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class EventsTest extends TestCase {
    private $db;
    private $events;

    public function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->events = new Events();
    }

    public function testCreateEvent() {
        $this->events->createEvent('Test Event', '2021-12-12 12:00:00', '2021-12-12 12:00:00', 100, 18, 1);

        $stmt = $this->events->getEventByDescription('Test Event');
        $this->assertEquals('Test Event', $stmt['event_desc']);
    }

    public function testGetEventByDescription() {
        $stmt = $this->events->getEventByDescription('Test Event');
        $this->assertEquals('Test Event', $stmt['event_desc']);
    }

    public function testGetAllEvents() {
        $stmt = $this->events->getAllEvents();
        $this->assertIsArray($stmt);
    }

    public function testUpdateEvent() {
        $this->events->updateEvent(2, 'Test Event', '2021-12-12 12:00:00', '2021-12-12 12:00:00', 100, 18, 1);

        $stmt = $this->events->getEventByDescription('Test Event');
        $this->assertEquals('Test Event', $stmt['event_desc']);
    }
}