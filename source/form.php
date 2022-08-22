<?
if (isset($_POST['name'])&& isset($_POST['phone']) && isset($_POST['email'])) {
$name = trim(htmlspecialchars($_POST['user-name']));
$phone = trim(htmlspecialchars($_POST['phone']));
$email = trim(htmlspecialchars($_POST['email']));
$comment = trim(htmlspecialchars($_POST['comments']));
$time = date('Y-m-d H:i:s');
$reg_ex_phone = '/^[\d\+][\d\(\)\ -]{4,14}\d$/';
$reg_ex_email = '/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i';

if ((preg_match($reg_ex_phone, $phone)) && (preg_match($reg_ex_email, $email))) {
    $dataFile= fopen('users.txt', 'a');
    fwrite($dataFile, $time.' '.'Имя:'.' '. $name.' '.'Телефон:'.' '.$phone.' '.'email:'.' '.$email."\n");
    fclose($dataFile);

// $users = file("users.txt");
// foreach($users as $user) {
//     echo $name."<br />";
//     echo $comment;
    }
} else {
    echo "Вернитесь и введите корректные данные!";
}
  
} else {
echo "Введите данные!";
}

?>