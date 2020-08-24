define(['jquery','jquery-cookie'],function($){
    function downloadData(){
        $.ajax({
            url:'../json/detail.json',
            success:function(res){
                var arr = res;
                var str1 = ``;
                for(var i = 0;i<arr.length;i++){
                    str1 += ` <li>
                    <a href = "detail.html?${arr[i].id}" id=${arr[i].id}><img src="${arr[i].url[0].one?arr[i].url[0].double:arr[i].url}"alt=""></a><br/>
                    <div class="bottom">
                      <span>${arr[i].intro}</span><br/><br/>
                      <span>￥${arr[i].price}</span>
                    </div>
                  </li>`
                }
                console.log(str1);
                $('.sweetman>ul').html(str1);
                
                }
              
            ,
            error:function(err){
                console.log(err);
            }
        })
    }
    return{
        downloadData:downloadData
    }
})