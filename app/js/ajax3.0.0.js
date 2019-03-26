var sendAjax = function(url,options){
    var __DEFAULT = {
        method:'GET',
        //约定返回的格式是json字符串
        dataType:'json',
        data:null,
        //传进来的值会覆盖默认值
        ...options
    }
    var xhr = new XMLHttpRequest();
    __DEFAULT.method = __DEFAULT.method.toUpperCase();
    if(__DEFAULT.method == 'GET'){
        for(var attr in __DEFAULT.data){
            url += `&${attr}=${__DEFAULT.data[attr]}`;
        }
        if(!url.includes('?')){
            url = url.replace('&','?');
        }
        __DEFAULT.data = null;
    }else{
        //传输格式是json字符串格式
        __DEFAULT.data = JSON.stringify(__DEFAULT.data);
    }
    xhr.open(__DEFAULT.method,url,true);
    xhr.send(__DEFAULT.data);
    
    return new Promise((res,rej) => {   //Promise对象是异步编程的一种解决方案，接受一个函数为参数，这个函数接受两个参数resolve、reject
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var data = xhr.responseText;//服务器传回来的值
                if(xhr.status == 200){
                    if(__DEFAULT.dataType === 'json'){
                        data = JSON.parse(data);
                    }
                    res(data);
                }else{
                    rej(data);
                }
            }
        }
    })

}