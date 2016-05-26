/**
 * Created by Administrator on 2016/5/15 0015.
 */
function Loading(){
    var that=this;
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%",height:"100%","background-size":"cover","background-repeat":"no-repeat",
        "background-image":"url(img/bg.png)","background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody.view);
    var style=document.createElement("style");
    document.head.appendChild(style);
    var sheet=style.sheet;
    sheet.insertRule("@-webkit-keyframes car" +
        "{from{left: 0px}to{left: 650px}}");
    sheet.insertRule("@-webkit-keyframes in {from{width: 650px}to{width: 0px}");
    var $section=$("<section></section>");
    $section.css({
        width: "745px",height: "35px",position: "absolute",
        bottom: "10%",left: "calc(50% - 372px)",background: "url(img/L-bg.png)no-repeat"
    });
    $section.appendTo(that.$MainBody);
    var $car=$("<img>");
    $car.attr("src","img/L-car.png");
    $car.css({
        position: "absolute",top: "-45px",left: "0px",animation: "car 3s linear infinite"
    });
    $car.appendTo($section);
    var $loader=$("<div></div>");
    $loader.css({
        "border-radius": "25px","margin-top": "8px","margin-left": "8px",width: "730px",height: "20px","background-color": "red"
    });
    var $in=$("<div></div>");
    $in.css({
        position: "absolute",right: "7px",top: "8px","border-radius":"0 25px 25px 0","background-color": "black",
        width: "720px",height:"20px","z-index": "1",animation: "in 3s linear infinite"
    });
    $in.appendTo($loader);
    $loader.appendTo($section);
    setTimeout(function(){
        director.runScene(new Main());
    },3000)
}