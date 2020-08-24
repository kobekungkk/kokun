define(['jquery','jquery-cookie'],function($){
    getTotal()
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
        function lunbo(){
            const oBanner = document.querySelector(".banner");
            const oImgBox = document.querySelector(".banner ul");
            const imgs = document.querySelectorAll('.banner ul li a img')
            const aLeftRightBtns = document.querySelectorAll(".banner a");
            for(var i = 0;i<imgs.length;i++){
                imgs[i].onclick = function(){
                    return false;
                }
            }
            let iNow = 1; //代表当前显示的图片的下标。
            let timer = null;
            let isRuning = false; //代表正在动画
            //给整个banner图效果，添加移入
            oBanner.onmouseenter = function () {
            clearInterval(timer);
            };
            oBanner.onmouseleave = function () {
               
            timer = setInterval(function () {
                if (!isRuning) {
                isRuning = true; //动画开始
                } else {
                return;
                }
                iNow++;
                tab();
            }, 2000);
            };

            //给左右按钮添加点击
            aLeftRightBtns[0].onclick = function () {
            if (!isRuning) {
                isRuning = true; //动画开始
            } else {
                return;
            }
            iNow--;
            tab();
            return false;
            };

            aLeftRightBtns[1].onclick = function () {
               
            if (!isRuning) {
                isRuning = true; //动画开始
            } else {
                return;
            }
            iNow++;
            tab();
            return false;
            };

            //启动自动轮播
            timer = setInterval(function () {
            if (!isRuning) {
                isRuning = true; //动画开始
            } else {
                return;
            }
            iNow++;
            tab();
            }, 2000);

            function tab() {
            startMove(oImgBox, { left: -1519 * iNow }, function () {
                //最后一张图片显示完毕以后，我们需要切回1这个图片
                if (iNow == 5){
                iNow = 1;
                oImgBox.style.left = "-1519px";
                } else if (iNow == 0) {
                iNow = 4;
                oImgBox.style.left = iNow * -1519 + "px";
                }
                isRuning = false; //动画结束
            });
            // document.title = iNow;
            }
        };

        //多物体多样式的运动   startMove(this, "width", 300);
    function startMove(node, cssObj, complete){ //complete = show;
        clearInterval(node.timer);
        node.timer = setInterval(function(){
            
            var isEnd = true; //假设所有动画都都到达目的值

            for(var attr in cssObj){
                //取出当前css样式的目的值
                var iTarget = cssObj[attr];
                //1、获取当前值
                var iCur = null;

                if(attr == "opacity"){
                    iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
                }else{
                    iCur = parseInt(getStyle(node, attr))
                }
                //2、计算速度
                var speed = (iTarget - iCur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if(attr == "opacity"){
                    iCur += speed;
                    node.style.opacity = iCur / 100;
                    node.style.filter = `alpha(opacity=${iCur})`;

                }else{
                    node.style[attr] = iCur + speed + 'px';
                }
                
                //当前值是否瞪目目的值
                if(iCur != iTarget){
                    isEnd = false;
                }
            }
            

            if(isEnd){
                //说明都到达目的值
                clearInterval(node.timer);
            
                if(complete){
                    complete.call(node);
                }
            }
        }, 30);
    }

/*
    node  元素节点
    cssStyle  获取css样式类型
*/
    function getStyle(node, cssStyle){
        if(node.currentStyle){
            return node.currentStyle[cssStyle];
        }else{
            return getComputedStyle(node)[cssStyle];
        }
    }
    //获取json数据华晨宇
    function downlodahcy(){
        $.ajax({
            url:'../json/hcy.json',
            success:function(res){
                // console.log(res);
                var arr = res;
                var str1 = ``;
                for(var i = 0;i < arr.length;i++){
                    str1 += ` <div class="l${arr[i].id}">
                        <img src = "${arr[i].url}">
                    </div>`
                }
                $('.hcytab').html(str1)
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    //下载sweet数据
    function downloadsweet(){
        $.ajax({
            url:'../json/shoes.json',
            success:function(res){
                // console.log(res);
                // console.log(res[0].xiuxian[0].content.length);
                var arr = res[0].xiuxian[0].content;
                console.log(arr);
                var str1 = ``;
                var str2 = ``;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].type == 'man'){
                        str1 += ` <li>
                        <a href = "detail.html?${arr[i].id}" id=${arr[i].id}><img src="${arr[i].url}"alt=""></a><br/>
                        <div class="bottom">
                          <span>${arr[i].intro}</span><br/><br/>
                          <span>￥${arr[i].price}</span>
                        </div>
                      </li>`
                    }else{
                        str2 +=` <li>
                    
                        <a href = "detail.html?${arr[i].id}"><img src="${arr[i].url}"alt=""></a><br/>
                        <div class="bottom">
                          <span>${arr[i].intro}</span><br/><br/>
                          <span>￥${arr[i].price}</span>
                        </div>
                      </li>`
                    }
                
                }
                $('.sweet .sweetman>ul').html(str1);
                $('.sweet .sweetwoman>ul').html(str2)

            },
            error:function(err){
                console.log(err);
            }
        })
    }
  function hcyTab(){
      $('.content .hcy ul li').hover(function(){
          $(this).css({
            backgroundColor:'#b78562'
          }).siblings().css({
            backgroundColor:'black'
          })
          var index = $(this).index();
          $('.hcytab div').eq(index).css({
              display:'block',
              
          }).siblings().css({
              display:'none',
              
          })
      })
  }
  function sweetTab(){
      $('.sweet>ul>li').hover(function(){
          $(this).css({
              backgroundColor:'#926761',
              color:'white'
          }).siblings().css({
              backgroundColor:'white',
              color:'#926761'
          })
          var index = $(this).index();
          $('.sweettab>div').eq(index).css({
              display:'block'
          }).siblings().css({
              display:'none'
          })
      })
  }

// function navHover(){
//     var arr = $('.nav .box a');
//     for(let i = 0;i<arr.length;i++){
//         arr[i].index = i;
//     }
//     $('.nav .box a').hover(function(){
//         var index = $(this).index;
//         $('.nav .box>li').eq(index).children('div').css({
//             display:'block'
//         })
    
//     },
//     function(){

//     })
    
// }
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
    return {
        lunbo:lunbo,
        downlodahcy:downlodahcy,
        downloadsweet:downloadsweet,
        navHover:navHover,
        hcyTab:hcyTab,
        sweetTab:sweetTab,
        getTotal:getTotal,
        downloadnav:downloadnav
    }
})