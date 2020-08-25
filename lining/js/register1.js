define(['jquery','jquery-cookie'],function($){
    downloadnav()
    function registerTest(){
        $('.body button').click(function(){
            $.ajax({
                type:'post',
                url:'php/register.php',
                data:{
                    username:$('.body input').eq(0).val(),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    password:$('.body input').eq(1).val(),
                    repassword:$('.body input').eq(2).val(),
                    telphone:$('.body input').eq(3).val(),
                    createTime:(new Date()).getTime()
                },
                success:function(res){
                    var obj = JSON.parse(res);
                    if(obj.num){
                        $('.body .msg').css({
                            display:'block', 
                            color:'red'
                        }).html(obj.msg)
                    }else{
                        $('.body .msg').css({
                            display:'block',
                            color:'green',
                            border:'1px solid green'
                        }).html(obj.msg)
                        setTimeout(function(){
                            location.href = 'login.html'
                        },2000)
                    }
                   
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
    }
    function downloadnav(){
        $.ajax({
            url:'json/nav.json',
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
        registerTest:registerTest,
        downloadnav:downloadnav,
        navHover:navHover
    }
})