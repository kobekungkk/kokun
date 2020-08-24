<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password  = $_POST['password'];
    $repassword  = $_POST['repassword'];
    $telphone = $_POST['telphone']
    $createtime  = $_POST['createtime'];
    $arr = array('num'=>0,'msg'=>'');
    if(!$username){
        $arr['num'] = 1;
        $arr['msg'] = '用户名不能为空';
        echo json_encode($arr);
        exit;
    }
    if(!$password){
        $arr['num'] = 2;
        $arr['msg'] = '密码不能为空！';
        echo json_encode($arr);
        exit;
    }
    if($password != $repassword){
        $arr['num'] = 3;
        $arr['msg'] = '两次密码不一致';
        echo json_encode($arr);
        exit;
    }
    // 1.连接数据库
    $link = mysql_connect('127.0.0.1','root','123456');
    //2.设置字符集
    mysql_set_charset('utf8');
    //3.判断数据库是否连接成功
    if(!$link){
        $arr['num'] = 4;
        $arr['msg'] = '服务器忙！';
        echo json_encode($arr);
        exit;
    }
    //4.选择数据库
    mysql_select_db('lining');
    //5.编写数据库语句
    $sql = "select * from users where username = '{$username}'";
    //6.发送语句
     $res = mysql_query($sql);
    //7.取一行
     $row = mysql_fetch_assoc($res);
    if($row){
        $arr['num'] = 5;
        $arr['msg'] = '用户名已存在';
        echo json_encode($arr);
        exit;
    }
    $id =2;
    $str = md5(md5($password).'gkk');
    $sql1 = "insert into users(username,password,createtime,telphone)values('{$username}','{$str}',{$createtime},{$telphone})";
    $res1 = mysql_query($sql1);
    if($res1){
        $arr['msg']= '注册成功！';
        echo json_encode($arr);
    }else{
        $arr['num'] = 6;
        $arr['msg']= '注册失败！';
        echo json_encode($arr);
        exit;
    }
    mysql_close($link);


?>