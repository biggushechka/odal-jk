<?php

$get_post_data = file_get_contents("php://input");
$POST = json_decode($get_post_data, true);
$root = $_SERVER['DOCUMENT_ROOT'];

// Преобразование массива в формат JSON
$jsonData = json_encode($POST);

file_put_contents($root . "/meta.txt", $jsonData);

echo json_encode($POST, JSON_UNESCAPED_UNICODE);
