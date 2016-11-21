<?php
$name = $_POST['username'];
$pass = $_POST['password'];
if($name=='admin'&&$pass=='admin'){
	echo 1;
}else{
	echo 0;
}
?>
