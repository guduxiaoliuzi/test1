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
    var $right_cdiv=$("<div></div>");
    $right_cdiv.css({
        width:"713px",height:"562px",border:"black solid 3px",position:"absolute",
        "border-radius":"15px",background:"white",right:"calc(50% - 500px)",top:"calc(2% + 30px)"
    });
    this.$MainBody.append($left_div,$right_cdiv);
    /*左侧*/
    var $head=$("<div></div>");
    $head.css({
        width:"256px",height:"60px",background:"url(img/small-bg.png) no-repeat",position:"absolute",top:"-20px",left:"18px"
    });
    var $see=$("<span></span>");
    $see.css({
        width:"118px",height:"27px",position:"absolute",top:"15px",left:"calc(50% - 59px)",background:"url(img/xgyl.png)"
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
    $right_cdiv.append($r_head,$exit,$man_bt,$car_bt,$wheel_bt,$tank_bt,$shop);
    this.CreatePort=function(Obj){
         var objs=Obj;
         $stores.empty();
         for(var i=0;i<objs.length;i++){
         var $car_div=$("<div></div>");
         $car_div.css({
             width:"114px",height:"88px",margin:"10px 0 0 15px",float:"left",background:"url("+objs[i].img+")"
         });
         var $check_img=$("<div></div>");
         $check_img.css({
             width:"100%",height:"100%",background:"none"
         });
         $check_img.appendTo($car_div);
         $car_div.appendTo($stores);
         $check_img.click(function(){
             $(".check").css("background","none");
             $(that).css("background","url(img/check.png) no-repeat center");
             $(that).addClass("check");

             var i=$(that).parent().index();
             Driver(objs[i],$preview);
             PortDisplay(objs[i]);
         });
     }
   };
   /*左侧显示数据参数方法*/
     function PortDisplay(objs){
         switch (objs.value_type){
             case 1:
                 e
             }
     };
    if(!director.runScene(Store)){
         var $go=$("<div></div>");
         $go.css({
             width:"128px",height:"84px",background:"url(img/go.png)",position:"absolute",bottom:"0px",cursor:"pointer"
         });
        $go.appendTo($left_div);
   }
   /* $man_bt.on("click",function(){
     $(that).css({

     });
  });*/
     var selecta="select riders.id,riders.r_name,riders.price,riders.img_1,riders.img_2 from riders inner join user_rider on riders.id=user_rider.riderid and user_rider.userid=?";
    var $riders=data.riderData(selecta,[User.id]);
    $right_cdiv.on("click","[class='choose']",function(){
         $(".choose").css({"background":"none",border:"none"});
         $(this).css({"background":"linear-gradient(#d6f9f5,#31d7c2)",border:"black solid 3px"});
         var typ=$(this).index()-2;
         var select="select equipment.id,equipment.name,equipment.price,equipment.img,equipment.img_1,equipment.value," +
         "equipment.value_type,equipment.type from equipment inner join user_equip on equipment.id=user_equip.equipid and user_equip.userid=?";
         switch (typ){
             case 0:
                 select="select riders.id,riders.r_name,riders.price,riders.img_1,riders.img_2 from riders inner join" +
                 "user_rider on riders.id=user_rider.riderid and user_rider.userid=?";
                 data.riderData(select,[User.id],"createPort");
             case 1:
                 data.equipData(select,[User.id],"createPort");
                 break;
             case 2:
                 data.equipData(select,[User.id],"createPort");
                 break;
             case 3:
                 data.equipData(select,[User.id],"createPort");
                 break;
             };
         data.on("createPort",function(e,arr){
             that.CreatePort(arr);
             var pages=Math.ceil(arr.length/6);
             /*var page=new PageBar($shop,pages);
               page.setTo($stores);
               page.setPageTo(0);*/
             })
     });
    $(function(){
     //User.id=1;
     //getUser();
     setTimeout(function(){
         $(".choose:eq(0)").click();
     },10);
     });
    console.log(User.id,$riders);
}
























