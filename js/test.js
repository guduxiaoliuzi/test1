/**
 * Created by Administrator on 2016/3/25.
 */
/**
 * Created by Administrator on 2016/3/22.
 */
function TestScene(actor){
    var self=this;
    this.$frame=$("<div onselectstart='return false'></div>");
    this.$frame.css({
        "width":"100%","height": "100%"
    });
    var $coverdiv=$("<div></div>");
    $coverdiv.html('3');
    $coverdiv.css({
        width: '100%',height: '100%',background: 'rgba(0,0,0,0.7)',position:'fixed',
        'z-index': '1000','text-align': 'center',color:'#fff','font-size':'80px',
        'padding-top':'250px'
    });
    var $ctr=$("<div></div>");
    $ctr.css({
        width:'1000px',height:'100%',position:'absolute','z-index':'100',
        'margin-left': '-500px',left:"50%"
    });
    var $div=$("<div></div>");
    $div.css({
        width:410,height: 70,background:'url(images/time.png)',position:'absolute',
        left:'180px',top:40
    });
    var $sta=$("<div></div>");
    $sta.html(Missioni.blong+'-'+Missioni.sta);
    $sta.css({
        "font-size":"40px",position:"absolute",'font-weight': 'bolder',top:22,left:96
    });
    var $go=$("<div></div>");
    $go.css({
        width:64,height:62,background:'url(images/pause.png)',position:'absolute',
        right:6,top:56
    });
    $div.append($sta);
    $ctr.append($div,$go);
    this.$frame.append($ctr);

    BODYH=$('body').height();//窗口高度
    bh=32*BODYH/480;//每块高度
    bw=32;//每块的宽度
    var act1={
        maxspeed:110,
        xspeed:12,
        yspeed:10,
        Rimg:'images/biker04.png',
        RimgB:'images/cha04.png',
        Mimg:'images/moto0'+getRandom(1,5)+'.png',
        Wimg:'images/wheel0'+getRandom(1,6)+'.png',
        rnk:0,
        tim:0,
    };
    //var act1=actor;
    function randomActor(){
        var a=getRandom(1,7);
        var act={
            maxspeed:getRandom(80,110),
            xspeed:getRandom(10,20),
            yspeed:getRandom(6,15),
            Rimg:'images/biker0'+a+'.png',
            RimgB:'images/cha0'+a+'.png',
            Mimg:'images/moto0'+getRandom(1,5)+'.png',
            Wimg:'images/wheel0'+getRandom(1,6)+'.png'
        };
        return act;
    }
    var map=new Map(this.$frame);
    //地图配置
    map.setEnd(500);
    //初始化地图数组(1000*200)
    var Marr=new Array(1000);
    for(var a=0;a<Marr.length;a++){
        Marr[a]=new Array(20);
    }
    //初始化障碍物
    var obs=new Obstacle(Marr);
    obs.coin(40);
    obs.tong(10);
    obs.water(20);
    obs.stang(10);
    map.roadBlock(obs.OBS);
    var rank=new RankBar($ctr);
    var timerbar=new TimerBar($div);
    var swig = new SwigBar($ctr);
    var a1 = new Actor(act1);
    var a2 = new Actor(randomActor());
    var a3 = new Actor(randomActor());
    var a4 = new Actor(randomActor());
    var speed=new SpeedBar($ctr,a1.maxspeed);
    var fin=new FinishBox(this.$frame);
    var money=new MoneyBar($ctr);
    a1.addTo(map.$me);
    a1.setPosition(200,9);
    a2.addTo(map.$me);
    a2.setPosition(180,7);
    a3.addTo(map.$me);
    a3.setPosition(240,11);
    a4.addTo(map.$me);
    a4.setPosition(280,13);
    var acts=[a1,a2,a3,a4];
    var gamTimer;
    function Intersects(r1,r2){
        //console.log(111)
        var rx=r1.Lef;
        var ry=r1.Top+80;
        var tx=r2.Lef;
        var ty=r2.Top+80;
        var rw=rx+120;
        var rh=ry+40;
        var tw=tx+120;
        var th=ty+40;
        return(
            (rw<rx ||rw>tx)&&(rh<ry || rh>ty)&&(tw<tx || tw>rx)&&(th<ty || th>ry)
        );

    }
    // console.log(Intersects(acts));
    function goGame(){
        gamTimer=setInterval(function(){
            a1.run(swig.X,swig.Y);
            a2.run(0.6,0);
            a3.run(0.6,0);
            a4.run(0.8,0);
            map.lookAt(a1.Lef-200);
            speed.getSpeed(a1.speed);
            obs.detect(a1,money);
            if(a1.Lef<=Mapend){
                rank.setRank(acts,a1);
            }
            timerbar.getTime(acts,a1);
            for(var i=1;i<4;i++){
                if(Intersects(a1,acts[i])){
                    if(a1.Lef>acts[i].Lef){
                        if(acts[i].speed>0){
                            acts[i].speed-=2;
                        }
                    }
                    else {
                        if(a1.speed>0){
                            a1.speed-=2;
                        }
                    }
                }
            }
            if(timerbar.overFlag){
                timerbar.gameover(gamTimer);
                fin.show();
                setTimeout(function(){
                    runSene('result',acts)
                },2000);
            }
        },40);
    }
    goGame();
    var startflag=false;
    $go.click(function(){
        startflag=!startflag;
        if(startflag){
            $(this).css({background:'url(images/start.png)'});
            timerbar.pause(gamTimer)
        }
        else{
            $(this).css({background:'url(images/pause.png)'});
            goGame()
        }
    })
}