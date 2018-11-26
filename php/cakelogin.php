<?php
    include("public.php");
    $db = getConnect();
    $username = $_POST['username'];
    $password = $_POST['password'];
    // $tel = $_POST['tel'];
    // 设置sql语句
    $sql = "select * from usertable" ;
    // 执行sql语句
    $result = mysqli_query($db,$sql);

    $flag = false;
    while($arr = mysqli_fetch_array($result)){	
        $arr1= $arr['username'];
        $arr2 = $arr['password'];
        $arr3 = $arr['tel'];
        // echo $arr3;
        if(($username == $arr1 && $password == $arr2) || ($username == $arr3 && $password == $arr2) ){
            $flag = true;
        }
    } 
    if($flag ){
             echo 1;   
        }   
    if($flag==false){
             echo 0;
    }  
?>