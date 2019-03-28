var common = (function(){
    var shopData,$box,$shopdel,$bigBox,$smallBox
    return{
        init(){
            $bigBox = $('.search_right');
            $smallBox = $('.shop-car-bottom');
            $box = $('.showImgBox');
            $shopdel = $('.form_del');
            this.getCarData();
            console.log(localStorage.shopList)
            this.event();
        },
        event(){
            var _this = this;
            $box.on('click','.form_del',function() {
                var self = $(this);
                // 获取点击按钮的索引
                var index = self.index('.form_del');
                console.log(index);
                shopData.splice(index, 1);
                // 删除对应dom, 重新渲染
                _this.insertData(shopData);
                // 修改本地数据
                _this.setCarData();
                
            })
        },
        setCarData() {
            localStorage.shopList = JSON.stringify(shopData);
        },
        getCarData() {
            var data = localStorage.shopList || '[]';
            this.insertData(JSON.parse(data));
            this.setCount(JSON.parse(data));
        },
        setCount(data){
            console.log(data)
            var sum = 0 ;
            var allPrice = 0 ;
            for(var i = 0;i < data.length;i++){
                sum += (data[i].count);
                allPrice += ((data[i].count) * (data[i].price.substring(1) - 0));
            }
            $smallBox.html('');
            var htmlTemplateLast = `
                <span>共${sum}件商品</span>
                <span>总计￥${allPrice}</span>
                <a href="CWshopcar.html">去购物车</a>
                `
                $smallBox.append(htmlTemplateLast);
        },
        insertData(data) {
            $box.html('');
            console.log(1)
            shopData = data;
            var htmlTemp = `
                <span>${data.length}</span>
                `
                $bigBox.append(htmlTemp);
            data.forEach(x => {
                var htmlTemplate = `
                <div class="shop_form">
                    <div class="form_left data-id= '${x.id}'">
                        <img src="${x.img}" alt="">
                    </div>
                    <div class="form_center">
                        <h3>${x.title}</h3>
                        <p>${x.author}</p>
                        <span>${x.price}</span>
                    </div>
                    <div class="form_right">
                        <div class="form_del iconfont iconcha"></div>
                        <div class="form_sum">X${x.count}</div>
                </div>
                </div>
                `
                $box.append(htmlTemplate);
            })
        }
    }
}())
common.init();