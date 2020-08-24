define(['jquery','jquery-cookie'],function($){
  
    // if(location.search){
    //     var page = Number(location.search.split('?')[1]);
    // }
    function downloadData(){
        var page = 1;
        $.ajax({
            url:'../json/detail.json',
            success:function(res){
                var arr = res;
                var limit = 10;
                var totalNum = res.length;
                var pages = Math.ceil(totalNum/limit)
                var str1 = ``;
                for(var i = 0;i<pages;i++){
                    str1 += ` <li><a href="#" class="aaa">${i+1}</a></li>`
                }
                $('.pagination').html(str1)
                var str2 = ``;
                for(var i = 0;i<10;i++){
                    str2 += ` <li>
                    <a href = "detail.html?${arr[i].id}" ><img src="${arr[i].url[0].one?arr[i].url[0].one:arr[i].url}"alt=""></a><br/>
                    <div class="bottom">
                      <span>${arr[i].intro}</span><br/><br/>
                      <span>￥${arr[i].price}</span>
                    </div>
                  </li>`
                }
                $('.sweetman>ul').html(str2)
                }
            ,
            error:function(err){
                console.log(err);
            }
        })
    }
    var page = 1;
    var limit = 10;
    var pages = 1;
    function addPage(){
        // downloadData()
        $('.pagination').on('click','.aaa',function(){
            $(this).addClass('active').closest('li').siblings().children('a').removeClass('ative')
            // console.log(1);
            // console.log(pages);
            page = $(this).html()
           getPage()
            return false;
        })
        function getPage(){
            var border ;
            var start = (page-1)*limit;
            console.log(page);
            $.ajax({
                url:'../json/detail.json',
                success:function(res){
                    var arr = res;
                    console.log(arr);
                    var totalNum = arr.length;
                    pages = Math.ceil(totalNum / limit)
                    if(page == pages){
                        border = totalNum - (page-1)*limit + (page-1)*limit;
                    }else{
                        border = page*10;
                    }
                    if(page <= 1){
                        $('.previous ').addClass('disabled')
                    }else{
                        $('.previous ').removeClass('disabled')
                    }
                    if(page >= pages){
                        $('.next').addClass('disabled')
                    }else{
                        $('.next').removeClass('disabled')
                    }
                    var str2 = ``;
                    console.log(start,border);
                    for(var i = start;i<border;i++){
                        str2 += ` <li>
                        <a href = "detail.html?${arr[i].id}" ><img src="${arr[i].url[0].one?arr[i].url[0].one:arr[i].url}"alt=""></a><br/>
                        <div class="bottom">
                          <span>${arr[i].intro}</span><br/><br/>
                          <span>￥${arr[i].price}</span>
                        </div>
                      </li>`
                    }
                    $('.sweetman>ul').html(str2)
                },
                error:function(err){
                    console.log(err);
                }
            })
        }
      $('.previous a').click(function(){
            page--;
            getPage()
            return false;
        })
        $('.next a').click(function(){
            page++;
            getPage()
            return false;
        })
    }
    function getTotal(){
        var total = 0;
        var arr = JSON.parse($.cookie('goods'));
        if(arr){
          for(var i = 0;i < arr.length;i++){
            total += Number(arr[i].num)
            $('.shopcar .num').html(total)
          }
        
        }
        else{
          $('.shopcar .num').html((0))
        }
      }
    return{
        downloadData:downloadData,
        addPage:addPage,
        getTotal:getTotal
    
    }
})