<?php

$method = $_SERVER['REQUEST_METHOD'];

$get_post_data = file_get_contents("php://input");
$POST = json_decode($get_post_data, true);

// получение
if ($method === "POST") {
    $jsonString = json_encode($POST);
    file_put_contents("meta.txt", $jsonString);
}