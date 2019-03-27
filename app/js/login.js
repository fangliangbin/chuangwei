var login = (function(){

    return{
        init(){
            this.getIdentifyingCode();
            this.event();
        },
        event(){
            const self = this;
            //点击切换验证码
            $('.identCodeRightTxt').on('click',function(){
                self.getIdentifyingCode();
            })
            //验证验证码
            $('.inputBox').on('blur',function(){
                let text = this.value;
                var res = verifyCode.validate(text);
                const $p = this.nextElementSibling;
                if(res){
                    $p.innerHTML = '验证成功';
                    $p.className = 'bg-success';
                }else{
                    $p.innerHTML = '验证码错误';
                    $p.className = 'bg-danger';
                    $('.inputBox').select();
                    return false;
                }
            })
            //点击登录按钮跳转到首页
            $('.btn').on('click',function(){
                if(!$('.inp1').val()){
                    alert('账号不能为空')
                    $('.inp1').select();
                    return false;
                }if(!$('.inp2').val()){
                    alert('密码不能为空')
                    $('.inp2').select();
                    return false;
                }if(!$('.inputBox').val()){
                    alert('验证码不能为空')
                    return false;
                }
                var obj = {
                    phone:$('.inp1').val(),
                    password:$('.inp2').val()
                }
                sendAjax('../server/login.php',{
                    method:'POST',
                    data:obj
                })
                .then(data => {
                    location.href = 'index.html';
                })
                .then(data =>{},data =>{
                    alert(data.msg);
                })
            })
        },
        //获取验证码
        getIdentifyingCode(){
            verifyCode = new GVerify('v_container');
        },
        
    }
}())