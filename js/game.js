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
var bodyh;
var Mapend=0;
var bh,bw;
function Map($MainBody){
    var that=this;
    this.$me = $("<div></div>");
    this.$me.css({
        height: "100%", "background": "url(img/"+Missioni.map+".jpg) repeat-x,rgb(126,212,234)",
        "position":"absolute", "z-index": "10", "background-size": "4600px 90%"
    });
    this.$me.appendTo($MainBody);
    $MainBody.css({
        overflow: "hidden",position:"absolute","z-index":"10"
    });
    this.lookAt=function(x){
        that.$me.css("left",-x+"px");
    };
    /*起点*/
    var $start=$("<div></div>");
    $start.css({
        width:"252px",background:"url(img/end.png) no-repeat",position:"absolute",left:"200px",
        "backgroun-size":"500%",bottom:bodyh*0.1,height:254*((bodyh*0.9)/479)
    });
    var $end=$start.clone();
    this.setEnd=function(x){
        $end.css("left",(x*32)+"px");
        that.$me.css("width",(x*32+2000)+"px");
        Mapend=x*32;
    };
    this.roadBlock=function(obj){
        for(var i=0;i<obj.length;i++){
            var obj=obj;
            var rtop=obj.y*bh;
            var rlef=obj.x*bw;
            var $div=$("<div></div>");
            $div.css({
                position:"absolute",left:rlef,top:rtop,width:obj.w*bw,height:obj.h*bh
            });
            if(obj.t==1){
                $div.addClass("coin");
                $div.css({background: 'url(img/coins.png) no-repeat','z-index': '10',
                    'background-size': '100% 100%'
                });
                obj.div = $div;
            }
            else if(obj.t==2){
                $div.css({background: 'url(img/tong.png) no-repeat','z-index': '10','background-size': '100% 100%'})
            }
            else if(obj.t==3){
                $div.css({background: 'url(img/water.png) no-repeat','z-index': '8','background-size': '100% 100%',
                    'background-position': '0 center'
                })
            }
            else{
                $div.css({background: 'url(img/stang.png) no-repeat','z-index': '10','background-size': '100% 100%',
                })
            }
            this.$me.append($div);
        }
    };
    this.$me.append($start,$end);
};
function Games(actor){
    var that=this;
    this.$MainBody=$("<div onselectstart='return false'></div>");
    this.$MainBody.css({
        width:"100%",height:"100%"/*,"background-size":"cover","background-repeat":"no-repeat",
        "background-image":"url(img/guankbg.jpg)","background-position":"center center",position:"absolute"*/
    });
    this.$MainBody.appendTo(that.$MainBody);
    var $ctr=$("<div></div>");
    $ctr.css({
        width:"1000px",height:"100%",position:"absolute","z-index":"15",left:"50%","margin-left":"-500px"
    });
    var $t_div=$("<div></div>");
    $t_div.css({
        width:"410px",height:"70px",background:"url(img/time.png)",position:"absolute",left:"180px",top:"40px"
    });
    var $sta=$("<div></div>");
    $sta.css({
        "font-size":"200%",position:"absolute","font-weight":"bolder",top:"22px",left:"96px"
    });
    $sta.html(Missioni.blong+"—"+Missioni.sta);
    var $goto=$("<div></div>");
    $goto.css({
        width:"64px",height:"62px",background:'url(img/pause.png)',position:'absolute',right:"6px",top:"56px"
    });
    $t_div.append($sta);
    $ctr.append($t_div,$goto).appendTo(that.$MainBody);
    BODYH=$('body').height();//窗口高度
    bh=32*BODYH/480;//每块高度
    bw=32;//每块的宽度
    var act1=actor;
    function randomActor(){
        var a=getRandom(1,7);
        var act={
            maxspeed:getRandom(80,110),
            xspeed:getRandom(10,20),
            yspeed:getRandom(6,15),
            Rimg:'img/biker0'+a+'.png',
            RimgB:'img/cha0'+a+'.png',
            Mimg:'img/moto0'+getRandom(1,5)+'.png',
            Wimg:'img/wheel0'+getRandom(1,6)+'.png'
        };
        return act;
    };
    var map=new Map(that.$MainBody);
    map.setEnd(500);
    var Marr=new Array(1000);
    for(var j=0;j<Marr.length;j++){
        Marr[j]=new Array(20);
    }
    /*初始化*/
    var obs=new Obstacle(Marr);
    obs.coin(40);
    obs.tong(10);
    obs.water(20);
    obs.stang(10);
    map.roadBlock(obs.OBS);
    var rank=new RankBar($ctr);
    var timerbar=new TimerBar($t_div);
    var swig = new SwigBar($ctr);
    var a1 = new Actor(act1);
    var a2 = new Actor(randomActor());
    var a3 = new Actor(randomActor());
    var a4 = new Actor(randomActor());
    var speed=new SpeedBar($ctr,a1.maxspeed);
    var fin=new FinishBox(that.$MainBody);
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
    var gameTimer;
    function goGame(){
        gameTimer=setInterval(function(){
            a1.run(swig.X,swig.Y);
            a2.run(0.6,10);
            a3.run(0.6,220);
            a4.run(0.8,330);
            map.lookAt(a1.left-200);
            speed.getSpeed(a1.speed);
            obs.detect(a1,money);
            if(a1.left<=Mapend){
                rank.setRank(acts,a1);
            }
            timerbar.getTime(acts,a1);
            if(timerbar.overFlag){
                timerbar.gameover(gameTimer);
                fin.show();
                setTimeout(function(){
                   director.runScene(); /*结果界面*/
                },2000);
            }
        },10);
    }
    var start_flag=false;
    $goto.click(function(){
       start_flag=!start_flag;
        if(start_flag){
            $(that).css("background","url(img/start.png");
            timerbar.pause(gameTimer);
        }
        else{
            $(that).css("background","url(img/pause.png");
            goGame();
        }
    });
}

function SwigBar($parent){
    var BAR_SIZE = 200;
    var BAR_HSIZE = 100;
    var LCIR_R = 60;
    var SCIR_R = 20;
    var SC_BG = "rgba(100, 100, 100, 0.5)";
    var that = this;

    this.$me=$("<div></div>");
    this.$me.css({width:"200px",height:"200px",position:"absolute",left:"-10px",bottom:"-20px","z-index":"1000"});
    this.$me.appendTo($parent);
    this.X=0;
    this.Y=0;
    var W_BL = BAR_SIZE/this.$me.width();//本控件和父元素的宽之比
    var H_BL = BAR_SIZE/this.$me.height();//本控件和高元素的高之比

    this.$bar = $("<canvas width="+BAR_SIZE+" height="+BAR_SIZE+"></canvas>");
    this.$bar.css({width:"100%", height: "100%"});
    this.$bar.appendTo(this.$me);
    this.draw = function(ex, ey){
        var ctx = that.$bar[0].getContext("2d");
        ctx.clearRect(0, 0, BAR_SIZE, BAR_SIZE);
        ctx.beginPath();
        ctx.arc(BAR_HSIZE, BAR_HSIZE, LCIR_R, 0, 2*Math.PI);
        ctx.closePath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.beginPath();
        if(ex!=undefined){
            var lr = Math.sqrt(Math.pow(ex-BAR_HSIZE, 2)+ Math.pow(ey-BAR_HSIZE, 2));
            if(lr<LCIR_R){
                ctx.arc(ex, ey, SCIR_R, 0, 2*Math.PI);
                this.X=(ex-BAR_HSIZE)/LCIR_R;
                this.Y=(ey-BAR_HSIZE)/LCIR_R;
            }else {
                var xx = ex - BAR_HSIZE;//鼠标x和圆心x的差
                var dx = LCIR_R * xx / lr;//鼠标y和圆心y的差
                var yy = ey - BAR_HSIZE;//小圆现在所处x和圆心x的差
                var dy = LCIR_R * yy / lr;//小圆现在所处y和圆心y的差
                ctx.arc(BAR_HSIZE + dx, BAR_HSIZE + dy, SCIR_R, 0, 2 * Math.PI);
                this.X=dx/LCIR_R;
                this.Y=dy/LCIR_R;
            }
        }
        else{
            ctx.arc(BAR_HSIZE, BAR_HSIZE, SCIR_R, 0, 2*Math.PI);
        }
        ctx.closePath();
        ctx.fillStyle = SC_BG;
        ctx.fill();
        ctx.stroke();
    };
    this.draw();
    var dragging = false;
    this.$bar.mousedown(function(e){
        dragging = true;
        var ex = e.clientX-that.$bar.offset().left;
        var ey = e.clientY-that.$bar.offset().top;
        that.draw(ex*W_BL, ey*H_BL);
    });
    $(document).mousemove(function(e){
        if(dragging){
            var ex = e.clientX-that.$bar.offset().left;
            var ey = e.clientY-that.$bar.offset().top;
            that.draw(ex*W_BL, ey*H_BL);
            that.$bar.trigger("swig",
                [that.X, that.Y]);
        }
        e.preventDefault();
    });
    $(document).mouseup(function(e){
        dragging = false;
        that.draw();
        that.$bar.trigger("swig_end");
        that.X=0;
        that.Y=0;
        e.preventDefault();
    });

    this.on = function(event, fu){
        that.$bar.on(event, fu);
    }
}



function MotoBody(obj){
    var that=this;
    this.maxSpeed = obj.maxSpeed;
    this.$mbody = $("<div></div>");
    this.$mbody.css({
        "background-image": "url("+obj.Mimg+")",
        "background-repeat":"no-repeat",
        position: "absolute",
        top:"64px",left:"50%",
        "z-index":"5"
    });
    var $img=$('<img src='+obj.Mimg+'>');
    $img.load(function(){
        that.$mbody.css({
            width:$img[0].width,
            height:$img[0].height,
            "margin-left":$img[0].width*(-0.5)
        });
    });
}
function Wheel(obj){
    var that=this;
    this.yspeed=obj.yspeed;
    this.$wheel01 = $("<div></div>");
    this.$wheel01.css({
        "background-image": "url("+obj.Wimg+")",
        "background-repeat":"no-repeat",
        position: "absolute",
        top:"76px",
        "z-index":"2"
    });
    this.$wheel02 = this.$wheel01.clone();
    this.$wheel01.css("left","5px");
    this.$wheel02.css("right","12px");
    var $img=$('<img src='+obj.Wimg+'>');
    $img.load(function(){
        that.$wheel01.css({
            width:$img[0].width,
            height:$img[0].height,
        });
        that.$wheel02.css({
            width:$img[0].width,
            height:$img[0].height,
        });
    });
};
function Rider(obj){
    //获取加速度。最大速度、换道速度
    var that=this;
    this.$rider = $("<div></div>");
    this.$rider.css({
        "background-image": "url("+obj.Rimg+")",
        width:"56px",
        height:"94px",
        "background-repeat":"no-repeat",
        position: "absolute",
        top:"0px",left:'50%',
        "z-index":"10"
    });
    var $img=$('<img src='+obj.Rimg+'>');
    $img.load(function(){
        that.$rider.css({
            width:$img[0].width,
            height:$img[0].height,
            "margin-left":$img[0].width*(-0.5)
        });
    });
}
var speed=0;
function downSpeed(speed,num){
    if(speed>0){
        speed-=num;
    }
    else{
        speed=0;
    }
    return speed;
}
function Actor(obj){
    this.img=obj.Rimg;
    this.imgB=obj.RimgB;
    this.xspeed=obj.xspeed;
    this.yspeed=obj.yspeed;
    var maxspeed=obj.maxspeed;
    this.maxspeed=maxspeed;
    this.Top=0;
    var xspeed=obj.xspeed;
    var yspeed=obj.yspeed;
    var rider=new Rider(obj);
    var motobody=new MotoBody(obj);
    var wheel=new Wheel(obj);
    var $act = $("<div></div>");
    $act.addClass('renren');
    $act.css({
        position: "absolute",'z-index': '15'
    });
    $act.append(rider.$rider);
    $act.append(motobody.$mbody);
    $act.append(wheel.$wheel01);
    $act.append(wheel.$wheel02);
    this.addTo=function($parent){
        $act.appendTo($parent);
        $act.css({left: "0px", top: "0px"});
    };
    var deg=0;
    this.speed=0;
    function upSpeed(speed,x){
        if(speed<maxspeed){
            speed+=xspeed*x/50;
        }
        else{
            speed=maxspeed;
        }
        return speed;
    }
    this.run=function(x,y){
        //判断是否到达终点
        if(this.Lef<Mapend){
            //加速
            if(x>0){
                this.speed=upSpeed(this.speed,x);
            }
            //减速
            else{
                this.speed=downSpeed(this.speed,2);
            }
            //换道
            if(this.speed>0){
                this.Top+=y*(yspeed*0.2);
                if(this.Top+120<7*bh){
                    this.Top=7*bh-120;
                }
                if(this.Top+100>13*bh){
                    this.Top=13*bh-100
                }
                $act.css({top: this.Top});
            }
        }
        else {
            this.speed=downSpeed(this.speed,2);
        }
        this.Lef+=(this.speed)*0.1;
        $act.css({left: this.Lef});
        //控制轮胎转动的速度
        deg+=this.speed*0.6;
        wheel.$wheel01.css("transform", "rotate("+deg+"deg)");
        wheel.$wheel02.css("transform", "rotate("+deg+"deg)");
    };
    this.setPosition = function(x, y){

        $act.css({left: x+"px", top: (y*bh-100)+"px"});
        this.Lef=x;
        this.Top=(y*bh-100);
    };
    this.getX = function(){
        return parseInt(this.Lef/bw);
    };
    this.getY = function(){
        return parseInt((this.Top+100)/bh);
    };
    this.w=parseInt(120/bw);
    this.h=parseInt(120/bh)-2;
}
function SpeedBar($parent,maxspeed){
    this.$me=$("<div></div>");
    this.$me.css({
        width:"218px",height:"50px",position: "absolute",top:"126px",right:"100px","z-index":"20","background-image":"url(img/border.png)"});
    this.$me.appendTo($parent);
    this.$bar=$("<div></div>");
    this.$bar.css({height: "100%",width:"0","background-image":"url(img/speed.png)"
    });
    this.$bar.appendTo(this.$me);
    this.getSpeed=function(speed){
        if(speed==maxspeed){
            speed=maxspeed*0.8
        }
        this.$bar.width(218*(speed/maxspeed));
    };
}
function TimerBar($parent){
    var k=0;
    var timer1=0;
    var that=this;
    this.overFlag=false;
    this.$bar=$("<div></div>");
    this.$bar.html("00:00:0");
    this.$bar.css({
        "font-size":"40px",position:"absolute",'font-weight': 'bolder',
        top:22,right:12
    });
    this.$bar.appendTo($parent);
    function getTimeTxt(n){
        var i=parseInt(n/2.5);
        var min=parseInt(i/600);
        var s=parseInt(i%600/10);
        var m=i%10;
        if(min<10){
            min="0"+min;
        }
        if(s<10){
            s="0"+s;
        }
        var txt=min+":"+s+":"+m;
        return txt;
    }
    this.getTime=function(objs,me){
        var len=objs.length;
        var arr=new Array(len);
        var sum=0;
        //为每个对象添加tim属性获取比赛用时
        for(var i=0;i<len;i++){
            if(objs[i].Lef<=Mapend){
                objs[i].tim=getTimeTxt(k);
                arr[i]=0;
            }
            else {
                arr[i]=1;
            }
            sum+=arr[i];

        }
        if(sum==len){
            this.overFlag=true;
        }
        that.$bar.html(me.tim);
        k++;
    };
    this.pause=function(timer){
        clearInterval(timer);
    };
    this.gameover=function(timer){
        this.pause(timer);
        k=0;
    };
    this.setPosition=function(x,y){
        this.$bar.css({
            left:x,top:y
        });
    }
}
function RankBar($parent){
    this.$bar=$("<div></div>");
    this.$bar.css({
        width:"141px",height:"133px",background:'url(img/rank.png)',position:'absolute',left:"0px",top:"20px"
    });
    var $num=$("<div></div>");
    $num.css({
        width:"141px",height:"133px"
    });
    this.getRank=function(i){
        $num.css('background','url(img/'+i+'.png) no-repeat center 60%/60%')
    };
    this.$bar.append($num);
    function sortNumber(a,b)
    {
        return a - b
    }

    this.setRank=function(objs,that){
        //排序
        var len=objs.length;
        var arr=[];
        for(var i=0;i<len;i++){
            arr.push(objs[i].Lef)
        }
        arr.sort(sortNumber);
        //为每个对象添加rnk属性
        for(var i=0;i<len;i++){
            var obj=objs[i];
            //console.log(obj.Lef)
            for(var k=0;k<len;k++){
                if(obj.Lef==arr[k]){
                    obj.rnk=len-k;
                    break;
                }
            }
        }
        this.getRank(that.rnk);
    };
    $parent.append(this.$bar);
}
function MoneyBar($parent){
    this.$bar=$("<div></div>");
    this.$bar.css({
        width:"240px",height:"68px",background:'url(img/money.png)',position:'absolute',right:"100px",top:"46px"
    });
    var $coins=$("<div></div>");
    $coins.css({
        "font-size":"40px",position:"absolute",'font-weight': 'bolder',top:"16px",left:"96px"
    });
    var arr=[];
    this.setCoin=function(num,obj){
        var len=arr.length;
        if(arr[len-1]!=num){
            arr.push(num);
        }
        $coins.html('+'+arr.length);
        obj.coin=arr.length;
    };
    this.$bar.append($coins);
    $parent.append(this.$bar);
}
function Obstacle(map){
    this.OBS=[];
    this.coin=function(num){
        var xarr=randomArr(6,80);
        for(i=0;i<num;i++){
            var coin={
                t:1,w:2,h:2,
                x:xarr[i]*6,
                y:getRandom(5,11),
                num:i+1
            };
            for(var a=coin.x;a<(coin.x+coin.w);a++){
                for(var b=coin.y;b<(coin.y+coin.h);b++){
                    map[a][b]=coin;

                }
            }
            this.OBS.push(coin);
        }
    };
    this.tong=function(num){
        var xarr=randomArr(20,100);
        for(i=0;i<num;i++){
            var tong={
                t:2,w:4,h:2,
                x:xarr[i]*4,
                y:getRandom(8,12)
            };
            for(var a=tong.x;a<(tong.x+tong.w);a++){
                for(var b=tong.y+1;b<(tong.y+tong.h);b++){
                    map[a][b]=tong.t;
                }
            }
            this.OBS.push(tong)
        }
    };
    this.water=function(num){
        var xarr=randomArr(20,100);
        for(i=0;i<num;i++){
            var water={
                t:3,w:5,h:1,
                x:xarr[i]*4,
                y:getRandom(6,12)
            };
            for(var a=water.x;a<(water.x+water.w);a++){
                for(var b=water.y;b<(water.y+water.h);b++){
                    map[a][b]=water.t;
                }
            }
            this.OBS.push(water)
        }
    };
    this.stang=function(num){
        var xarr=randomArr(20,100);
        for(i=0;i<num;i++){
            var stang={
                t:4,w:4,h:1,
                x:xarr[i]*4,
                y:getRandom(6,11)
            };
            for(var a=stang.x;a<(stang.x+stang.w);a++){
                for(var b=stang.y;b<(stang.y+stang.h);b++){
                    map[a][b]=stang.t;
                }
            }
            this.OBS.push(stang)
        }
    };
    var m=0;
    this.detect=function(obj,obj1){
        var x = obj.getX(),y = obj.getY();
        var w = obj.w,h = obj.h;
        var p1=map[x][y],p2=map[x+w][y],p3=map[x+h][y],p4=map[x+w][y+h];
        if(p1){
            if(p1==2){
                obj.speed=0;

            }
            else if(p1==3){
                obj.Lef+=2;
            }
            else if(p1==4){
                obj.speed=downSpeed(obj.speed,0.6);
            }
            else{
                p1.div.remove();
                obj1.setCoin(p1.num,obj)
            }
        }
        if(p2){
            if(p2==2){
                obj.speed=0;
            }
            else if(p2==3){
                obj.Lef+=2;
            }
            else if(p2==4){
                obj.speed=downSpeed(obj.speed,0.6);
            }
            else{
                p2.div.remove();
                obj1.setCoin(p2.num,obj)
            }
        }
        if(p3){
            if(p3==2){
                obj.speed=0;
            }
            else if(p3==3){
                obj.Lef+=2;
            }
            else if(p3==4){
                obj.speed=downSpeed(obj.speed,0.6);
            }
            else{
                p3.div.remove();
                obj1.setCoin(p3.num,obj)
            }
        }
        if(p4){
            if(p4==2){
                obj.speed=0;
            }
            else if(p4==3){
                obj.Lef+=2;
            }
            else if(p4==4){
                obj.speed=downSpeed(obj.speed,0.6);
            }
            else{
                p4.div.remove();
                obj1.setCoin(p4.num,obj)
            }
        }
    };
}



















