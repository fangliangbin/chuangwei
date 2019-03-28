var search = (function(){
    // let $box,$inp,$btn,$tips,$timer;
    let $timer;

    return {
        init(){
            //获取所需的dom元素
            // $box = document.querySelector('.box');
            // $inp = $box.querySelector('.inp');
            // $tips = $box.querySelector('.tips');
            // console.log($box,$inp,$tips);
            this.event();

        },
        event(){
            const self = this;
            //获取焦点，下拉框展示
            $('.sou').focusin(function(){
                self.tips_show();
            })

            // $inp.onfocus = function(){ //获取焦点，下拉框展示
            //     self.tips_show();
            // }

            //点击阻止浏览器默认事件
            $('.sou').on('click',function(e){//点击搜索框时，阻止下拉框隐藏
                e.stopPropagation();
            })
            
            // $inp.onclick = function(e){//点击搜索框时，阻止下拉框隐藏
            //     e.stopPropagation();
            // }

            //文本框变化获取新的搜索值
            $('.sou').on('input',function(){
                if($(this).val().trim() == ''){ //去除前后空格，并为空，下拉框隐藏
                    self.tips_hidden;
                }else{
                    clearTimeout($timer);  // 清除延时器，搜索框内的值变化的快，就不会向百度发送http请求
                    $timer = setTimeout(_ => {   // 尽量减少http请求
                        self.getData($('.sou').val());
                        // val = $('.sou').val();
                        self.tips_show();
                    },500)
                }
            })

            // $inp.oninput = function(){  //先判断是否为空
            //     if(this.value.trim() == ''){ //去除前后空格，并为空，下拉框隐藏
            //         self.tips_hidden;
            //     }else{
            //         clearTimeout($timer);  // 清除延时器，搜索框内的值变化的快，就不会向百度发送http请求
            //         $timer = setTimeout(_ => {   // 尽量减少http请求
            //             self.getData($inp.value);
            //             self.tips_show();
            //         },500)
            //     }
            // }

            //本意是文本框失去焦点，下拉框隐藏，相当于点击document，隐藏下拉框，但必须配合第二个事件
            document.onclick = function(){
                self.tips_hidden();
            }

            //点击下拉框中的li，替换搜索框中的文本
            $('.tips').on('click','li',function(){
                    $('.sou').val($(this).text());

            })
            //鼠标移入改变背景
            $('.tips').on('mouseenter','li',function(){
                $(this).addClass('active').siblings().removeClass('active');
            })
            // $tips.onclick = function(e){  //点击下拉框里的内容，会出现在搜索框内，采用事件委托
            //      e = e || window.event;
            //      const target = e.target || e.srcElement;
            //      if(e.target.nodeName === 'LI'){
            //          $inp.value = e.target.innerHTML;
            //      }
            // }
        },


        //展示下拉框
        tips_show(){
            if($('.sou').val().trim() != ''){
                $('.tips').css({'display':'block'});
            }
            // if($inp.value.trim() != ''){  //先判断是否为空，不为空才显示
            //     $tips.style.display = 'block';
            // }
        },
        //隐藏下拉框
        tips_hidden(){
            //   $tips.style.display = 'none';
              $('.tips').css({'display':'none'});
        },
        //向百度获取数据
        getData(val){
            const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
            const data = {
                wd:val,
                cb:"search.insertData"
            }
            sendJsonp(url,data);
        },
        //将获取到的数据渲染到下拉列表里
        insertData(data){
            $('.tips').text('');
            // $tips.innerHTML = '';
            data.s.forEach(x => {
                const $li = document.createElement('li');
                $li.innerHTML = x;
                $('.tips').append($li);
            });
        }
    }
}());

search.init();

$('.search-btn').on('click',function(){
    if($('.sou').val() == ''){
        alert('搜索条件不为空');
        $('.sou').select();
        return false;
    }
    location.href = 'search.html';
})