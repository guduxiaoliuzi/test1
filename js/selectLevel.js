/**
 * Created by Administrator on 2016/5/29 0029.
 */
$(function(){
    User.id=1;
});
var Missioni={
    id:6,
    map:'map01',
    blong:1,
    sta:1,
    degree:2
};
function SelectLevel(){
    var that=this;
    this.$MainBody=$("<div></div>");
    this.$MainBody.css({
        width:"100%",height:"100%","background-size":"cover","background-repeat":"no-repeat",
        "background-image":"url(img/guankbg.jpg)","background-position":"center center",position:"absolute"
    });
    this.$MainBody.appendTo(that.$MainBody);
    var $bg=$("<div></div>");
    $bg.css({
        width:"710px",height:"500px",position:"absolute",left:"calc(50% - 355px)",background:"url(img/gkbg.png)no-repeat",top:"calc(3% + 30px)"
    });
    var $black=$("<div></div>");
    $black.css({
        width: "96px",height: "96px","border-radius": "48px",position: "absolute",top: "20px",
        cursor: "pointer",background: "url(img/return.png) no-repeat center", right:"calc(50% - 472px)"
    });
    this.$MainBody.append($bg,$black);      /*关卡背景*/
    this.setLevel=function(objs){
        var objs=deBLock(objs);
        for(var i=0;i<objs.length;i++){
            var $stage=$("<div></div>");
            //var $stage[0].obj=objs[i];
            $stage.addClass("leve"+(i+1));
            //console.log(objs[i].img);
            $stage.css({
                width:"112px",height:"112px",position:"absolute",overflow:"hidden","border-radius":"112px",zoom: '80%',
                cursor:"pointer","background-image":"url("+objs[i].map+")",
            });
            $stage.css("background-position",-112*i+"px center");

            setStarLvel(objs[i].level,$stage);
            $stage.appendTo($bg);
        }
    };
    $bg.on("click","[type=unlock]",function(){
        Missioni=that.obj;
        console.log(that.obj);
        Missioni.degree=that.obj.level;
        Missioni.sta=$(that).index()+1;
        Missioni.blong=matchi;
        director.runScene(new Carport());
    });
    $black.click(function(){
        director.runScene(new MapSelect());
    });
    function deBLock(objs){
        if(!objs[0].level){//全新赛事、玩过的关卡数为0
            objs[0].level=-1
        }
        else{
            //获取最后一个关卡
            for(var i=0;i<objs.length;i++){
                if(!objs[i].level){
                    if(objs[i-1].level>1){
                        objs[i].level=-1;
                    }
                    break;
                }
            }
        }
        return objs;
    };
    /*星星的设置*/
    function setStarLvel(lev,$parent){
        var $bgdiv=$("<div></div>");
        //lev=2;
        if(lev){
            $bgdiv.css({
                width: "96%",height: 27,"background-color": "rgba(0,0,0,0.7)","margin-top":43,"text-align": "center"
            });
            if(lev==-1){
                lev=0;
            };
            for(var i=0;i<lev;i++){
                var $xing=$("<img src='img/xin01.png'>");
                $xing.css("margin","3px");
                $xing.appendTo($bgdiv);
            };
            for(var i=0;i<3-lev;i++){
                var $xin=$("<img src='img/xin02.png'>");
                $xin.css("margin","3px");
                $xin.appendTo($bgdiv);
            };
            $parent.attr("type","unlock");
        }
        else{
            $bgdiv.css({
                width: '100%',height: '100%',background:'url(img/clock.png) no-repeat center 100%/100%'
            });
        }
        $bgdiv.appendTo($parent);
    }
    var sel="SELECT mission.id,mission.name,mission.map,mission.img,r.degree FROM mission LEFT JOIN user_mission r " +
        "ON r.userid=? AND mission.id=r.missionid WHERE mission.belong=?";
    data.missionData(sel,[User.id,Missioni.blong],"setLevel");
    data.on("setLevel",function(e,missions){
        that.setLevel(missions);
    });
}
























