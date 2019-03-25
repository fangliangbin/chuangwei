var register = (function(){
    let verifyCode,
    timer,
    num = 120;
    return {
        init(){
            this.getIdentifyingCode();
            this.event();
        },
        event(){
            const self = this;
            //点击换验证码
            $('.identCodeRightTxt').on('click',function(){
                self.getIdentifyingCode();
            })
            //验证验证码
            $('#verifyCodeInput').on('blur',function(){
                let text = this.value;
                var res = verifyCode.validate(text);
                const $p = this.nextElementSibling;
                if(res){
                    $p.innerHTML = '验证成功';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '验证码错误';
                    $p.className = 'bg-danger';
                }
            })
            //验证手机号
            $('#checkPhone').on('blur',function(){
                let text = this.value;
                const $p = this.nextElementSibling;
                const reg = /^1[35789]\d{9}$/;
                if(reg.test(text)){
                    $p.innerHTML = '手机号正确';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '手机号有误';
                    $p.className = 'bg-danger';
                }
            })
            //点击按钮倒计时
            $('.verifyCodeBtn').on('click',function(){
                if(num >= 0 && num <= 120){
                    $('.verifyCodeBtn').attr('disabled','true');
                }
                timer = setInterval(x => {
                    this.innerHTML = num;
                    num--;
                    if (num < 0) {
                        clearInterval(timer);
                        this.innerHTML = '获取';
                        $('.verifyCodeBtn').removeAttr('disabled');
                        num = 120;
                    }
                }, 1000);
            })
            //验证验证码
            $('#phoneVerifyCode').on('blur',function(){
                let text = this.value;
                const $p = this.nextElementSibling;
                if(text){
                    $p.innerHTML = '验证码正确';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '验证码错误';
                    $p.className = 'bg-danger';
                }
            })
            //点击切换第二个注册页面
            $('.btn').on('click',function(){
               
                // console.log(!$('#checkPhone').val() || $('#checkPhone + p').hasClass('bg-danger'))
                if(!$('#verifyCodeInput').val() || $('#verifyCodeInput + p').hasClass('bg-danger')){
                    $('.btn').attr('disabled','disabled');
                    $('#verifyCodeInput').focus();
                }if(!$('#checkPhone').val() || $('#checkPhone + p').hasClass('bg-danger')){
                    // debugger
                    $('.btn').attr('disabled','disabled');
                    $('#checkPhone').focus();
                }if(!$('#phoneVerifyCode').val() || $('#phoneVerifyCode + p').hasClass('bg-danger')){
                    $('.btn').attr('disabled','disabled');
                    $('#phoneVerifyCode').focus();
                }else{
                    $('.btn').removeAttr('disabled');
                    $('.oneBox').css({'display':'none'});
                    $('.twoBox').css({'display':'block'});
                }
            })
            //验证两次输入密码一致
            $('#checkPassword').on('blur',function(){
                let text = this.value;
                const $p = this.nextElementSibling;
                if(text == $('#password').val()){
                    $p.innerHTML = '密码正确';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '两次密码不一致';
                    $p.className = 'bg-danger';
                }
            })
            //点击切换第三个注册页面
            $('.btn-box').on('click',function(){
                if(!$('#checkPassword').val() || $('#checkPassword + p').hasClass('bg-danger')){
                    $('.btn-box').attr('disabled','disabled');
                }else{
                    $('.btn-box').removeAttr('disabled');
                    $('.oneBox').css({'display':'none'});
                    $('.twoBox').css({'display':'none'});
                    $('.threeBox').css({'display':'block'});
                }
            })
        },
        //获取验证码
        getIdentifyingCode(){
            verifyCode = new GVerify('v_container');
        },
    }
}())