<?php
session_start();
header('Content-type: application/json');

$_SESSION = array();
session_destroy();

$jsonData = [
    'code' => 200,
    'status' => 'success',
    'message' => 'Logout successful'
];

echo json_encode($jsonData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
