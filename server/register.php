<?php
// header("Access-Control-Allow-Origin: *");
include('./connet_db.php');
$data = file_get_contents('php://input');
$data = json_decode($data);
// $phone = $_POST("phone");
// $password = $_POST("password");
$phone = $data -> phone;
$password = $data -> password;

$sql = "INSERT INTO user2 (`telephone`,`password`) VALUES ('$phone','$password')";
// var_dump($sql);

$db = new DB();
$result = $db -> fetch($sql);
if($result){
    $arr = array("code" => 200,"msg"=>"注册成功");
}else{
    $arr = array("code"=>0,"msg" => "因为网络原因注册失败，请重新注册");
}
echo json_encode($arr);//转换为json数据


?>