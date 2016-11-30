<?php
$name = $_POST['username'];
$pass = $_POST['password'];
if($name=='admin'&&$pass=='admin'){
  setcookie("name",$name,time()+36000, '/');
	echo 1;
}else{
	echo 0;
}
?>
