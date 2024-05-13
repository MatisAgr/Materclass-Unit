<?php
require 'vendor/autoload.php';

use Masterticket\Database;

$database = new Database();
var_dump($database->connect());
