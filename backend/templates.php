<?php
class Templates {

    private $v = "",
            $domain = "",
            $title = "",
            $file_ver = "";

    function __construct() {
        require_once $_SERVER['DOCUMENT_ROOT'] . '/backend/clearCash.php';
        require_once $_SERVER['DOCUMENT_ROOT'] . '/backend/metric.php';
        $root = $_SERVER['DOCUMENT_ROOT'];

        // получаем домен (имя) сайта
        $url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $host = parse_url($url, PHP_URL_HOST);
        $parts = explode(".", $host);

        if ($_SERVER['HTTP_HOST'] == 'odal') {
            $this->domain = "alba-del-mare";
        } else {
            $this->domain = $parts[0];
        }

        // получаем данные по сайту
        $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/ajax/" . $this->domain . "/jk.json");
        $data = json_decode($jsonData, true);
        $this->title = $data['title'];
        echo $this->title;

        $this->file_ver = 1;
        if(!is_dir($root."/backend")) mkdir($root."/backend/version.txt");
        if(is_file($root."/backend/version.txt")){
            $this->file_ver = file_get_contents($root."/backend/version.txt");
            if($this->file_ver == $this->v)
                $this->file_ver = 0;
        } else {
            $this->file_ver = 1;
        }

        if ($_SERVER['HTTP_HOST'] == 'odal') {
            $this->v = mt_rand(10000, 99999999);
        } else {
            $this->v = file_get_contents($root."/backend/version.txt");

            clearCash($root . "/assets", $this->v);
            clearCash($root . "/components", $this->v);
            clearCash($root . "/pages", $this->v);
            clearCash($root . "/plugins/modal", $this->v);
            file_put_contents($root."/backend/version.txt", $this->v);
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
    <meta name="version" content="<?=$this->v?>" id="versionFiles">

    <!-- Favicons -->
    <link rel="shortcut icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="apple-touch-icon" href="/static/favicon.svg?v=<?=$this->v?>">
    <link rel="mask-icon" href="/static/favicon.svg?v=<?=$this->v?>">

    <link rel="stylesheet" href="/plugins/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="/assets/css/style.css?v=<?=$this->v?>">

    <?} public function links_head($arr=array()) {
        if (isset($arr['css'])) {
            foreach ($arr['css'] as $c) {
                switch ($c) {
                    default: echo"\n\t<link rel='stylesheet' href='{$c}.css?v={$this->v}'>";
            }
        }
    }

    getMetric($this->domain);

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
