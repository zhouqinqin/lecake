// 表单正则验证
var verification = (function () {
    var $from = document.querySelector('.form_wrap');
    var $btn = document.querySelector('.register_btn');
    var $inpALl = $from.querySelectorAll('input');
    // var $username = $from.querySelector("#username");
    // var checkUname = $from.querySelector(".checkUname");
    // var checkPhone = $from.querySelector(".checkPhone");
    // var $phone =  $from.querySelector("#phone");
    var flag = false;
    var checkInput = {
        repassword: function (val) {
            var ele = document.getElementById('password');
            return ele.value == val ? 1 : 0;
        },
        password: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        },
        phone: function (val) {
            var reg = /^1[35789]\d{9}$/;
            return reg.test(val) ? 1 : 0;
        },
        username: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        }
    }
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            for (var i = 0; i < $inpALl.length; i++) {
                $inpALl[i].onblur = function () {
                    var _this = this;
                    // 文本值去除前后空格
                    var val = this.value.trim();
                    //展示的文本元素节点
                    var $tipText = this.nextElementSibling;

                    if (val == '') {
                        // 文本框内容为空
                        $tipText.className = 'bg-danger';
                        $tipText.innerHTML = '输入内容不能为空';
                    } else {
                        // 文本内容不为空
                        var bool = checkInput[this.name](val);
                        //  console.log(bool);
                        if (bool) {
                            $tipText.className = 'bg-success';
                            $tipText.innerHTML = '输入正确';
                            
                        } else {
                            $tipText.className = 'bg-danger';
                            $tipText.innerHTML = this.getAttribute('data-error');

                        }
                    }
                }
            }
            $btn.onclick= function () {
                
                // 获取失败元素
                // 如果有一个， 证明至少有一个表单没有通过验证
                var errorInput = $from.querySelector('.bg-danger');
                if(errorInput) {
                    errorInput.parentNode.querySelector('input').focus();
                } else {
                    $.ajax({
                        type: "POST",
                        url: "php/cakeregister.php",
                        data:{
                            username:$("#username").val(),
                            password:$("#password").val(),
                            tel:$("#phone").val()
                        },
                        success: function(msg){
                          console.log(msg);
                          if(msg == 0){
                              alert('用户名已存在');
                            //   $(".checkUname").html("用户名已存在");
                          }
                          if(msg == 1){
                            alert('手机号码已存在');
                        //     $(".checkPhone").html("手机号码已存在");
                          }
                          if(msg == 200){
                              alert("注册成功！")
                            // $(".success").html("注册成功！");
                            location.href ='login.html';  
                          }
                        }
                     });

                }
            }
        }
    }
}())