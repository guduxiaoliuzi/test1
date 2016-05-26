/**
 * Created by Administrator on 2016/5/20 0020.
 */
function Main(){
    var that=this;
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%", height:"100%", "background-size":"cover","background-repeat":"no-repeat",
        "background-image":"url(img/model-bg.png)", "background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody);
    var $help=$("<div></div>");
    $help.css({
        width: "96px",height: "96px","border-radius": "48px",position: "absolute",top: "20px",cursor: "pointer"
    });
    var $black=$help.clone();
    $help.css({background: "url(img/help.png) no-repeat center",left: "calc(50% - 572px)",});
    $black.css({background: "url(img/return.png) no-repeat center",right:"calc(50% - 572px)"});
    $black.click(function(){
        director.runScene(new Login());
    });
    $help.appendTo(this.$MainBody);         /*帮助按钮*/
    $black.appendTo(this.$MainBody);        /*返回按钮*/
    var $one=$("<div></div>");
    $one.css({
        width:"263px", height:"69px", position:"absolute",bottom:"50px",cursor: "pointer"
    });
    var $more=$one.clone();
    var $shop=$one.clone();
    $one.css({left:"calc(50% - 550px)",background:"url(img/onebtn.png)"});
    $more.css({left:"calc(50% - 131px)",background:"url(img/morebtn.png)"});
    $shop.css({right:"calc(50% - 550px)",background:"url(img/mallbtn.png)"});
/*    $one.click(function(){
        director.runScene(new MapSelect());
    });*/
    $more.click(function(){
        var tc=new TanChuang(that.$MainBody,"正在努力建设中。。。。。","img/001.gif");
    });
    $shop.click(function(){
        director.runScene(new Store());
    });
    $one.appendTo(this.$MainBody);      /*单人游戏*/
    $more.appendTo(this.$MainBody);     /*多人游戏*/
    $shop.appendTo(this.$MainBody);     /*商店*/
}