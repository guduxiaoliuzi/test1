/**
 * Created by Administrator on 2016/5/25 0025.
 */
function Login(){
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
    var $l_form=$("<form id='l_form'></form>");
    $l_form.appendTo($login);
    var $put_bg=$("<div></div>");
    $put_bg.css({
        width:"394px",height:"53px","margin-top":"30px",background:"url(img/long-bg.png)",position:"relative",
        left:"calc(50% - 197px)"
    });
    var $pwd_bg=$put_bg.clone();
    var $img_n=$("<img src='img/codetxt.png'/>");
    $img_n.css({
        position: "absolute",left: 46,top: 15
    });
    var $username=$('<input type="text"name="usrname" placeholder ="请输入账号">');
    $username.css({
        "background-color": "#2f2f2f",color: "white","font-size": "110%",height: "36px",width: "220px",margin:"7px 50px 0 10px","line-height": "36px",
        position:"absolute",right:"0"
    });
    $put_bg.append($img_n,$username);/*账号框*/
    var $img_p=$img_n.clone();
    $img_p[0].src="img/pwdtxt.png";
    var $pwd=$('<input type="password"  name="pwd" placeholder ="请输入密码">');
    $pwd.css({
        "background-color": "#2f2f2f",color: "white","font-size": "110%",height: "36px",width: "220px",margin:"7px 50px 0 10px","line-height": "36px",
        position:"absolute",right:"0",border:"0"
    });
    $pwd_bg.append($img_p,$pwd);
    $l_form.append($put_bg,$pwd_bg)/*密码框*/
    /*按钮*/
    var $bt_login=$("<input>");
    $bt_login.css({
        width: "263px",height:"69px",background:"url(img/loginbtn.png)",position:"absolute",
        left:"120px",top:"220px",border:"none",cursor:"pointer",outline: "none"
    });
    var $bt_new=$bt_login.clone();
    $bt_login.attr({"type":"submit",value:" "});
    $bt_new.attr("type","button");
    $bt_new.css({
        background:"url(img/zucebtn.png)",top:"320px"
    });
    $login.append($bt_new);
    $l_form.append($bt_login);
    var $help=$("<div></div>");
    $help.css({
        width: "96px",height: "96px","border-radius": "48px",position: "absolute",bottom: "90px",cursor: "pointer"
    });
    var $music=$help.clone();
    $help.css({background: "url(img/help.png) no-repeat center",left: "calc(50% - 392px)",});
    $music.css({background: "url(img/music.png) no-repeat center",right:"calc(50% - 392px)"});
    this.$MainBody.append($help,$music);
    $l_form.validate({
        rules:{
            usrname: {
                required: true,
                rangelength:[5,10]
            },
            pwd: {
                required: true,
                rangelength:[5,10]
            }
        },
        messages: {
            usrname: {
                required: "请输入用户名",
                rangelength:"用户名5-10个字符"
            },
            pwd: {
                required: "请输入密码",
                rangelength:"密码5-10位之间"
            }
        },
        submitHandler:function(form) {
            var login=$username.val();
            var pwd=$pwd.val();
            db.transaction(function(tx){
                tx.executeSql('SELECT login,password,id,money FROM users',[],function(tx,results){
                    var len=results.rows.length;
                    for(var i=0;i<len;i++){
                        if(results.rows.item(i).login==login){
                            if(results.rows.item(i).password==pwd){
                                User.id=results.rows.item(i).id;
                                User.money=results.rows.item(i).money;
                                console.log(User.id,User.money);
                                var tc=new TanChuang(that.$MainBody,"恭喜登陆成功。。。","img/ppb.gif");
                                tc.close.click(function(){
                                    director.runScene(new Loading());
                                });
                              /*  setTimeout(function(){
                                    runSene('loading');//跳转加载场景
                                },500);*/
                                break;
                            }
                            else{
                                var tc1=new TanChuang(that.$MainBody,"哎！！！密码输错啦。。。","img/003.gif")
                                //alert('密码错误，请重新输入');
                                break;
                            }
                        }
                    }
                    if(i==len){
                        alert('该用户不存在，请重新输入');
                    }
                },null);
                return false;
            });
        }
    });
    $bt_new.click(function(){
        director.runScene(new Register());
    });
}