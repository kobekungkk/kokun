define(['jquery','jquery-cookie','parabola'],function($,parabola){
  getTotal()
    function downloadDetail(){
        var url = location.search;
        var arr = url.split('?')
        var id = arr[1];
        // console.log(id);
        $.ajax({
            url:'../json/detail.json',
            success:function(res){
                var str = ``;
                // console.log(res);
                for(var i = 0;i<res.length;i++){
                    if(res[i].type == 'couple'){
                        if(id == res[i].code.trim()){
                            str += ` <div class="left" id=${res[i].id}>
                            <div class="small">
                              <img src="${res[i].url[0].one}" alt="">
                              <div class="mark"></div>
                            </div>
                            <div class="big">
                            <img src="${res[i].url[0].double}" alt="">
                            </div>
                          <div class="right">
                            <div class="intro">
                              <h2>${res[i].intro}</h2>
                              <div class="info">
                                <p><span>商品编码：</span>
                                  <span class="code">${res[i].code}</span><br></p>
                                <p><span>吊牌价:</span>
                                  <span class="preprice">${res[i].price+20}</span><br></p>
                              <p>  <span>销售价：</span>
                                <span class="price">${res[i].price}</span><br></p>
                              </div>
                              <div class="sc_goodsNum">
                                <div>
                                   我要买 <button class="add">+</button>
                                    <button class="reduce">-</button>
                                    商品数量：<span>1</span><br>
                                </div>
                            </div>
                              <div class="sc_goodsBtn buy">立即购买</div>
                              <div class="sc_goodsBtn dadd">加入购物车</div>
                           
                          </div>
                          </div>
                        </div>
                      </div>`
                        }
                    }else if(id == res[i].id){
                        str += ` <div class="left" id=${res[i].id}>
                        <div class="small">
                          <img src="${res[i].url}" alt="">
                          <div class="mark"></div>
                        </div>
                        <div class="big">
                        <img src="${res[i].url}" alt="">
                        </div>
                      <div class="right">
                        <div class="intro">
                          <h2>${res[i].intro}</h2>
                          <div class="info">
                            <p><span>商品编码：</span>
                              <span class="code">${res[i].code}</span><br></p>
                            <p><span>吊牌价:</span>
                              <span class="preprice">${res[i].price+20}</span><br></p>
                          <p>  <span>销售价：</span>
                            <span class="price">${res[i].price}</span><br></p>
                          </div>
                          <div class="sc_goodsNum">
                            <div>
                               我要买 <button class="add">+</button>
                                <button class="reduce">-</button>
                                商品数量：<span>1</span><br>
                            </div>
                        </div>
                          <div class="sc_goodsBtn buy">立即购买</div>
                          <div class="sc_goodsBtn dadd">加入购物车</div>
                      </div>
                      </div>
                    </div>
                  </div>`
                    }
                }
                // console.log(str);
                $('.detail').html(str)
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    function scale(){
    
      $(".detail").on('mouseenter','.small',function(){
        $(".mark").add(".big").show();
      }).on('mouseleave','.small',function(){
        $(".mark").add(".big").hide();
      }).on('mousemove','.small',function(ev){
        var l = ev.clientX - $(this).offset().left - 50;
        l = Math.max(l, 0);
        l = Math.min(200, l);
        var t = ev.clientY - $(this).offset().top - 50;
        t = Math.max(t, 0);
        t = Math.min(200, t);
      $(".mark").css({
        left: l,
        top: t
      })
      //放大的图片，反方向对应倍数移动
      $(".big img").css({
        left: -3 * l,
        top: -3 * t
      })
    })
    }
    // 商品详情页数量加减操作
    function btnClick(){
      downloadDetail()
      // console.log($('.detail').html());
      var i = 1;
      $('.detail').on('click','.sc_goodsNum .add',function(){
        i++;
        $(this).siblings('span').html(i)
        console.log(i);
      })
      $('.detail').on('click','.sc_goodsNum .reduce',function(){
          if(i>1){
            i--;
          }else if(i==1){
            i=1;
            $(this).siblings('span').attr('disabled')
          }
          console.log(i);
        $(this).siblings('span').html(i)
      })

    }
    //加入购物车操作
    function addShoppingCar(){
      downloadDetail()
      $('.detail').on('click','.dadd',function(){
        var id = $(this).parents('.left').attr('id'); //点击按钮的这个商品的id
        var number = Number($(this).siblings('.sc_goodsNum').children().find('span').html())
        console.log(number);
        //1、判定是否是第一次添加       
        var first = $.cookie("goods") == null ? true : false;
        if(first){
          var arr = [{id:id,num:number}];
          $.cookie("goods", JSON.stringify(arr), {
            expires: 7
          })
        }else{
          //不是第一次，判定之前是否添加过
          var same = false; //假设之前没添加过
          var cookieArr = JSON.parse($.cookie("goods"));
          console.log(cookieArr);
          for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id === id){
              cookieArr[i].num+=Number(number);
              same = true;
              break;
            }
          }
          if(!same){
            var obj = {id: id, num: Number(number)};
            cookieArr.push(obj);
          }

          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          })
        }
        $(this).siblings('.sc_goodsNum').children().find('span').html(1)
        getTotal()
        console.log($.cookie("goods"));
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
    // function ballMove(){
    //   downloadDetail()
    //     //显示小球，并且将小球移动到当前点击按钮的位置
    //     $("#ball").css({
    //       left: $('.add').offset().left,
    //       top: $('.add').offset().top,
    //       display: 'block'
    //     })

    //     //计算抛物线的偏移位置
    //     var offsetX = $(".sc_right .sc_pic").offset().left - $(node).offset().left;
    //     var offsetY = $(".sc_right .sc_pic").offset().top - $(node).offset().top;

    //     //声明一个抛物线对象
    //     var bool = new Parabola({
    //       el: "#ball",
    //       offset: [offsetX, offsetY],
    //       duration: 600,
    //       curvature: 0.001,
    //       callback: function(){
    //         $("#ball").hide();
    //       }
    //     })
    //     bool.start();
    //   }
    function downloadnav(){
      $.ajax({
          url:'../json/nav.json',
          success:function(res){
              var str = ``;
              for(var i = 0;i<res.length;i++){
                      str += ` 
                      <div class="navul" id="${i}">
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
                  }
                  $('.navbox').html(str)

          },
          error:function(err){
              console.log(err);
          }
      })
  }
  function navHover(){
      $('.nav .box li a').each(function(index,ele){
          $(ele).hover(function(){
              $('.navul').eq(index).show().siblings().hide()
              $(ele).css({
                  backgroundColor:'#d5d5d5'
              }).siblings().css({
                  backgroundColor:'balck'
              })
          },function(){
              $(ele).css({
                  backgroundColor:'black'
              })
              $('.navul').hide()
          })
      })
  }

    
    return{
        downloadDetail:downloadDetail,
        scale:scale,
        btnClick:btnClick,
        addShoppingCar:addShoppingCar,
        getTotal:getTotal,
        downloadnav:downloadnav,
        navHover:navHover
        // ballMove:ballMove
    }
})