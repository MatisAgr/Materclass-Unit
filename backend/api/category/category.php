<?php
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Category;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['CategoryName'])){
        $jsonData = [];
        $categoryName = $_GET['CategoryName'];
        $category = new Category();
        $categoryData = $category->getCategoryByName($categoryName);

        if($categoryData){
            $idCategory = $categoryData['category_id'];
            
            $jsonData = [
                'code' => 200,
                'status' => 'success',
                'IdCategory' => $idCategory,
                'CategoryName' => $categoryName
            ];
        }else {
            $jsonData =  [
                'code' => 200,
                'status' => 'success',
                'message' => 'No data for this category'
            ];
        }
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