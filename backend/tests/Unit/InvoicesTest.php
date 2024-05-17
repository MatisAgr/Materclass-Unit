<?php

use PHPUnit\Framework\TestCase;
use Masterticket\Database;
use Masterticket\Invoices;

class InvoicesTest extends TestCase {
    private $db;
    private $invoices;
    private $invoice_user_id = '1';
    private $invoice_event_id = '1';
    private $invoice_date = '2021-12-12 12:00:00';
    private $invoice_fake_date = '2021-12-32 12:00:00';

    private function isValidUuid($uuid) {
        if (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $uuid)) {
            return true;
        }
        return false;
    }

    public function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->invoices = new Invoices();
    }

    public function testCreateInvoice() {
        $this->invoices->createInvoice($this->invoice_user_id, $this->invoice_event_id, $this->invoice_date);
        $stmt = $this->db->query("SELECT invoice_id FROM invoices WHERE invoice_id = (SELECT MAX(invoice_id) FROM invoices)")->fetch();
        $this->assertTrue($this->isValidUuid($stmt['invoice_id']));
    }

    public function testCreateInvoiceWithInvalidDate() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid date');

        $this->invoices->createInvoice($this->invoice_user_id, $this->invoice_event_id, $this->invoice_fake_date);
    }

    public function testGetInvoiceById() {
        $last_invoice_id = $this->db->query("SELECT MAX(invoice_id) FROM invoices")->fetchColumn();
        $stmt = $this->invoices->getInvoiceById($last_invoice_id);
        $this->assertTrue($this->isValidUuid($stmt['invoice_id']));
    }

    public function testGetInvoiceByIdWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid invoice ID');

        $this->invoices->getInvoiceById('0');
        $this->invoices->getInvoiceById('invalid_id');
    }

    public function testGetAllInvoices() {
        $stmt = $this->invoices->getAllInvoices();
        $this->assertIsArray($stmt);
    }

    public function testGetAllEventsForUser() {
        $stmt = $this->invoices->getAllEventsForUser(1);
        $this->assertIsArray($stmt);
    }

    public function testDeleteInvoice() {
        $last_invoice_id = $this->db->query("SELECT MAX(invoice_id) FROM invoices")->fetchColumn();
        $this->invoices->deleteInvoice($last_invoice_id);
        $stmt = $this->invoices->getInvoiceById($last_invoice_id);
        $this->assertEmpty($stmt);
    }

    public function testDeleteInvoiceWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid invoice ID');

        $this->invoices->deleteInvoice('0');
    }

    protected function tearDown(): void {
        $this->db = null;
        $this->invoices = null;
    }
}