/**
 * Created by Administrator on 2016/5/27 0027.
 */
function Carport(){
    var that=this;
    //var try_rider
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%", height:"100%","background-size":"cover", "background-repeat":"no-repeat",
        "background-image":"url(img/LGbg.jpg)","background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody.view);
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
        width:"118px",height:"27px",position:"absolute",top:"15px",left:"calc(50% - 59px)",background:"url(img/xgyl .png)"
    });
    $see.appendTo($head);           /*预览*/
    $head.appendTo($left_div);
    var $preview=$("<div></div>");      /*预览框背景*/
    $preview.css({
        width:"257px",height:"267px",background:"url(img/preview-bg.png) no-repeat",position:"relative",left:"18px",top:"43px"
    });
    var $Yspeed=$("<div>越野</div>");
    $Yspeed.css({
        margin:"70px 0 0 30px","font-size":"25px",color:"white",
        "text-shadow":"#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0"
    });
    var $dspeed=$Yspeed.clone();
    $dspeed.css("margin-top","15px");
    var $speed=$dspeed.clone();
    var $fspeed=$dspeed.clone();
    var $hspeed=$dspeed.clone();
    $left_div.append($preview,$Yspeed,$dspeed,$speed,$fspeed,$hspeed);

    /*右侧*/
    var $r_head=$("<div></div>");
    $r_head.css({
        width:"394px",height:"53px",background:"url(img/long-bg.png)",position:"absolute",top:"-20px",left:"calc(50% - 197px)"
    });
    var $sd=$("<p></p>");
    $sd.css({width:"120px",height:"31px",background:"url(img/cangku.png)",position:"absolute",top:"10px",left:"calc(50% - 60px)"});
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
}
























