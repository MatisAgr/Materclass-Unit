<?php
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Category;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_POST['CategoryName'])){
        $jsonData = [];
        $categoryName = $_POST['CategoryName'];
        $category = new Category();

        $category->createCategory($categoryName);
        
        $jsonData = [
            'code' => 200,
            'status' => 'success',
            'CategoryName' => $categoryName
        ];

    }else {
        http_response_code(405);
        $jsonData = [
            'code' => 405,
            'status' => 'error',
            'message' => 'One or some arguments are missing.'
        ];
    }
}else {
    http_response_code(405);
    $jsonData = [
        'code' => 405,
        'status' => 'error',
        'message' => 'Method ' . $_SERVER['REQUEST_METHOD'] . ' not allowed.'
    ];
}

echo json_encode($jsonData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);