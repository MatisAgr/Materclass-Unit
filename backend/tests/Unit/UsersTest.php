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

        $stmt = $this->users->getUserId(1);

        $this->assertEquals('Test User', $stmt['user_username']);
    }
    
    public function testCreateUserWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->createUser('Test User', 'testuser', 'password', '2000-01-01', 'user');
    }

    public function testCreateUserWithInvalidPassword()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');
        
        $this->users->createUser('Test User', 'testuser@test.com', NULL, '2000-01-01', 'user');
    }

    public function testCreateUserWithInvalidBirthDate()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid birth date');
        
        $this->users->createUser('Test User', 'testuser@test.com', 'password', '2000-01-32', 'user');
    }

    public function testCreateUserWithInvalidRole()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid role');
        
        $this->users->createUser('Test User', 'testuser@test.com', 'password', '2000-01-01', 'invalid');
    }

    public function testCreateUserWithExistingEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Email already exists');
        
        $this->users->createUser('Test User', 'testuser@test.com', 'password', '2000-01-01', 'user');
    }

    public function testGetUserId()
    {
        $stmt = $this->users->getUserId(1);

        $this->assertEquals('Test User', $stmt['user_username']);
    }

    public function testGetUserIdWithInvalidId()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid user ID');
        
        $this->users->getUserId('0');
    }

    public function testGetUserByEmail()
    {
        $stmt = $this->users->getUserByEmail('testuser@test.com');

        $this->assertEquals('Test User', $stmt['user_username']);
    }

    public function testGetUserByEmailWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->getUserByEmail('testuser');
    }

    public function testGetUserByEmailAndPassword()
    {
        $email = 'testuser@test.com';

        $user = $this->users->getUserByEmailAndPassword($email, 'password');

        $this->assertEquals($email, $user['user_mail']);
        $this->assertEquals('Test User', $user['user_username']);
    }

    public function testGetUserByEmailAndPasswordWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->getUserByEmailAndPassword('testuser', 'password');
    }

    public function testGetUserByEmailAndPasswordWithInvalidPassword()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');
        
        $this->users->getUserByEmailAndPassword('testuser@test.com', NULL);
    }

    public function testGetAllUsers()
    {
        $stmt = $this->users->getAllUsers();

        $this->assertIsArray($stmt);
    }

    public function testDeleteUser()
    {
        $this->users->deleteUser(1);

        $stmt = $this->users->getUserId(1);

        $this->assertEmpty($stmt);
    }

    public function testDeleteUserWithInvalidId()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid user ID');
        
        $this->users->deleteUser('0');
    }

    public function getAllEventsForUser()
    {
        $stmt = $this->users->getAllEventsForUser(1);

        $this->assertIsArray($stmt);
    }

    public function testGetAllEventsForUserWithInvalidId()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid user ID');
        
        $this->users->getAllEventsForUser('0');
    }

    protected function tearDown(): void
    {
        $this->db = null;
        $this->users = null;
    }
}