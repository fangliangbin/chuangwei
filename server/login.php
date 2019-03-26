<?php
// header("Access-Control-Allow-Origin: *");
include('./connet_db.php');
$data = file_get_contents('php://input');
$data = json_decode($data);

$phone = $data -> phone;
$password = $data -> password;

$sql = "select * from user2 where telephone='$phone' and password='$password'";
// var_dump($sql);

$db = new DB();
$result = $db -> fetch($sql,"object");
if($result){
    //获取到用户
    $arr = array("code" => 200,"id" => array("id"=> $result->id),"msg"=>"登录成功");
}else{
    //没获取到用户
    $arr = array("code"=>0,"msg" => "用户名或者密码输入错误");
}
echo json_encode($arr);//转换为json数据




?>