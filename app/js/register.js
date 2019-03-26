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
                    $('#verifyCodeInput').select();
                    return false;
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
                    $('.verifyCodeBtn').removeAttr('disabled');

                }else{
                    $p.innerHTML = '手机号有误';
                    $p.className = 'bg-danger';
                    $('#checkPhone').select();
                    return false;
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
            //验证手机验证码
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
                if(!$('#verifyCodeInput').val()){
                    alert('验证码不能为空')
                    $('#verifyCodeInput').select();
                    return false;
                }if(!$('#checkPhone').val()){
                    alert('手机号不能为空')
                    $('#checkPhone').select();
                    return false;
                }if(!$('#phoneVerifyCode').val()){
                    alert('手机验证码不能为空')
                    $('#phoneVerifyCode').select();
                    return false;
                }
                $('.oneBox').css({'display':'none'});
                $('.twoBox').css({'display':'block'});
            })
            //验证密码格式
            $('#password').on('blur',function(){
                let text = this.value;
                const $p = this.nextElementSibling;
                const reg = /^[a-z0-9_-]{6,18}$/;
                if(reg.test(text)){
                    $p.innerHTML = '密码格式正确';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '密码格式有误';
                    $p.className = 'bg-danger';
                    $('#password').select();
                    return false;
                }
            })
            //验证两次输入密码一致
            $('#checkPassword').on('blur',function(){
                let text = this.value;
                const $p = this.nextElementSibling;
                if(text == $('#password').val()){
                    $p.innerHTML = '密码一致';
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
            $('.login').on('click',function(){
                var obj = {
                    phone:$('#checkPhone').val(),
                    password:$('#password').val()
                }
                sendAjax('../server/register.php',{
                    method:'POST',
                    data:obj
                })
                .then(data => {
                  console.log('成功了');
                  location.href = 'login.html';
                })
                .then(data => {},data => {
                    console.log('失败了');
                    alert(data.msg)
                })
            })
        },
        //获取验证码
        getIdentifyingCode(){
            verifyCode = new GVerify('v_container');
        },
    }
}())