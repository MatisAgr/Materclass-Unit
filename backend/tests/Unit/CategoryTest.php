<?php
use Masterticket\Category;
use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class CategoryTest extends TestCase {
    private $db;
    private $category;

    protected function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->category = new Category();
    }

    public function testCreateCategory() {
        $this->category->createCategory('Test Category');

        $stmt = $this->category->getCategoryByName('Test Category');

        $this->assertEquals('Test Category', $stmt['category_name']);
    }

    public function testGetCategoryById() {
        $stmt = $this->category->getCategoryById(1);

        $this->assertEquals('Test', $stmt['category_name']);
    }

    public function testGetCategoryByName() {
        $stmt = $this->category->getCategoryByName('Test');

        $this->assertEquals(1, $stmt['category_id']);
    }

    public function testGetAllCategory() {
        $stmt = $this->category->getAllCategory();

        $this->assertIsArray($stmt);
    }

    public function testUpdateCategory() {
        $this->category->updateCategory(1, 'Test');

        $stmt = $this->category->getCategoryById(1);

        $this->assertEquals('Test', $stmt['category_name']);
    }
    
    protected function tearDown(): void {
        $this->db = null;
        $this->category = null;
    }
}