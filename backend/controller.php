<?php
session_start();
spl_autoload_register('autoload');

function autoload($className) {
  $fileName = strtolower($className) .'.php';
  require_once $_SERVER['DOCUMENT_ROOT']."/backend/".$fileName;
}
$templates = new Templates();
