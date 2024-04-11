<?php
global $root, $version, $meta;

require_once $root . '/backend/clearCash.php';

if ($_SERVER['HTTP_HOST'] == 'odal-jk') {
    $version = mt_rand(10000, 99999999);
} else {
    $getFileVersion = file($root."/backend/versionFiles.txt", FILE_IGNORE_NEW_LINES);
    $version = $getFileVersion[0];

    clearCash($root . "/assets", $version);
    clearCash($root . "/components", $version);
    clearCash($root . "/pages", $version);
    clearCash($root . "/plugins/modal", $version);
}

if (file_exists("$root/static/meta.json")) {
    $meta_content = file_get_contents("$root/static/meta.json");
    $meta_array = json_decode($meta_content);

    // Проверка успешности преобразования
    if ($meta_array !== null) {
        $metaObj = [];

        foreach ($meta_array as &$metaItem) {
            if ($metaItem->title === "title") {
                $title = $metaItem->code;
            } else {
                $metaObj[] = $metaItem;
            }
        }

        $meta = $metaObj;
    } else {
        echo "Ошибка при преобразовании JSON данных в массив.";
    }
}