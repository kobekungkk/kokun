define(['jquery','jquery-cookie'],function($){
    function registerTest(){
        $('.body button').click(function(){
            $.ajax({
                type:'get',
                url:'../php/register.php',
                data:{
                    username:$('body input').eq(0).val(),
                    password:$('body input').eq(1).val(),
                    repassword:$('body input').eq(2).val(),
                    tlephone:$('body input').eq(3).val(),
                    createTime:(new Date()).getTime()
                },
                success:function(res){
                    console.log(res);
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
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
        registerTest:registerTest,
        downloadnav:downloadnav,
        navHover:navHover
    }
})