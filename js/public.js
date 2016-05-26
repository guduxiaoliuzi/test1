/**
 * Created by Administrator on 2016/5/19 0019.
 */
/*参数1：插入的地方 参数2：填写的内容  参数3：要改变的图片*/
function TanChuang($parent,conter,setimg){
    var that=this;
    var $bg=$("<div></div>");
    $bg.css({
        width:"500px",height:"300px",background:"white",position:"fixed",left:"calc(50% - 250px)",top:"calc(50% - 150px)"
    });
    var $img=$("<img>");
    $img.attr("src",setimg);
    $img.css({
        width:"220px",height:"220px", position:"absolute",left:"calc(50% - 110px)","margin-top":"80px"
    });
    this.ing=$("<span>"+conter+"</span>");
    this.ing.css({
        width:"420px",height:"25px","font-size":"200%", position:"absolute",left:"calc(50% - 150px)",top:"calc(50% - 110px)"
    });
    this.close=$("<div></div>");
    this.close.css({
        width:"32px",height:"32px",position:"absolute",top:"-11px",right:"-10px", "background-size":"cover",
        "background-repeat":"no-repeat","background-image":"url(img/exit.png)","background-position":"center center"
    });
    this.close.click(function(){
        $bg.css("display","none");
    });
    this.close.appendTo($bg);
    $img.appendTo($bg);
    this.ing.appendTo($bg);
    $bg.appendTo($parent);
}

