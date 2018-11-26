$(function () {
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
    $(".add_cart").click(function () {
        $(".amount").show();
    })

});
// 精品配件数据渲染
;
$(function () {
    $.getJSON('json/accessories.json', function (json) {
        //console.log(json);
        var str = "";
        for (var i = 0; i < json.length; i++) {
            str +=
                `
                <li class="swiper_slide">
                    <a href="detail.html"><img src="images/${json[i].src}" alt=""></a>
                    <div class="p_info">
                        <h3 class="no_wrap">${json[i].tit}</h3>
                        <div class="price_wrap">
                            <span class="p_price">￥${json[i].price}</span>
                            <button class="add_cart">+</button>
                        </div>
                    </div>
                </li>
            `;
            //console.log(json[i].src);
        }
        $(".swiper_wrapper").html(str);
    })
}());
//熊抱吐司数据渲染
;
$(function () {
    $.getJSON('json/toast.json', function (json) {
        var str = "";
        for (var i = 0; i < json.length; i++) {
            str +=
                `
             <li class="swiper_slide">
                <div class="img_wrap">
                    <a href="detail.html"><img src="images/${json[i].src}" alt=""></a>
                </div>
                <div class="p_info">
                    <h3 class="no_wrap">${json[i].tit}</h3>
                    <div class="price_wrap">
                        <span class="p_price">￥${json[i].price}</span>
                        <button class="add_cart">+</button>
                    </div>
                </div>
            </li>  
            `;
            //console.log(json[i].src);
        }
        $(".swiper_wrapper_t").html(str);
    })
}());
//加价商品
;
$(function () {
    $.getJSON('json/addMoney.json', function (json) {
        var str = "";
        for (var i = 0; i < json.length; i++) {
            str +=
                `
             <li class="gift_item">
                        <a href="detail.html" target="_blank">
                            <div class="img_wrap">
                                <div class="div_img"> <img src="images/${json[i].src}"></div>
                            </div>
                        </a>
                        <div class="p_info">
                            <a href="# target="_blank"><h3 class="no_wrap p_name">${json[i].tit}</h3></a> 
                            <div class="p_tag">
                                <p class="third_logistics"><b class="text">${json[i].logistics}</b></p>
                            </div>
                            <div class="price_wrap">
                                <p class="new_price"><small>¥</small> ${json[i].price}</p>
                                <p class="markup_price"><span class="addmoney">加购价</span><i>￥</i>  ${json[i].adprice}</p>
                            </div> 
                            <a href="#" class="buy_btn normal"><span>加入购物车&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span></a>
                        </div>
                    </li>
            `;
            //console.log(json[i].src);
        }
        $(".gifts_new").html(str);
    })
}());

$(function () {
    var moveLeft = 0;
    var count = 0;
    // 精品配件轮播图  右边
    $("#n_btn").click(function () {
        count++;
        //alert(count+"right");
        if (count > 3) {
            count = 4;
            return;
        }
        moveLeft -= 900;
        $(".swiper_wrapper").animate({
            left: moveLeft
        }, "slow");

    });

    $("#p_btn").click(function () {
        count--;
        //alert(count+"left");
        if (count <= 0) {
            count = 0;
            return;
        }
        moveLeft += 900;
        $(".swiper_wrapper").animate({
            left: moveLeft
        }, "slow");


    });
    // 熊抱吐司轮播
    $("#r_btn").click(function () {
        count++;
        if (count > 1) {
            count = 2;
            return;
        }
        moveLeft -= 900;
        $(".swiper_wrapper_t").animate({
            left: moveLeft
        }, "slow");

    });
    $("#l_btn").click(function () {
        count--;
        if (count <= 0) {
            count = 0;
            return;
        }
        moveLeft += 900;
        $(".swiper_wrapper_t").animate({
            left: moveLeft
        }, "slow");
    });
    //   //  吐司切换套餐
    //   $(".totast_nav a").click(function(){
    //       console.log($(this));
    //       console.log($(this).index);
    //   })
})
// 购物车数据渲染
$(function (){
    var getUser = localStorage.getItem('user');
    var UserGoodsInfo  = localStorage.getItem(getUser);
    UserGoodsInfo = JSON.parse(UserGoodsInfo);
    console.log(UserGoodsInfo);
    if(UserGoodsInfo == undefined || UserGoodsInfo == null){//去掉为空的情况，定义一个空的数组
        UserGoodsInfo = new Array();
    }
    $.getJSON('json/detail.json', function (json) {
            // console.log(json);
            //  console.log(UserGoodsInfo);
            var str = "";
            var _str = " ";
            var str1 = " ";
            var totalPrice = 0.0;   
            var totalNum = 0 ;   
        for (var i = 0; i < UserGoodsInfo.length; i++) {
            for (var j = 0; j < json.length; j++) {
                if (UserGoodsInfo[i].g_id == (json[j].id)) {
                    totalPrice += UserGoodsInfo[i].g_num * json[j].price;
                    totalNum += UserGoodsInfo[i].g_num;
                    str +=
                    `
                <div class="goods_can" style="margin-bottom:20px;" >
                        <div class="item_message clearfix">
                            <a  style="color:#3e3e3e" href="#" class="check_status" ><i class="iconfont icon-dui"></i></a>
                            <div class="img_wrap f_left">
                                <a href="#" target="_blank"><img src="images/${json[j].src}"></a>
                            </div>
                            <div class="p_info f_left">
                                <div class="p_detail f_left">
                                    <h2 class="no_wrap"><a  style="color:#3e3e3e" href="#" target="_blank">${json[j].tit}</a></h2>
                                    <h3 class="no_wrap hide"></h3>
                                    <h4>1盒</h4>
                                    <div class="price_wrap">
                                        <p class="new_price"><small>单价：￥</small>${json[j].price}</p>
                                    </div>
                                </div>
                                <div class="p_edit f_right">
                                    <p class="p_price">小计：${json[j].price*UserGoodsInfo[i].g_num}</p>
                                    <div class="input_wrap">
                                        <a href="#" class="down num_edit_btn" onclick="jian(${json[j].id});"><i class="iconfont icon-jian1"></i></a>
                                        <input type="text" class="item_num" value="${UserGoodsInfo[i].g_num}">
                                        <a href="#" class="up num_edit_btn" onclick="jia(${json[j].id});"><i class="iconfont icon-jia"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }
                $(".goods_item").html(str);
            }
             
        }
        _str +=
        `
        <div class="wrap">
            <div class="mini_width clearfix">
                <a href="#" class="check_status active">全选<i class="iconfont icon-dui"></i></a>
                <a href="#" class="f_left delete_btn">删除</a>
                <p class="f_left total_count">共 <span>${totalNum}</span> 件商品，已选择 <span>${totalNum}</span> 件</p>
                <div class="f_right total_amount_wrap">
                    <div class="inner">
                        <p class="countAll"><span>应付(不含运费)：</span>￥<strong>${totalPrice}</strong></p>
                    </div>
                </div>
                <button class="order_btn">结算</button>
            </div>
        </div>
    `;
    $('.amount').html(_str);
    str1+=`
    （<b class="total_count">${totalNum}</b>）
    `
    $('#cartGoods').html(str1);
    if(totalNum ==0){
        $('.no_content ').show().siblings().hide();
    }   
    })
})

