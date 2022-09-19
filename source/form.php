<?
$reg_ex_phone = '/^[\d\+][\d\(\)\ -]{4,14}\d$/';
$reg_ex_email = '/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i';

$mail_subject = 'Новая заявка Stitch flow';
$mail_to = 'stitch-flow@mail.ru';

if (isset($_POST['user-name']) && isset($_POST['phone']) && isset($_POST['email'])) {
    $name = trim(htmlspecialchars($_POST['user-name']));
    $phone = trim(htmlspecialchars($_POST['phone']));
    $email = trim(htmlspecialchars($_POST['email']));
    $comment = trim(htmlspecialchars($_POST['comments']));
    $time = date('Y-m-d H:i:s');

    $mail_message = $time . "\n" . 'Name:' . ' ' . $name . "\n" . 'Phone:' . ' ' . $phone . "\n" . 'email:' . ' ' . $email . "\n" . 'comments:' . ' ' . $comments . "\n";


    if ((preg_match($reg_ex_phone, $phone)) && (preg_match($reg_ex_email, $email))) {
        $dataFile = fopen('users.txt', 'a');
        fwrite($dataFile, $time . ' ' . 'Name:' . ' ' . $name . ' ' . 'Phone:' . ' ' . $phone . ' ' . 'email:' . ' ' . $email . ' ' . 'comments:' . ' ' . $comments . "\n");
        fclose($dataFile);
        echo "Спасибо, ваша заявка принята. Вы можете <a href=\"index.html\"> вернуться на сайт </a>."; /* на случай проблем с js*/

        mail($mail_to, $mail_subject, $mail_message);
    } else {
        $errorFile = fopen('error.txt', 'a');
        fwrite($errorFile, $time . ' ' . 'Name:' . ' ' . $name . ' ' . 'Phone:' . ' ' . $phone . ' ' . 'email:' . ' ' . $email . "\n");
        fclose($errorFile);
        echo " <a href=\"index.html\">Вернитесь на сайт </a> и введите корректные данные! Таже вы можете написать мне по указанным контактам."; /* на случай проблем с js*/
    }
} else {
    $emptyFile = fopen('no-data.txt', 'a');
    fwrite($emptyFile, $time . ' ' . 'Name:' . ' ' . $name . ' ' . 'Phone:' . ' ' . $phone . ' ' . 'email:' . ' ' . $email . "\n");
    fclose($emptyFile);
    echo "<a href=\"index.html\">Вернитесь на сайт </a> и введите данные! Таже вы можете написать мне по указанным контактам."; /* на случай проблем с js*/
}
