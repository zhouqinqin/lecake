 // 登录互相切换
 ;$(function(){
    $(".loadcode").click(function(){
        $(this).attr("class","now").siblings().removeClass("now");
        $(".idcode_pannel").fadeIn(500);
        $(".ercode_pannel").hide();
    });
    $(".loadMa").click(function(){
        $(".idcode_pannel").hide();
        $(".ercode_pannel").fadeIn(500); 
        $(this).attr("class","now").siblings().removeClass("now");
    });
    // 登录成功页面跳转
    $(".login_btn").click(function(){
        $.ajax({
            type: "POST",
            url: "php/cakelogin.php",
            data:{
                username:$(".username").val(),
                password:$(".password").val()
            },
            success: function(msg){
            //   alert( msg );
                if(msg == 1){
                    alert("登录成功");
                    var unameObj = $(".username").val();
                    // console.log(unameObj)
                    localStorage.setItem("user",unameObj);  
                    location.href ='lecake.html';  
                }
                if(msg == 0){
                alert("登录失败，用户名或密码有误");
                }
            }
            })
    });
}());



