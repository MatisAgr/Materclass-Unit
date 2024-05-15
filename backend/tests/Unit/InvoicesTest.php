<?php

use PHPUnit\Framework\TestCase;
use Masterticket\Database;
use Masterticket\Invoices;

class InvoicesTest extends TestCase {
    private $db;
    private $invoices;

    public function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->invoices = new Invoices();
    }

    public function testCreateInvoice() {
        $this->invoices->createInvoice('1', '1', '1', '2021-12-12 12:00:00');

        $stmt = $this->invoices->getInvoiceById('1');
        $this->assertEquals('1', $stmt['invoice_id']);
    }

    public function testGetInvoiceById() {
        $stmt = $this->invoices->getInvoiceById('1');
        $this->assertEquals('1', $stmt['invoice_id']);
    }

    public function testGetAllInvoices() {
        $stmt = $this->invoices->getAllInvoices();
        $this->assertIsArray($stmt);
    }

    protected function tearDown(): void {
        $this->db = null;
        $this->invoices = null;
    }
}