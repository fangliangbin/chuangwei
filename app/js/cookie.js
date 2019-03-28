            // 获取cookie
            var str = document.cookie;
            var arr = str.split('; ');
            var obj = {};
            arr.forEach(x => {
            var _arr = x.split('=');
            obj[_arr[0]] = _arr[1];
            })
            // console.log(obj);
        if(document.cookie){
            $('.top-login').css({'display':'none'});
            $('.top-register').css({'display':'none'});
            $('.username').text(obj.user);
            $('.out').css({'display':'block'});
        }
        $('.username').on('click',function(){
            location.href = 'user.html'
        })
        $('.out').on('click',function(){
            $('.top-login').css({'display':'block'});
            $('.top-register').css({'display':'block'});
            $('.username').css({'display':'none'});
            $('.out').css({'display':'none'}); 
        })