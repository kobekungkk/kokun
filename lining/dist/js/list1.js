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
                    str1 += ` <li><a href="#" class="aaa ${i==0?'active':''}">${i+1}</a></li>`
                }
                $('.pagination').html(str1)
                var str2 = ``;
                for(var i = 0;i<10;i++){
                    str2 += ` <li>
                    <a href = "detail.html?${arr[i].id}" target="_blank" ><img src="${arr[i].url[0].one?arr[i].url[0].one:arr[i].url}"alt=""></a><br/>
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
            $(this).addClass('active').closest('li').siblings().children('a').removeClass('active')
            // console.log(1);
            // console.log(pages);
            page = $(this).html()
           getPage()
            return false;
        })
        function getPage(){
            var border ;
            var start ;
            $.ajax({
                url:'../json/detail.json',
                success:function(res){
                    var arr = res;
                    console.log(arr);
                    var totalNum = arr.length;
                    pages = Math.ceil(totalNum / limit)
                    if(page <1){
                        page++;
                        
                    }else{
                        
                    }
                    if(page > pages){
                        page--;
                       
                    }else{
                       
                    }
                    if(page==1){
                        $('.previous ').addClass('disabled')
                    }else{
                        $('.previous ').removeClass('disabled')
                    }
                    if(page==pages){
                        $('.next').addClass('disabled')
                    }else{
                        $('.next').removeClass('disabled')
                    }
                 
                    var str2 = ``;
                    start = (page-1)*limit;
                    if(page == pages){
                        border = totalNum - (page-1)*limit + (page-1)*limit;
                    }else{
                        border = page*10;
                    }
                    console.log(page);
                    console.log(start,border);
                    $('.aaa').each(function(index,ele){
                        if(index == page-1){
                            $(ele).addClass('active').closest('li').siblings().children('a').removeClass('active')
                        }
                    })
                    for(var i = start;i<border;i++){
                        if(start<20){
                            str2 += ` <li>
                            <a href = "detail.html?${arr[i].id}" target="_blank"><img src="${arr[i].url[0].one?arr[i].url[0].one:arr[i].url}"alt=""></a><br/>
                            <div class="bottom">
                              <span>${arr[i].intro}</span><br/><br/>
                              <span>￥${arr[i].price}</span>
                            </div>
                          </li>`
                        }else{
                            str2 += ` <li>
                            <a href = "detail.html?${arr[i].code}" target="_blank"><img src="${arr[i].url[0].one?arr[i].url[0].one:arr[i].url}"alt=""></a><br/>
                            <div class="bottom">
                              <span>${arr[i].intro}</span><br/><br/>
                              <span>￥${arr[i].price}</span>
                            </div>
                          </li>`
                        }
                     
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
      function downloadnav(){
        $.ajax({
            url:'../json/nav.json',
            success:function(res){
                var str = ``;
                for(var i = 0;i<res.length;i++){
                        str = ` 
                        <div class="navul">
                        <ul>
                        <li>${res[i].title[0]}</li>
                        <li><a href="">${res[i].content[0]}</a></li>
                        <li><a href="">${res[i].content[1]}</a></li>
                        <li><a href="">${res[i].content[2]}</a></li>
                        <li><a href="">${res[i].content[3]}</a></li>
                        <li><a href="">${res[i].content[4]}</a></li>
                        <li><a href="">${res[i].content[5]}</a></li>
                        <li><a href="">${res[i].content[6]}</a></li>
                      </ul>
                      <ul>
                      <li>${res[i].title[1]}</li>
                      <li><a href="">${res[i].content[7]}</a></li>
                      <li><a href="">${res[i].content[8]}</a></li>
                      <li><a href="">${res[i].content[9]}</a></li>
                      <li><a href="">${res[i].content[10]}</a></li>
                      <li><a href="">${res[i].content[11]}</a></li>
                      <li><a href="">${res[i].content[12]}</a></li>
                      <li><a href="">${res[i].content[13]}</a></li>
                      <li><a href="">${res[i].content[14]}</a></li>
                      <li><a href="">${res[i].content[15]}</a></li>
                      <li><a href="">${res[i].content[16]}</a></li>
                      </ul>
                      </div>`
                      $('.navbox').eq(i).html(str)
                    }
                    

            },
            error:function(err){
                console.log(err);
            }
        })
    }
    function navHover(){
        $('.nav .box li').each(function(index,ele){
            $(ele).hover(function(){
                $('.navbox').hide()
                $(this).children('.navbox').show()
                $(ele).css({
                    backgroundColor:'#d5d5d5'
                }).siblings().css({
                    backgroundColor:'balck'
                })
            }
            ,
            function(){
                $(ele).css({
                    backgroundColor:'black'
                })
                $(this).children('.navbox').hide()
            }
            )
           
      
        })
        $('.nav').on('mouseenter','.navbox .navul ul li a',function(){
            $(this).css({
                color:'red'
            })
        })
        $('.nav').on('mouseleave','.navbox .navul ul li a',function(){
            $(this).css({
                color:'black'
            })
        })


    }
    return{
        downloadData:downloadData,
        addPage:addPage,
        getTotal:getTotal,
        downloadnav:downloadnav,
        navHover:navHover
    
    }
})