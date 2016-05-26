/**
 * Created by Administrator on 2016/5/26 0026.
 */
function Register(){
    var that=this;
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%",height:"100%","background-size":"cover","background-repeat":"no-repeat",
        "background-image":"url(img/LGbg.jpg)","background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody);
    var $login=$("<div></div>");
    $login.css({
        "background-image": "url(img/login-bg.png)",
        width: 509,height: 424,overflow: "hidden",position: "absolute",top:"calc(50% - 212px)",left:"calc(50% - 255px)"
    });
    this.$MainBody.append($login);
    var $r_form=$("<form id='l_form'></form>");
    $r_form.appendTo($login);
    var $put_bg=$("<div></div>");
    $put_bg.css({
        width:"394px",height:"53px","margin-top":"30px",background:"url(img/long-bg.png)",position:"relative",
        left:"calc(50% - 197px)"
    });
    var $pwd_bg=$put_bg.clone();
    var $pwd2_bg=$put_bg.clone();
    var $img_n=$("<img src='img/codetxt.png'/>");
    $img_n.css({
        position: "absolute",left: 46,top: 15
    });
    var $username=$('<input type="text"name="name" placeholder ="请输入账号">');
    $username.css({
        "background-color": "#2f2f2f",color: "white","font-size": "110%",height: "36px",width: "220px",margin:"7px 50px 0 10px","line-height": "36px",
        position:"absolute",right:"0"
    });
    $put_bg.append($img_n,$username);/*账号框*/
    var $img_p=$img_n.clone();
    var $img_p2=$img_n.clone();
    //var $u_name=$img_n.clone();
    $img_p[0].src="img/pwdtxt.png";
    $img_p2[0].src="img/pwdtxt.png";
    var $pwd=$('<input type="password"  name="pwd1" placeholder ="请输入密码">');
    $pwd.css({
        "background-color": "#2f2f2f",color: "white","font-size": "110%",height: "36px",width: "220px",margin:"7px 50px 0 10px","line-height": "36px",
        position:"absolute",right:"0",border:"0"
    });
    var $pwd2=$pwd.clone();
    $pwd2.attr({placeholder:"请再输入密码",name:"pwd2"})
    $pwd_bg.append($img_p,$pwd);
    $pwd2_bg.append($img_p2,$pwd2);
    $r_form.append($put_bg,$pwd_bg,$pwd2_bg)/*密码框*/
    /*按钮*/
    var $bt_new=$("<input>");
    $bt_new.css({
        width: "263px",height:"69px",background:"url(img/new-register.png)",position:"absolute",
        left:"120px",bottom:"60px",border:"none",cursor:"pointer",outline: "none"
    });
    $bt_new.attr({"type":"submit",value:" "});
    $r_form.append($bt_new);
    /*返回按钮*/
    var $back=$("<div></div>");
    $back.css({
        width: "96px",height: "96px","border-radius": "48px",position: "absolute",top: "10px",
        cursor: "pointer", background:"url(img/return.png) no-repeat",right:"calc(40% - 300px)"
    });
    $back.appendTo(that.$MainBody);
    $r_form.validate({
        rules:{
            name:{
                required:true,
                rangelength:[5,10],
            },
            pwd1:{
                required:true,
                rangelength:[6,10],
            },
            pwd2:{
                equalTo: "input[name=pwd1]",
            }
        },
        messages: {
            name: {
                required: "请输入用户名",
                rangelength:"用户名5-10个字符"
            },
            pwd1: {
                required: "请输入密码",
                rangelength:"密码6-10位之间"
            },
            pwd2: {
                required: "请再次输入密码",
                equalTo:"两次输入密码需一致"
            },
        },
        submitHandler:function(form){
            var login=$username.val();
            var pwd=$pwd2.val();
            var len= 0,i=0;
            db.transaction(function(tx){
                tx.executeSql("select login from users",[],function(tx,results){
                    len=results.rows.length;
                    console.log(results.rows.item(i),login)
                    for(i=0;i<len;i++){
                        if(results.rows.item(i).login==login){
                            var tc=new TanChuang(that.$MainBody,"哎！"+login+"已被注册啦","img/003.gif")
                            break;
                        }
                    }
                },null)
            });
            db.transaction(function(tx){
                if(len==i){
                    tx.executeSql("insert into users (login, password, u_name, level, money) values (?,?, ?, 1, 10000)",[login, pwd, login]);
                    var tc=new TanChuang(that.$MainBody,"恭喜成功注册帐号："+login+"。。。","img/ppb.gif");
                    tc.close.click(function(){
                        director.runScene(new Loading());
                    });
                }
            });
            return false;
        }
    })
}