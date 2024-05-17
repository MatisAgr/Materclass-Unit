<?php
use Masterticket\Events;
use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class EventsTest extends TestCase {
    private $db;
    private $events;
    private $event_desc = 'Test Event';
    private $event_start = '2021-12-12 12:00:00';
    private $event_fake_start = '2023-12-32 12:00:00';
    private $event_fake_end = '2023-12-32 12:00:00';
    private $event_end = '2023-12-12 12:00:00';
    private $event_slots = 100;
    private $event_min_age = 18;
    private $event_category_id = 1;

    public function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->events = new Events();
    }

    public function testCreateEvent() {
        $this->events->createEvent($this->event_desc, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);

        $stmt = $this->events->getEventByDescription($this->event_desc);
        $this->assertEquals($this->event_desc, $stmt['event_desc']);
    }

    public function testCreateEventWithInvalidDescription() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent(NULL, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testCreateEventWithInvalidStartDate() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent($this->event_desc, NULL, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testCreateEventWithInvalidEndDate() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent($this->event_desc, $this->event_start, NULL, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testCreateEventWithInvalidSlots() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent($this->event_desc, $this->event_start, $this->event_end, NULL, $this->event_min_age, $this->event_category_id);
    }

    public function testCreateEventWithInvalidMinAge() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent($this->event_desc, $this->event_start, $this->event_end, $this->event_slots, NULL, $this->event_category_id);
    }

    public function testCreateEventWithInvalidCategoryId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->events->createEvent($this->event_desc, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, NULL);
    }

    public function testCreateEventWithInvalidStartDateType() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event date');

        $this->events->createEvent($this->event_desc, $this->event_fake_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testCreateEventWithInvalidEndDateType() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event date');

        $this->events->createEvent($this->event_desc, $this->event_start, $this->event_fake_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testGetEventByDescription() {
        $stmt = $this->events->getEventByDescription($this->event_desc);
        $this->assertEquals($this->event_desc, $stmt['event_desc']);
    }

    public function testGetEventByDescriptionWithInvalidDescription() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Description is required');

        $stmt = $this->events->getEventByDescription(NULL);
        $this->assertEmpty($stmt);
    }

    public function testGetAllEvents() {
        $stmt = $this->events->getAllEvents();
        $this->assertIsArray($stmt);
    }

    public function testUpdateEvent() {
        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);

        $stmt = $this->events->getEventByDescription($this->event_desc);
        $this->assertEquals($this->event_desc, $stmt['event_desc']);
    }

    public function testUpdateEventWithInvalidDescription() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, NULL, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidStartDate() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, NULL, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidEndDate() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, NULL, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidSlots() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, $this->event_end, NULL, $this->event_min_age, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidMinAge() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, $this->event_end, $this->event_slots, NULL, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidCategoryId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, $this->event_end, $this->event_slots, $this->event_min_age, NULL);
    }

    public function testUpdateEventWithInvalidStartDateType() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event date');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_fake_start, $this->event_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testUpdateEventWithInvalidEndDateType() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event date');

        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->updateEvent($last_event_id, $this->event_desc, $this->event_start, $this->event_fake_end, $this->event_slots, $this->event_min_age, $this->event_category_id);
    }

    public function testGetEventById() {
        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $stmt = $this->events->getEventById($last_event_id);

        $this->assertEquals($this->event_desc, $stmt['event_desc']);
    }

    public function testGetEventByIdWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event ID');

        $this->events->getEventById(NULL);
    }

    public function testDeleteEvent() {
        $last_event_id = $this->db->query("SELECT MAX(event_id) FROM events")->fetchColumn();
        $this->events->deleteEvent($last_event_id);

        $stmt = $this->events->getEventById($last_event_id);
        $this->assertEmpty($stmt);
    }

    public function testDeleteEventWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid event ID');

        $this->events->deleteEvent(NULL);
    }

    public function tearDown(): void {
        $this->db = null;
        $this->events = null;
    }
}