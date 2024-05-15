<?php

use PHPUnit\Framework\TestCase;
use Masterticket\Database;
use Masterticket\Users;

class UsersTest extends TestCase
{
    private $db;
    private $users;

    public function setUp(): void
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->users = new Users();
    }

    public function testCreateUser()
    {
        $this->users->createUser('Test User', 'testuser@test.com', 'password', '2000-01-01', 'user');

        $stmt = $this->users->getUserByUsername('Test User');

        $this->assertEquals('Test User', $stmt['user_username']);
    }
}