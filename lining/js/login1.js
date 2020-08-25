define(['jquery'],function($){
    function loginTest(){
        $('.body button').click(function(){
            $.ajax({
                type:'post',
                url:'php/login.php',
                data:{
                    username:$('.body input').eq(0).val(),
                    password:$('.body input').eq(1).val()
                },

                success:function(res){
                    var obj = JSON.parse(res);
                    if(obj.num){
                        $('.body .msg').html(obj.msg).css({
                            color:'red',
                            display:'block'
                        })
                    }else{
                        $('.body .msg').html(obj.msg).css({
                            color:'green',
                            display:'block',
                            border:'1px solid green'
                        })
                    }
                },
                error:function(err){
                    console.log(err);
                }
            })
        })
       
    }
    return {
        loginTest:loginTest
    }
})