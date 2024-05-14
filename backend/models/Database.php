<?php
namespace Masterticket;
require 'vendor/autoload.php';
use Dotenv\Dotenv;

use PDO;

class Database
{
    private $dbHost;
    private $dbName;
    private $dbUser;
    private $dbPass;
    private $pdo;

    public function __construct()
    {   
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->load();

        $this->dbHost = $_ENV['DB_HOST'];
        $this->dbName = $_ENV['DB_NAME'];;
        $this->dbUser = $_ENV['DB_USER'];
        $this->dbPass = $_ENV['DB_PASS'];;
    }

    public function connect()
    {
        $PDOoptions = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];

      $this->pdo = new \PDO('mysql:host=' . $this->dbHost . ';dbname=' . $this->dbName . '', $this->dbUser, $this->dbPass, $PDOoptions);

        return $this->pdo;
    }
}
