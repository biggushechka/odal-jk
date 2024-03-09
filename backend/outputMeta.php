<?php

$root = $_SERVER['DOCUMENT_ROOT'];
$jsonData = file_get_contents($root . "/meta.txt");
$arrayMeta = json_decode($jsonData, true);

// Проверка успешности преобразования
if ($arrayMeta !== null) {
    $meta = new stdClass();
    $meta->meta = [];

    foreach ($arrayMeta as &$metaItem) {
        if ($metaItem["title"] === "title") {
            $meta->title = $metaItem["code"];
        } else {
            $meta->meta[] = $metaItem;
        }

    }

    return $meta;
} else {
    echo "Ошибка при преобразовании JSON данных в массив.";
}