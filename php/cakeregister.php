<?php
    // 防止乱码
    header('content-type:text/html;charset=utf-8');
    // 接收表单提交数据
    $username =$_POST['username'];
    $password =$_POST['password'];
    $tel=$_POST['tel'];
    $db=mysqli_connect("localhost","root","");
    mysqli_select_db($db,"lecake");
    mysqli_query($db,"set names utf-8");
    // $sql = "insert into usertable (username,password,tel,mark) values('$username','$password','$tel','忠实客户') ";
    // $row = mysqli_query($db,$sql);
    // if($row){
    //     echo 200;  
    // }
    $sql = "select * from usertable where username = '$username' or tel = '$tel'" ;
    // echo $sql;
    $row = mysqli_query($db,$sql);
    //$result = mysqli_fetch_array($row);//一定要注释的内容
    //  print_r($result);
    //  print_r($result['username']);
    $flag = false;
    while($arr1 = mysqli_fetch_array($row)){
        // print_r($arr1);
        $arr =$arr1['username'];
        $arr2 =$arr1['tel'];
        // print_r($arr);
            if($username == $arr){
                $flag = true;
                //echo 0;//用户名已存在
                break;
            }
            if($tel ==$arr2  ){
                $flag = true;
                //echo 1;//手机号码已存在
                break;   
            }
        } 
          
    
    if(!$flag){
        $sql = "insert into usertable (username,password,tel,mark) values('$username','$password','$tel','忠实客户') ";
            $row = mysqli_query($db,$sql);
            echo 200;  
    }
 ?>