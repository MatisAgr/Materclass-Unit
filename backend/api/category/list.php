<?php
header('Content-type:application/json');

require_once '../../vendor/autoload.php';

use Masterticket\Category;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $jsonData = [
        'code' => 200,
        'status' => 'success'
    ];

    $category = new Category();
    $categoryDatas = $category->getAllCategory();

    if($categoryDatas){
        foreach($categoryDatas as $categoryData){
            $idCategory = $categoryData['category_id'];
            $categoryName = $categoryData['category_name'];
            
            $jsonData['Categories'][] = [
                'IdEvent' => $idCategory,
                'CategoryName' => $categoryName
            ];
        }
    }else {
        $jsonData['Categories'][] = null;
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