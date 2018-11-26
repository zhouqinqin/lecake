// 数据渲染
var url = location.search;
var goodsid = url.split("=")[1];;
$(function () {
    $.getJSON('json/detail.json', function (json) {
        for (var i = 0; i < json.length; i++) {
            // console.log(json[i].id);
            if ((json[i].id) == goodsid) {
                var _str = "";
                _str += `
                <div class="box">
                    <div class="show-img">
                        <img src="images/${json[i].src}">
                        <span class="filter"></span>
                    </div>
                    <div class="magnify-img">
                        <img src="images/${json[i].src}"  id="big-img">
                    </div>
                </div>
                `;
                $(".magnifyglass").html(_str);
                // console.log(_str);
                // console.log(json[i].id)
                var str = "";
                str += `
                <div>
                    <h1 class="title no_wrap f_left">
                        <span id="goodsTitle">${json[i].tit}</span>
                    </h1>
                    <div class="price_wrap f_right">
                        <p class="new_price">
                        <small>¥</small> <span id="goodsPrice">${json[i].price}</span>
                        </p>
                    </div>
                </div>   
            `;
                $(".title_wrap").html(str);

            }
        }
         // 放大镜
            var magnifyglass = (function () {
                return {
                    init: function () {
                        this.box = document.querySelector(".box");
                        this.show_img = document.querySelector(".show-img");
                        this.filter = document.querySelector(".filter");
                        this.magnify_img = document.querySelector(".magnify-img");
                        this.big_img = document.querySelector("#big-img");
                        this.event();
                    },
                    event: function () {
                        var _this = this;
                        // 鼠标移入放大镜跟大图显示
                        this.show_img.onmouseover = function (e) {
                            var e = e || event;
                            _this.filter.style.display = "block";
                            _this.magnify_img.style.display = "block";
                        };
                        // 鼠标移出放大镜跟大图隐藏
                        this.show_img.onmouseout = function (e) {
                            var e = e || event;
                            _this.filter.style.display = "none";
                            _this.magnify_img.style.display = "none";
                        };
                        //  鼠标移动的位置
                        this.show_img.onmousemove = function (e) {
                            // alert(1)
                            var boxParent = _this.box.offsetParent;
                            var a = 0;
                            var b = 0;
                            // 边界处理，把offsetTop赋值给父级，查找到所有父级
                            while (boxParent !== null) {
                                a += boxParent.offsetLeft;
                                b += boxParent.offsetTop;
                                boxParent = boxParent.offsetParent;
                            }
                            var e = e || event;
                            var x = e.pageX - a - _this.filter.offsetWidth / 2;
                            var y = e.pageY - b - _this.filter.offsetHeight / 2;
                            // 边界处理
                            var maxx = _this.show_img.clientWidth - _this.filter.offsetWidth;
                            var maxy = _this.show_img.clientHeight - _this.filter.offsetHeight;
                            x = x < 0 ? 0 : (x > maxx ? maxx : x);
                            y = y < 0 ? 0 : (y > maxy ? maxy : y);
                            _this.filter.style.left = x + "px";
                            _this.filter.style.top = y + "px";

                            //计算比例 大图移动的范围是放大镜移动的几倍（倍数等于大图片（宽高）/盒子（宽高））
                            var _x = x * _this.big_img.offsetWidth / _this.show_img.offsetWidth;
                            var _y = y * _this.big_img.offsetHeight / _this.show_img.offsetHeight;
                            // 大图移动的范围
                            _this.big_img.style.left = -_x + "px";
                            _this.big_img.style.top = -_y + "px";
                        }
                    },
                }
            }())
            magnifyglass .init();
    })
}());


// 利用事件委托显示
$(function () {
    $(".persons a").click(function () {
        // console.log($(this));
        console.log($(this).index())
        $(this).attr("class", "active").siblings().removeClass("active");
        $(".spec").eq($(this).index()).show().siblings().hide();

    })
})
// 点击加入购物车
$(function () {
    var localUserName =  localStorage.getItem("user"); //作为key.
    //写数组，数组由多个对象组成。
    var shopCarList =  localStorage.getItem(localUserName);//获取当前用户中的购物车的信息。
        shopCarList = JSON.parse(shopCarList);//转为数组对象
    if(shopCarList == undefined || shopCarList == null){//去掉为空的情况，定义一个空的数组
        shopCarList = new Array();
    }
    var sumNum = 0;  //记录购物城中所有商品的数量。
    $("#cartAdd").click(function () {
        var localObj = {
            "g_id": goodsid,
            "g_num": 1
        }
        var flag = false; //记录是否在cookie存在， false代表 不存在，true代表存在
        for(var i=0;i<shopCarList.length;i++){ //遍历当前的数组中是否存在该商品，有则数量累加，没有则新增
            if(shopCarList[i].g_id == goodsid){
                flag = true;
                shopCarList[i].g_num +=1;
                break;
            }
        }
        if(!flag){//flag为false代表cookie不存在该商品
            shopCarList.push(localObj);
        }
        localStorage.setItem(localUserName, JSON.stringify(shopCarList));//重新放入cookie中
        
        if(localStorage.getItem(localUserName)){
            var cartGoods = localStorage.getItem(localUserName);
            cartGoods = JSON.parse(cartGoods);
            var sum = 0;
            for (var i = 0; i < cartGoods.length; i++) {
                sum += cartGoods[i].g_num;
                $(".cartCount").text(sum);
            }

        }else{
            return;
        }
    })
    $('#buyNow').click(function(){
        location.href ='shopcar.html'; 
    })
})
