var shopCar = (function(){
    var $boxImport,shopData
    return {
        init(){
            $boxImport = $('.boxImport');
            this.event();
        },
        event(){
            var _this = this;
            var url = window.location.href;
            url = url.split("?")[1].split("=")[1];
            shop.forEach(x => {
                for(var attr in x){
                   if(x.id == url){
                        this.insertData(x);
                        return
                   }
                }
            })
            $('.options').on('click','.left_btn',function(){
                var self = $(this);
                var index = self.index('.left_btn');
                // 获取数量
                var val = self.parent().prev('.list_con').find('.list_num').find('input').val() - 0;
                shopData.count = val;
                _this.setCarData(shopData);
            })
        },
        setCarData(data){
            let shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            var flag = true;
            for(var i = 0;i < shopList.length;i++){
                if(shopList[i].id == data.id) {
                    // 数据已存在,  相当于count进行累加
                    shopList[i].count += data.count;
                    flag = false;
                    break;
                }
            }
            if(flag){
                // 把数据添加到数组中
                shopList.push(data);
            }
            localStorage.shopList = JSON.stringify(shopList);
        },
        insertData(data){
            shopData = data ;
            var shopHtml = `<div class="mainLeft">
            <div class="imgBox">
                <!-- 中图 -->
                <img class="contImg" src="${data.img}" alt="">
                <span class="filter"></span>
                <!-- 大图 -->
                <div class="showBigImage">
                    <img src="${data.img}" alt="" id="big-image">
                </div>
            </div>
            <!-- 底部小图 -->
            <div class="imgFoot">
                <div class="leftBtn"><</div>
                <div class="rightBtn">></div>
                <div class="showImg">
                    <ul class="img-box">
                        <li class="fristLi mark">
                            <img src="${data.img}" alt="">
                        </li>
                        <li>
                            <img src="images/detailsF2.jpg" alt="">
                        </li>
                        <li>
                            <img src="images/detailsF3.jpg" alt="">
                        </li>
                        <li>
                            <img src="images/detailsF4.jpg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mainRight">
            <!-- 放大镜右边 -->
            <ul class="list_con clear_fix">
                <li class="list_text">
                    <h3>${data.title}</h3>
                    <em>${data.author}</em>
                    <b>全面屏|蓝光护眼 |人工智能控制|全面屏|蓝光护眼|人工智能控制</b>
                </li>
                <li class="list_price">
                    <p>售价:</p><span>${data.price}</span>
                </li>
                <li class="list_freight">
                    <p>运费</p><span>全场包邮</span>
                </li>
                <li class="list_edition">
                    <p>版本</p><span>创维电视</span>
                </li>
                <li class="list_num">
                    <p>数量</p>
                    <div class="amount_box">
                        <a href="javascript:;" class="reduce reSty">-</a>
                        <input type="text" value="1" class="sum">
                        <a href="javascript:;" class="plus">+</a>
                    </div>
                </li>
                <li class="list_serves">
                    <p>服务</p><span>由<a href="">创维冰洗</a>发货，并提供售后服务</span>
                </li>
            </ul>
            <div class="options">
                <a href="CWshopcar.html" class="left_btn"><em>加入购物车</em></a>
                <div class="right_btn"><em> 立即购买</em></div>
            </div>
        </div>
    </div>`
       $boxImport.append(shopHtml) ;
        }
    }





}())
shopCar.init()