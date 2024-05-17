<?php
use Masterticket\Category;
use Masterticket\Database;
use PHPUnit\Framework\TestCase;

class CategoryTest extends TestCase {
    private $db;
    private $category;
    private $category_name = 'Test Category';

    protected function setUp(): void {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->category = new Category();
    }

    public function testCreateCategory() {
        $this->category->createCategory($this->category_name);
        $stmt = $this->category->getCategoryByName($this->category_name);

        $this->assertEquals($this->category_name, $stmt['category_name']);
    }

    public function testCreateCategoryWithEmptyName() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->category->createCategory(NULL);
    }

    public function testGetCategoryById() {
        $last_category_id = $this->db->query("SELECT MAX(category_id) FROM categories")->fetchColumn();
        $stmt = $this->category->getCategoryById($last_category_id);

        $this->assertEquals($this->category_name, $stmt['category_name']);
    }

    public function testGetCategoryByIdWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid category id');

        $this->category->getCategoryById(NULL);
        $this->category->getCategoryById(0);
    }

    public function testGetCategoryByName() {
        $last_category_id = $this->db->query("SELECT MAX(category_id) FROM categories")->fetchColumn();
        $stmt = $this->category->getCategoryByName($this->category_name);

        $this->assertEquals($last_category_id, $stmt['category_id']);
    }

    public function testGetCategoryByNameWithInvalidName() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $this->category->getCategoryByName(NULL);
    }

    public function testGetAllCategory() {
        $stmt = $this->category->getAllCategory();

        $this->assertIsArray($stmt);
    }

    public function testUpdateCategory() {
        $last_category_id = $this->db->query("SELECT MAX(category_id) FROM categories")->fetchColumn();
        $this->category->updateCategory($last_category_id, 'Test');
        $stmt = $this->category->getCategoryById($last_category_id);

        $this->assertEquals('Test', $stmt['category_name']);
    }

    public function testUpdateCategoryWithEmptyName() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');

        $last_category_id = $this->db->query("SELECT MAX(category_id) FROM categories")->fetchColumn();
        $this->category->updateCategory($last_category_id, NULL);
    }

    public function testUpdateCategoryWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid category id');

        $this->category->updateCategory(NULL, 'Test');
    }

    public function testDeleteCategory() {
        $last_category_id = $this->db->query("SELECT MAX(category_id) FROM categories")->fetchColumn();
        $this->category->deleteCategory($last_category_id);

        $stmt = $this->category->getCategoryById($last_category_id);
        $this->assertEmpty($stmt);
    }

    public function testDeleteCategoryWithInvalidId() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid category id');

        $this->category->deleteCategory(NULL);
    }
    
    protected function tearDown(): void {
        $this->db = null;
        $this->category = null;
    }
}