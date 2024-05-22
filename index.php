<?php
$title = "";
$meta = "";
$version = "";
$version_new = "";
$root = $_SERVER['DOCUMENT_ROOT'];

require_once "$root/backend/template.php";

?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title><?= $title ?></title>
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta id="versionFiles" version="<?= $version ?>">

    <!-- Favicons -->
    <link rel="shortcut icon" href="/static/favicon.svg">
    <link rel="icon" href="/static/favicon.svg">
    <link rel="apple-touch-icon" href="/static/favicon.svg">
    <link rel="mask-icon" href="/static/favicon.svg">

    <?
    if ($meta) {
        foreach ($meta as $metaItem) {
            echo $metaItem->code . "\n\n";
        }
    }
    ?>

    <!-- Style global -->
    <link rel="stylesheet" href="/assets/css/style.css?v=<?= $version ?>">
</head>
<body>


<main id="app"></main>

<script src="/plugins/jquery-3.6.4.min.js"></script>
<script src="/plugins/swiper/swiper-bundle.min.js"></script>
<script src="/plugins/maskedinput/jquery.maskedinput.min.js"></script>
<script src="/assets/js/functions.js?v=<?= $version ?>"></script>
<script src="/assets/js/scripts.js?v=<?= $version ?>"></script>
<script src="/assets/js/router.js?v=<?= $version ?>"></script>

</body>
</html>