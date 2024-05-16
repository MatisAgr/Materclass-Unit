<?php

use PHPUnit\Framework\TestCase;
use Masterticket\Database;
use Masterticket\Users;
class UsersTest extends TestCase
{
    private $db;
    private $users;
    private $user_username = 'Test User';
    private $user_real_mail = 'testusertesttestuseruser@test.com';
    private $user_fake_mail = 'testuser';
    private $user_passwd = 'password';
    private $user_real_birth = '2000-01-01';
    private $user_fake_birth = '2000-01-32';
    private $user_role = 'user';

    public function setUp(): void
    {
        $this->db = new Database();
        $this->db = $this->db->connect();
        $this->users = new Users();
    }

    public function testCreateUser()
    {
        $this->users->createUser($this->user_username, $this->user_real_mail, $this->user_passwd, $this->user_real_birth, $this->user_role);

        $stmt = $this->db->query("SELECT * FROM users WHERE user_mail = '$this->user_real_mail'")->fetch();
        $this->assertEquals($this->user_username, $stmt['user_username']);
    }
    
    public function testCreateUserWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->createUser($this->user_username, $this->user_fake_mail, $this->user_passwd, $this->user_real_birth, 'user');
    }

    public function testCreateUserWithInvalidPassword()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');
        
        $this->users->createUser($this->user_username, $this->user_real_mail, NULL, $this->user_real_birth, 'user');
    }

    public function testCreateUserWithInvalidBirthDate()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid birth date');
        
        $this->users->createUser($this->user_username, $this->user_real_mail, $this->user_passwd, $this->user_fake_birth, 'user');
    }

    public function testCreateUserWithInvalidRole()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid role');
        
        $this->users->createUser($this->user_username, $this->user_real_mail, $this->user_passwd, $this->user_real_birth, 'invalid');
    }

    public function testCreateUserWithExistingEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Email already exists');
        
        $this->users->createUser($this->user_username, $this->user_real_mail, $this->user_passwd, $this->user_real_birth, 'user');
    }

    public function testGetUserId()
    {
        $stmt = $this->users->getUserId(1);

        $this->assertEquals('admin', $stmt['user_username']);
    }

    public function testGetUserIdWithInvalidId()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid user ID');
        
        $this->users->getUserId('0');
    }

    public function testGetUserByEmail()
    {
        $stmt = $this->users->getUserByEmail($this->user_real_mail);

        $this->assertEquals($this->user_username, $stmt['user_username']);
    }

    public function testGetUserByEmailWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->getUserByEmail($this->user_fake_mail);
    }

    public function testGetUserByEmailAndPassword()
    {
        $email = $this->user_real_mail;

        $user = $this->users->getUserByEmailAndPassword($email, $this->user_passwd);

        $this->assertEquals($email, $user['user_mail']);
        $this->assertEquals($this->user_username, $user['user_username']);
    }

    public function testGetUserByEmailAndPasswordWithInvalidEmail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid email address');
        
        $this->users->getUserByEmailAndPassword($this->user_fake_mail, $this->user_passwd);
    }

    public function testGetUserByEmailAndPasswordWithInvalidPassword()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('All fields are required');
        
        $this->users->getUserByEmailAndPassword($this->user_real_mail, NULL);
    }

    public function testGetAllUsers()
    {
        $stmt = $this->users->getAllUsers();

        $this->assertIsArray($stmt);
    }

    public function testDeleteUser()
    {
        $last_user_id = $this->db->query("SELECT MAX(user_id) FROM users")->fetchColumn();
        $this->users->deleteUser($last_user_id);

        $stmt = $this->users->getUserId($last_user_id);

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