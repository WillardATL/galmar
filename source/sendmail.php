<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name'])) {$name = $_POST['name'];}
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
    if (isset($_POST['email'])) {$email = $_POST['email'];}
    if (isset($_POST['message'])) {$message = $_POST['message'];}
    if (isset($_POST['formData'])) {$formData = $_POST['formData'];}

    $to = "kleep82@gmail.com"; /*Aдрес, на который должно приходить письмо*/
    $sendfrom   = "adm@galmar.vitalii-cherenkov.com"; /* Aдрес, с которого будет приходить письмо, НАСТОЯЩИЙ, с домена на котором сайт*/
    $headers  = "From: Galmar.com.ua <".$sendfrom.">" . "\r\n"; /* Имя отправителя */
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8" . "\r\n";
    $subject = "$formData";
    $message = "
		<html>
            <head>
                <title>Сообщение с сайта Galmar</title>
                <style type='text/css'>
                div { background: #dedede; }
                th { background: #000; text-align: right; width: 200px; color:#fff; }
                table { margin: 0 auto; }
                h1 { font-family: Arial, sans-serif; font-weight: normal; text-transform: uppercase; font-size: 24px;}
                </style>
            </head>
            <body>
                <table width='100%' height='50px' background='#dedede' border='0' cellpadding='12' cellspacing='0' style='border-collapse:collapse;'></table>
                <table width='50%' height='auto' background='#dedede' border='0' cellpadding='0' cellspacing='0' style='border-collapse:collapse;'>
                    <h1>$formData</h1>
                </table>
                <div>
                <table width='50%' bgcolor='#fff' border='1px' bordercolor='#b5b5b5' cellpadding='12' cellspacing='0' style='border-collapse:collapse;'>
                    <tr>
                    <th>Время:</th><td>" . date('d.m.Y H:i:s') . "</td>
                    </tr>
                    <tr>
                    <th>Имя отправителя:</th><td>$name</td>
                    </tr>
                    <tr>
                    <th>Телефон:</th><td>$phone</td>
                    </tr>
                    <tr>
                    <th>Сообщение:</th><td>$message</td>
                    </tr>
                </table>
                </div>
                <table width='100%' height='50px' background='#dedede' border='0' cellpadding='12' cellspacing='0' style='border-collapse:collapse; margin: 0 auto;'></table>
            </body>
         <html>";
    $send = mail ($to, $subject, $message, $headers);
if ($send == 'true')
        {
        echo '<h1 class="success-head">Дякуємо!</h1><p class="success-p">Ми отримали ваше повідомлення і передзвонимо найближчим часом.</p><button data-remodal-action="confirm" class="btn btn-quickorder" style="margin-top:20px;">Хорошо</button>';
        }
        else
        {
        echo '<center><p class="fail"><b>Помилка! Повідомлення не відправлено!</b></p></center>';
        }
    } else {
        http_response_code(403);
        echo "Спробуйте ще раз";
}
?>