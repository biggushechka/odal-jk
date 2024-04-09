<?php
class Templates {

    private $v = "",
            $title = "",
            $meta;

    function __construct() {
        
        $root = $_SERVER['DOCUMENT_ROOT'];

        if ($_SERVER['HTTP_HOST'] == 'odal-jk') {
            $this->v = mt_rand(10000, 99999999);
        } else {
            $getFileVersion = file($root."/backend/versionFiles.txt", FILE_IGNORE_NEW_LINES);
            $this->v = $getFileVersion[0];

            require_once $_SERVER['DOCUMENT_ROOT'] . '/backend/clearCash.php';

            clearCash($root . "/assets", $this->v);
            clearCash($root . "/components", $this->v);
            clearCash($root . "/pages", $this->v);
            clearCash($root . "/plugins/modal", $this->v);
        }

        if (file_exists($root . "/meta.txt")) {
            require_once $root . "/backend/outputMeta.php";

            $this->title = $meta->title;
            $this->meta = $meta->meta;
        }
    }

    public function head() {?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?=$this->title?></title>
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta version="<?=$this->v?>" domain="" id="configmeta">

    <!-- Favicons -->
    <link rel="shortcut icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="apple-touch-icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="mask-icon" href="/static/favicon.svg?v=<?=$this->v?>">

    <link rel="stylesheet" href="/plugins/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="/assets/css/style.css?v=<?=$this->v?>">

    <?
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/meta.txt")) {
            foreach ($this->meta as $metaItem) {
                echo $metaItem["code"] . "\n";
            }
        }
    ?>

    <?} public function links_head($arr=array()) {
        if (isset($arr['css'])) {
            foreach ($arr['css'] as $c) {
                switch ($c) {
                    default: echo"\n\t<link rel='stylesheet' href='{$c}.css?v={$this->v}'>";
            }
        }
    }
    ?>

</head>
<body>
<?} public function script_head($arr=array()) {?>

<script src="/plugins/jquery-3.6.4.min.js"></script>
<script src="/plugins/swiper/swiper-bundle.min.js"></script>
<script src="/plugins/maskedinput/jquery.maskedinput.min.js"></script>
<script src="/assets/js/functions.js?v=<?=$this->v?>"></script>
<script src="/assets/js/scripts.js?v=<?=$this->v?>"></script>
    <?if($arr['js']){
        echo "\n\t<!-- ------- include scripts ------- -->";
        foreach($arr['js'] as $j){
            switch($j){
                default: echo"\n\t<script type='module' src='{$j}.js?v={$this->v}'></script>";
            }
        }
    }?>
</body>
</html>
    <?}
}
