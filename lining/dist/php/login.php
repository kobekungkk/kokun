<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $arr = array('num'=>0,'msg'=>'');
    if(!$username){
        $arr['num'] = 1;
        $arr['msg'] = '用户名不能为空！';
        echo json_encode($arr);
        exit;
    }
    if(!$password){
        $arr['num'] = 2;
        $arr['msg'] = '密码不能为空！';
        echo json_encode($arr);
        exit;
    }
    $str = md5(md5($password).'gkk');
    //1.连接数据库
    $link = mysql_connect('127.0.0.1','root','123456');
    //2.设置编码方式
    mysql_set_charset('utf8');
    //3.判断是否连接成功
    if(!$link){
        $arr['num'] = 3;
        $arr['msg'] = '服务器忙！';
        echo json_encode($arr);
        exit;
    }
    //4.选择数据库
    mysql_select_db('lining');
    //5.编写数据库语句
    $sql = "select *from users where username = '{$username}' and password = '{$str}'";
    //6.发送sql语句
    $res = mysql_query($sql);
    //7.取一行
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $arr['num'] = 4;
        $arr['msg'] = '用户名或密码错误';
        echo json_encode($arr);
        exit;
    }else{
        $arr['msg'] = '登录成功！';
        echo json_encode($arr);
    }
    mysql_close($link);
    
?>