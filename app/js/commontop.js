if(localStorage.name){
    $('.top-login').css({'display':'none'});
    $('.top-register').css({'display':'none'});
    $('.username').text(localStorage.name);
    $('.out').css({'display':'block'});
}
$('.username').on('click',function(){
    location.href = 'user.html'
})