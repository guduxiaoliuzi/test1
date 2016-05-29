/**
 * Created by Administrator on 2016/5/26 0026.
 */
function Store(){
    var that=this;
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%", height:"100%","background-size":"cover", "background-repeat":"no-repeat",
        "background-image":"url(img/LGbg.jpg)","background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody);
    var $left_div=$("<div></div>");
    $left_div.css({
        width:"291px",height:"562px", border:"black solid 3px", position:"absolute",
        "border-radius":"15px",background:"white",left:"calc(50% - 525px)",top:"calc(2% + 30px)"
    });
    var $right_div=$("<div></div>");
    $right_div.css({
        width:"713px",height:"562px",border:"black solid 3px",position:"absolute",
        "border-radius":"15px",background:"white",right:"calc(50% - 500px)",top:"calc(2% + 30px)"
    });
    this.$MainBody.append($left_div,$right_div);
    /*左侧*/
    var $head=$("<div></div>");
    $head.css({
        width:"256px",height:"60px",background:"url(img/small-bg.png) no-repeat",position:"absolute",top:"-20px",left:"18px"
    });
    var $see=$("<span></span>");
    $see.css({
        width:"76",height:"32px",position:"absolute",top:"10px",left:"92px",background:"url(img/yulan.png)"
    });
    $see.appendTo($head);           /*预览*/
    $head.appendTo($left_div);
    var $names=$("<div></div>");        /*用户名*/
    $names.css({
        width:"290px",margin:"35px 0 10px 0","text-align":"center",'font-weight': 'bold',"font-size":"30px"
    });
    var $preview=$("<div></div>");      /*预览框背景*/
    $preview.css({
        width:"257px",height:"267px",background:"url(img/preview-bg.png) no-repeat",position:"relative",left:"18px"
    });
    var $coins=$("<div></div>");     /*金币*/
    $coins.css({
        color:"#ffc600","font-size":"150%","margin-top":"5px","text-align":"center"
    });
    var $myCar=$("<div></div>");        /*我的车库*/
    $myCar.css({
        width:"231px",height:"61px",margin:"10px auto","background-image":"url(img/carport.jpg)",cursor:"pointer"
    });
    var $recharge=$myCar.clone();
    $recharge.css({
        bottom:"20px","background-image":"url(img/chongzhi.jpg)"
    });
    $recharge.click(function(){
        var t=new TanChuang(that.$MainBody,"正在努力建设中。。。。。","img/001.gif");
    });
    $left_div.append($names,$preview,$coins,$myCar,$recharge);
    /*右侧*/
    var $r_head=$("<div></div>");
    $r_head.css({
        width:"394px",height:"53px",background:"url(img/long-bg.png)",position:"absolute",top:"-20px",left:"168px"
    });
    var $sd=$("<p></p>");
    $sd.css({width:"84px",height:"32px",background:"url(img/malltxt.png)",position:"absolute",top:"10px",left:"155px"});
    $sd.appendTo($r_head);
    var $exit=$("<div></div>");
    $exit.css({
        width:"62px",height:"62px",background:"url(img/exit.png)",position:"absolute",top:"-31px",right:"-15px"
    });
    $exit.click(function(){
        director.runScene(new Main());
    });
    var $man_bt=$("<div></div>");
    $man_bt.css({
        width:"160px",height:"110px",cursor:"pointer",
        position:"absolute",left:"8px"
    });
    $man_bt.addClass("choose_btn")
    var $car_bt=$man_bt.clone();
    var $wheel_bt=$man_bt.clone();
    var $tank_bt=$man_bt.clone();
    var $man_img=$("<div></div>");
    $man_img.css({
        width:"64px",height:"64px",background:"url(img/item1.png)no-repeat",display:"inline-block",position:"absolute",left:"45px",top:"15px"
    });
    var $car_img=$man_img.clone().css("background","url(img/item5.png)no-repeat");
    var $wheel_img=$man_img.clone().css("background","url(img/item6.png)no-repeat");
    var $tank_img=$man_img.clone().css("background","url(img/dongji_01.png)no-repeat");
    $man_bt.append($man_img).css("top","50px");
    $car_bt.append($car_img).css("top","165px");
    $wheel_bt.append($wheel_img).css("top","280px");
    $tank_bt.append($tank_img).css("top","395px");
    var $shop=$("<div></div>");
    $shop.css({
        width:"533px",height:"510px",border:"black solid 3px",position:"absolute","border-radius":"15px",
        background:"white",right:"2px","margin-top":"40px"
    });
    var $stores=$("<div></div>");
    $stores.css({
        width:"523px",height:"430px",border:"black solid 3px",position:"absolute",
        "border-radius":"15px","background-image":"url(img/shop-bg.png)","background-repeat":"no-repeat",
        "background-position":"center center","background-size":"cover",left:"4px",top:"3px",overflow:"hidden"
    });
    $stores.appendTo($shop);
    $right_div.append($r_head,$exit,$man_bt,$car_bt,$wheel_bt,$tank_bt,$shop);
    //console.log($shop.css);
    var coins= 0,have=new Array;
    function getUser(){
        db.transaction(function(tx){
            tx.executeSql("select u_name,money from users where id=?",[User.id],function(tx,results){
                $coins.html("我的金币："+results.rows.item(0).money);
                coins=results.rows.item(0).money;
                $names.html(results.rows.item(0).u_name);
            },function(e,tx){alert(e.message)});
            tx.executeSql("select riderid from user_rider where userid=?",[User.id],function(tx,results){
                var len=results.rows.length;
                for(var i=0;i<len;i++){
                    //console.log(results.rows.item(i).riderid);
                    have.push(results.rows.item(i).riderid);
                }
            },function(e,tx){alert(e.message)});
            tx.executeSql("select equipid from user_equip where userid=?",[User.id],function(tx,results){
                var len=results.rows.length;
                for(var i=0;i<len;i++){
                    have.push(results.rows.item(i).equipid);
                }
            },function(e,tx){alert(e.message)})
        });
    };
    this.CreateObjects=function(Obj){
        var obj=Obj;
        $stores.empty();       /*清空商店*/
        for(var i=0;i<obj.length;i++){      /*生成产品*/
            var $bg=$("<div></div>");
            $bg.css({
                width:"147px",height:"195px",border:"black solid 3px","border-radius":"15px",margin:"10px 0 0 15px",float:"left"
            });
            var $s_name=$("<div></div>");
            $s_name.css({
                width:"140px","text-align":"center","font-size":"120%", 'font-weight': 'bold'
            });
            $s_name.html(obj[i].name);
            var $s_img=$("<div></div>");
            $s_img.css({
                width:"126px",height:"100px","margin-left":"9px","margin-top":"3px","background-image":"url("+obj[i].img+")","background-repeat":"no-repeat",
                "background-position":"center center","background-size":"cover"
            });
            var $s_price=$("<p></p>");
            $s_price.css({
                width:"126px",color:"aqua","margin-left":"9px","margin-top":"3px","font-size":"100%"
            });
            $s_price.html("价格："  +obj[i].price);
            var $s_buy=$("<div></div>");
            $s_buy.css({
                "background-image":"url(img/buybtn.png)",width: 62,height: 28,display: 'inline-block',
                margin:"9px 0 0 3px",float:"left", cursor: 'pointer'
            });
            $s_buy.addClass("unbuy");
            var $s_look=$("<div></div>");
            $s_look.css({
                "background-image":"url(img/lookbtn.png)",width: 62,height: 28,display: 'inline-block',
                margin:"9px 3px 0 0",float:"right", cursor: 'pointer'
            });
            $bg.append($s_name,$s_img,$s_price,$s_buy,$s_look);
            $bg.appendTo($stores);
            /*预览效果*/
            $s_look.on("click",function(){
                var i=$(this).parent().index();/*获得当前的位置传递*/
                Driver(obj[i],$preview);
            });
            /*购买产品*/
            for(var j=0;j<have.length;j++){     /*查看是否拥有产品 ，并做标记*/
                if(obj[i].id==have[j]){
                    $s_buy.removeClass("unbuy").addClass("buy");
                    break;
                }
            }
            $s_buy.parent().on("click","[class='buy']",function(){
               alert("已经拥有了此产品！");
            });
            $s_buy.parent().on("click","[class='unbuy']",function(){
                var i=$(this).parent().index();
                if(coins<obj[i].price){
                    alert("金币不足，无法购买！");
                }
                else{
                    if(!obj[i].type){       /*是否是骑手，是插入骑手表中，不是插入装备表中*/
                        db.transaction(function(tx){
                            var user_rider_table="insert into user_rider(userid,riderid) values(?,?);";
                            tx.executeSql(user_rider_table,[User.id,obj[i].id]);
                        },null);
                    }
                    else{
                        db.transaction(function(tx){
                            var user_equip_table="insert into user_equip(userid,equipid) values(?,?);";
                            tx.executeSql(user_equip_table,[User.id,obj[i].id]);
                        },null);
                    }
                    coins-=obj[i].price;
                    db.transaction(function(tx){
                       tx.executeSql("update users set money = ? where id= ?",[coins,User.id]);
                        getUser();
                        alert("购买成功");
                    },function(e,tx){alert("装备购买问题！")});
                    $(this).removeClass("unbuy").addClass("buy");
                }
            });
        }
    }
    $right_div.on("click","[class='choose_btn']",function(){
       $(".choose_btn").css({"background":"none",border:"none"});
       $(this).css({"background":"linear-gradient(#d6f9f5,#31d7c2)",border:"black solid 3px"});
        var typ=$(this).index()-2;
        var select="select id,name,price,img,img_1,value,value_type,type from equipment where type=?";
        switch (typ){
            case 0:
                select='select id,r_name,price,img_1,img_2 from riders';
                data.riderData(select,[],"createlist");
            case 1:
                data.equipData(select,[typ],"createlist");
                break;
            case 2:
                data.equipData(select,[typ],"createlist");
                break;
            case 3:
                data.equipData(select,[typ],"createlist");
                break;
        };
        data.on("createlist",function(e,arr){
            that.CreateObjects(arr);
            var pages=Math.ceil(arr.length/6);
            var page=new PageBar($shop,pages);
            //page.setTo($stores);
            //page.setPageTo(0);
        })
    });
    $(function(){
        User.id=1;
       getUser();
        setTimeout(function(){
            $(".choose_btn:eq(0)").click();
        },10);
    });
}
function Driver(obj,$parent){
    if(!obj.type){
        $(".d_rider").remove();
        var $d_rider=$("<div></div>");
        $d_rider.css({
            background:"url("+obj.img2+") no-repeat",top:"100px",left:"calc(50% - 39px)",
            position:"absolute",width:"78px",height:"101px","z-index":5
        });
        $d_rider.addClass("d_rider");
        $d_rider.appendTo($parent);
    }
    else if(obj.type==1){
        $(".d_motor").remove();
        var $d_motor=$("<div></div>");
        $d_motor.css({
            background:"url("+obj.imgB+") no-repeat",top:"160px",left:"calc(50% - 64px)",
            position:"absolute",width:"128px",height:"64px","z-index":3
        });
        $d_motor.addClass("d_motor");
        $d_motor.appendTo($parent);
    }
    else if(obj.type==2){
        $(".d_wheel").remove();
        var $d_wheel_l=$("<div></div>");
        $d_wheel_l.css({
            background:"url("+obj.imgB+") no-repeat",top:"190px",
            position:"absolute",width:"35px",height:"35px",animation: "wheel 3s linear infinite",
        });
        $d_wheel_l.addClass("d_wheel");
        var $d_wheel_r=$d_wheel_l.clone();
        $d_wheel_l.css("left","calc(50% - 64px)");
        $d_wheel_r.css("right","calc(50% - 64px)");
        $parent.append($d_wheel_l,$d_wheel_r)
    }
    else if(obj.type==3){
        $(".d_eq").remove();
        var $d_eq=$("<div></div>");
        $d_eq.css({
            background:"url("+obj.imgB+") no-repeat",top:"10px",left:"calc(50% + 20px)",
            "background-size":"cover",position:"absolute",width:"100px",height:"100px"
        });
        $d_eq.addClass("d_eq");
        $parent.append($d_eq);
    }
}

