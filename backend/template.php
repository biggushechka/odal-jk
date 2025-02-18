<?php
global $root, $version, $meta;

require_once $root . '/backend/clearCash.php';

if ($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == 'odal-jk') {
    $version = mt_rand(10000, 99999999);
} else {
    $version = "1.0.3";
//    $getFileVersion = file($root."/backend/version.txt", FILE_IGNORE_NEW_LINES);
//    $version_now = $getFileVersion[0];
//    $version_new = $getFileVersion[1];
//    $version = $version_now;
//
//
//    if ($version_now != $version_new) {
//        $version_now = $version_new;
//        $version = $version_now;
//        $getFileVersion[0] = $getFileVersion[1];
//        file_put_contents($root."/backend/version.txt", implode(PHP_EOL, $getFileVersion));
//
//        clearCash($root . "/assets", $this->v);
//        clearCash($root . "/components", $this->v);
//        clearCash($root . "/pages", $this->v);
//        clearCash($root . "/plugins/modal", $this->v);
//    }
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