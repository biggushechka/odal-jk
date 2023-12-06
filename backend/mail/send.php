<?php

$settings = include('./settings.php'); // Подключаем скрытие данные для отправки
$tmplMail = "bonus";
$tmplBonus = "";

$to = implode(',', $settings); // получатель(-и)
$subject = $_POST['subject']; // Тема письма
$message = letterFormationMail($_POST, $tmplMail); // Формируем письмо
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: <info@realestate.com>';

// Basic headers


// Формирование письма
function letterFormationMail($data, $tmplMail) {
    $body = "";

    if ($tmplMail == "bonus") { // Шаблон для бонусов
        include('./tmpl_mail.php');
        $body = tmplMail($data);
    }

    return $body;
}

echo $message;

// отправка
mail(
    $to,
    $subject,
    $message,
    $headers
);
