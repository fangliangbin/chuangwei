var shopRend = (function(){
    var $box,shopData
    return{
        init(){
            $box = $('.order_content');
            $shopDel = $('.opBtn');
            this.getCarData();
            this.event();
        },
        event(){
            var _this = this ;
            $shopDel.on('click','.dialog-sure',function() {
                var self = $(this);
                // 获取点击按钮的索引
                var index = self.index('.dialog-sure');
                shopData.splice(index, 1);
                // 删除对应dom, 重新渲染
                _this.insertData(shopData);
                // 修改本地数据
                _this.setCarData();

            })
        },
        getCarData() {
            var data = localStorage.shopList || '[]';
            this.insertData(JSON.parse(data));
        },
        setCarData() {
            localStorage.shopList = JSON.stringify(shopData);
        },
        insertData(data) {
            $box.html('');
            shopData = data;
            data.forEach(x => {
                var htmlTemplate = `
                <ul class="order_lists data-id= '${x.id}'">
                        <li class="list_chk">
                            <input type="checkbox" id="checkbox_3" class="son_check">
                            <label for="checkbox_3"></label>
                        </li>
                        <li class="list_con">
                            <div class="list_img">
                                <img src="${x.img}" alt="">
                            </div>
                            <div class="list_text">
                                <p>${x.title}</p><span>${x.author}</span>
                            </div>
                        </li>
                        <li class="list_price">
                            <p class="price">${x.price}</p>
                            <s>${x.price}</s>
                        </li>
                        <li class="list_amount">
                            <div class="amount_box">
                                <a href="javascript:;" class="reduce reSty">-</a>
                                <input type="text" value="${x.count}" class="sum">
                                <a href="javascript:;" class="plus">+</a>
                            </div>
                        </li>
                        <li class="list_sum">
                            <p class="sum_price">${x.price}</p>
                        </li>
                        <li class="list_op">
                            <p class="del"><a href="javascript:;" class="delbtn">移除商品</a></p>
                        </li>
                    </ul>`
                $box.append(htmlTemplate);
            })
        }
    }
}())
shopRend.init();