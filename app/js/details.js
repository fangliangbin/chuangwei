$(function () {
    // 鼠标滑入显示
    $('.imgBox').on('mouseenter', function (e) {
        const self = $(this);
        self.find('.filter').css('display', 'block');
        self.find('.showBigImage').css('display', 'block');
    })
    // 鼠标移动
    $('.imgBox').on('mousemove', function (e) {
        const self = $(this);
        let X = e.pageX - self.find('.filter')[0].offsetWidth / 2 - self[0].offsetLeft;
        let Y = e.pageY - self.find('.filter')[0].offsetHeight / 2 - self[0].offsetTop;
        let maxX = self[0].offsetWidth - self.find('.filter')[0].offsetWidth;
        let maxY = self[0].offsetHeight - self.find('.filter')[0].offsetHeight;
        if (X < 0) {
            X = 0;
        } else if (X > maxX) {
            X = maxX;
        }
        if (Y < 0) {
            Y = 0;
        } else if (Y > maxY) {
            Y = maxY;
        }
        self.find('.filter').css('left', X + 'px');
        self.find('.filter').css('top', Y + 'px');

        self.find('.showBigImage').find('img').css('left', -2 * X + 'px');
        self.find('.showBigImage').find('img').css('top', -2 * Y + 'px');
    })



    // 鼠标离开
    $('.imgBox').on('mouseleave', function (e) {
        const self = $(this);
        self.find('.filter').css('display', 'none');
        self.find('.showBigImage').css('display', 'none');
    })




    // 鼠标滑过切换图片
    $('.img-box').on('mouseenter','li',function () {
        $(this).parent().find('li').css('border-color','black');
        $(this).css('border-color','red');
        const imgSrc = $(this).parent().parent().parent().prev().find('img');
        const bigImgSrc = $(this).parent().parent().parent().prev().find('.showBigImage').find('img');
        const newImg = $(this).find('img').attr('src') ;
        imgSrc.attr('src',newImg);
        bigImgSrc.attr('src',newImg);
    })
    $('.imgFoot').on('click','.leftBtn',function(){
        $(this).next('.img-box').find('li').remove('')
    })
    $('.amount_box').on('click','.reduce',function(){
        var $count = parseInt($(this).next('input').val()) ;
        $count--;
        if($count <= 1){
            $count = 1;
        }
        $(this).next('input').val($count) ;
    })
    $('.amount_box').on('click','.plus',function(){
        var $count = parseInt($(this).prev('input').val()) ;
        $count++;
        console.log($count)
        if($count >= 100){
            $count = 100;
        }
        $(this).prev('input').val($count) ;
    })
    $('.sum').keyup(function(){
        var $count = parseInt($(this).val());
            if($(this).val() == ''){
                $(this).val('1');
            }
        console.log($count);
        if($count >= 100){
            $count = 100 ;
        }
        if($count <= 1){
            $count = 1 ;
        }
        $(this).val($count) ;
    })

})