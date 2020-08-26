define(['jquery','jquery-cookie'],function($){
    selectAll()
    getTotal()
    function downloadInfo(){
        $.ajax({
            url:'../json/detail.json',
            success:function(res){
                // console.log(res);
                var cookieArr = JSON.parse($.cookie('goods'))
                console.log(cookieArr);
                var newArr = []
                for(var i = 0; i < cookieArr.length; i++){
                  for(var j = 0; j < res.length; j++){
                    if(res[j].id == cookieArr[i].id){
                      res[j].num = cookieArr[i].num;
                      newArr.push(res[j]);
                      break;
                    }
                  }
                }
                // console.log(newArr);
                var str1 = ``;
                for(var i = 0;i<newArr.length;i++){
                    str1 += `<ul id=${newArr[i].id}>
                    <li class="winput">
                      <input type="checkbox">
                    </li>
                    <li class="winfo">
                      <img src="${newArr[i].url[0].one?newArr[i].url[0].one:newArr[i].url}" alt="">
                      <span>${newArr[i].intro}</span>
                    </li>
                    <li class="wgg"><span>${newArr[i].intro}</span></li>
                    <li class="wprice"><span>￥${newArr[i].price}</span></li>
                    <li class="wnum"> <div class="sc_goodsNum">
                      <div>
                          <button class="wadd">+</button>
                          <span class="num">${newArr[i].num}</span>
                          <button class="wreduce">-</button>
                      </div>
                  </div></span></li>
                    <li class="wyh"><span>￥0.00</span></li>
                    <li class="wtotal"><span>￥${newArr[i].price*newArr[i].num}</span></li>
                    <li class="woprate"><a href="">删除</a></li>
                  </ul>`
                }
                $('.wcontent').html(str1)
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    $('.shopcar').click(function(){
        return false;
    })
    //实现全选单选按钮
    function selectAll(){
        $('.wtop .wtopli input').change(function(){
            $('.winput>input').prop('checked',$(this).prop('checked'))
            if($(this).prop('checked')){
                var total = 0;
            $('.winput input:checked').each(function(index,ele){
                 total += Number($(ele).closest('li').siblings('.wtotal').children('span').html().split('￥')[1])
            })
            $('.tototal .toNum').html('￥'+total)
            }else{
                $('.tototal .toNum').html('￥'+0.00)
            }
        })
        $('.wcontent').on('change','.winput input',function(){
            if($('.winput input:checked').length == $('.winput input').length){
                $('.wtopli input').prop('checked',true)
            }else{
                $('.wtopli input').prop('checked',false)
            }
            var total = 0;
            $('.winput input:checked').each(function(index,ele){
                 total += Number($(ele).closest('li').siblings('.wtotal').children('span').html().split('￥')[1])
            })
            $('.tototal .toNum').html('￥'+total)
            console.log(total);
            
        })  
    }
    // 删除li
    // 记得引入详情页获取购物车总数的函数
    function removeLi(){
        $('.wcontent').on('click','.woprate a',function(){
            // 实现页面删除
            var index = $(this).parents('ul').remove().attr('id');
            console.log(index);
            //实现cookie删除
            var arr = JSON.parse($.cookie('goods'));
            for(var i = 0;i<arr.length;i++){
                if(index == arr[i].id){
                    arr.splice(i,1)
                }
            }
            console.log(arr);
            $.cookie('goods',JSON.stringify(arr),{
                expires:7
            })
            downloadInfo()
            getTotal()
        })
       
        return false;
    }
    //使用事件委托实现按钮加减
    function addReduce(){
        $('.wcontent').on('click','.sc_goodsNum .wadd',function(){
            // $('winput input').prop('checked',false)
            // $('.wtop .wtopli input').prop('checked',false)
            var num = Number($(this).siblings('.num').html());
            console.log($(this).siblings().find('.num'));
            console.log(num);
            num++;
            var index = $(this).parents('.wnum').closest('ul').attr('id');
            var arr = JSON.parse($.cookie('goods'));
            for(var i = 0;i<arr.length;i++){
                if(index == arr[i].id){
                    arr[i].num++
                }
            }
            $.cookie('goods',JSON.stringify(arr))
            selectAll()
            getTotal()
            downloadInfo()

        })
        $('.wcontent').on('click','.sc_goodsNum .wreduce',function(){
            // $('winput input').prop('checked',false)
            // $('.wtop .wtopli input').prop('checked',false)
            var num = $(this).siblings().find('.num').html();
            num--;
            var index = $(this).parents('.wnum').closest('ul').attr('id');
            var arr = JSON.parse($.cookie('goods'));
            for(var i = 0;i<arr.length;i++){
                if(index == arr[i].id){
                    arr[i].num == 1?arr[i].num ==1:arr[i].num--
                }
            }
            $.cookie('goods',JSON.stringify(arr))
            selectAll()
            getTotal()
            downloadInfo()

        })
    }
    function getTotal(){
        var total = 0;
        var arr = JSON.parse($.cookie('goods'));
        if(!arr){
            console.log(11);
            $('.shopcar .num').html((0))
        }else{
            for(var i = 0;i < arr.length;i++){
                total += Number(arr[i].num)
                $('.shopcar .num').html(total)
              }
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
        downloadInfo:downloadInfo,
        selectAll:selectAll,
        removeLi:removeLi,
        getTotal:getTotal,
        addReduce:addReduce,
        downloadnav:downloadnav,
        navHover:navHover
    }
})