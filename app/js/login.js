var login = (function(){

    return{
        init(){
            this.getIdentifyingCode();
            this.event();
        },
        event(){
            const self = this;
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
                    console.log('成功了');
                    location.href = 'http://localhost:7777/1814/chuangwei/dist/index.html';
                })
                .then(data =>{},data =>{
                    console.log('失败了');
                })
            })
        },
        getIdentifyingCode(){
            verifyCode = new GVerify('v_container');
        },
        
    }
}())