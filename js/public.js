
$(function () {
    //显示localstorage用户名
    $(".lecake_header").load("public.html .header",function(){
        if(localStorage.getItem("user")){
            var uname = localStorage.getItem("user");
            // console.log(uname);
            // 把登录替换成用户名
            $("#login").hide();
            $("#regist").hide();
            $("#login_n").html(uname).css('color','red');
            $("#regist_n").html("退出");
            $("#tupian").html(uname).prev().hide();
            $("#tupian").css({'color':'red','font-size':12,'font-style':'normal'});
            // $('.operation').hide();
            $("#regist_n").click(function(){
                localStorage.setItem('user','');
               $(this).hide().prev().show(); 
               $("#login").show().next().hide();
               $("#tupian").hide().prev().show();
            //    $('.operation').show();
            })
        }
        // 购物车展示商品数量
        var getUser = localStorage.getItem('user');
        var UserGoodsInfo  = localStorage.getItem(getUser);
        UserGoodsInfo = JSON.parse(UserGoodsInfo);
        if(UserGoodsInfo == undefined || UserGoodsInfo == null){//去掉为空的情况，定义一个空的数组
            UserGoodsInfo = new Array();
        }
        var totalNum = 0 ;
        for (var i = 0; i < UserGoodsInfo.length; i++){
            totalNum += UserGoodsInfo[i].g_num;  
        }
        $(".cartCount").html(totalNum);
        // if( totalNum == 0){
        //     $(".cartCount").css("hover:")
        // }else{
        //     $(".cartCount").parent().sibling(p).hide();   
        // }
 
     });
        
    // 显示输入框
    $(".nav_btn ").click(function () {
        $(".input_wrap").fadeIn(1000);
        // alert(1)
    })
    // 导航固定定位显示及隐藏
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 176) {
            $(".header_content").slideDown();
        } else if (top < 176) {
            $(".header_content").slideUp();
        }
    })
    $(".add_cart").click(function(){
        $(".amount").show();
    })

});
