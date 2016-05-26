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
/*分页 参数1：位置 参数2：页码*/
function PageBar($target,pages){
    var that=this;
    var pagei=1;
    $(".pageBar").remove();
    $target.css({
        top:0
    });
    if(pages>1){
        var $bar=$("<ul onselectstart='return false'></ul>");
        $bar.addClass("pageBar");
        $bar.css({
            width: 470,height: 43,position: 'absolute',right:12,bottom:40,'text-align':'center'
        });
        var $last=$('<li></li>');
        $last.css({
            'vertical-align': 'middle',width: 43,height: 43,'line-height': '43px','text-align': 'center',
            margin:'0 2px',cursor: 'pointer',background: 'url(img/buy-left.png)'
        });
        $bar.append($last);
        var $next=$last.clone().css('transform','rotateY(180deg)');
        for(var i=0;i<pages;i++){
            var $pagei=$last.clone();
            $pagei.css({
                'font-size': '30px','font-weight': 'bolder',background:'none'
            });
            $pagei.addClass("pagei");
            $pagei.html(i+1);
            $bar.append( $pagei);
        };
        $bar.append($next);
        this.setTo=function($parent){
            $bar.appendTo($parent);
        };
        this.setPageTo=function(i){
            $('.pagei').css('color','#c1c1c1');
            $('.pagei:eq('+i+')').css('color','#000');
            var hei=$target.parent().height();
            $target.css({
                top:-hei*i
            });
            pagei=i;
        };
        this.setPosion=function(rig,bot){
            $bar.css({
                right:rig,bottom:bot
            });
        };
        $last.click(function(){
            if(pagei!=0){
                pagei--;
                that.setPageTo(pagei);
            }
        });
        $next.click(function(){
            if(pagei!=pages-1){
                pagei++;
                that.setPageTo(pagei);
            }
        });
        $bar.on("click","[class='pagei']",function(){
            var i=$(this).index()-1;
            that.setPageTo(i);
        });
    }
    else{
        this.setTo=function(){};
        this.setPageTo=function(){};
    }
}
/*获取数据*/
function GetData(){
    var that=this;
    this.$obj=$("<div></div>");
    /*车手*/
    this.riderData=function(select,parameter,eve){
        var arr=new Array;
        db.transaction(function(tx){
           tx.executeSql(select,parameter,function(tx,results){
               var len=results.rows.length;
               for(var i=0;i<len;i++){
                   var rider={
                       img:results.rows.item(i).img_1,
                       img2:results.rows.item(i).img_2,
                       price:results.rows.item(i).price,
                       name:results.rows.item(i).r_name,
                       id:results.rows.item(i).id
                   };
                   arr.push(rider);
               }
               that.$obj.trigger(eve,[arr]);
           },null);
        });
        return arr;
    }
    /*装备*/
    this.equipData=function(select,parameter,eve){
        var arr=new Array;
        db.transaction(function(tx){
            tx.executeSql(select,parameter,function(tx,results){
                var len=results.rows.length;
                for(var i=0;i<len;i++){
                    var equip={
                        img:results.rows.item(i).img,
                        img2:results.rows.item(i).img2,
                        price:results.rows.item(i).price,
                        name:results.rows.item(i).name,
                        type:results.rows.item(i).type,
                        id:results.rows.item(i).id,
                        value_type:results.rows.item(i).value_type,
                        val:results.rows.item(i).value
                    };
                    arr.push(equip);
                }
                that.$obj.trigger(eve,[arr]);
            },null);
        });
        return arr;
    }
    /*关卡*/
    this.missionData=function(select,parameter,eve){
        var arr=[];
        db.transaction(function(tx){
            tx.executeSql(select,parameter,function(tx,results){
                var len=results.rows.length;
                for(var i=0;i<len;i++){
                    var mission={
                        img:results.rows.item(i).img,
                        map:results.rows.item(i).map,
                        level:results.rows.item(i).level,
                        id:results.rows.item(i).id,
                    };
                    arr.push(mission);
                };
                that.$obj.trigger(eve,[arr]);
            },null);
        });
        return arr;
    };
    /*地图*/
    this.matchData=function(select,parameter,eve){
        db.transaction(function(tx){
            var missions=[];
            tx.executeSql(select,parameter,function(tx,results){
                var len=results.rows.length;
                for(var i=0;i<len;i++){     /*获取赛事地图*/
                  if(!results.rows.item(i).belong){
                      var match={
                          img:results.rows.item(i).img,
                          lock:true
                      };
                      missions.push(match);
                  }
                    else{
                      break;
                  }
                };
                for(var j=0;j<len;j++){
                    if(!results.rows.item(j).degree){
                        var matchI=results.rows.item(j).belong; /*获取未玩过的第一张图*/
                        var nowMatch=results.rows.item(j).id-1;
                        for(var k=0;k<len;k++){
                            if(results.rows.item(k).belong>matchI){
                                var fin=results.rows.item(k-1).id;
                                break;
                            }
                        }
                        break;
                    }
                }
                if(nowMatch==fin){
                    matchI++;
                }
                for(var m=0;m<matchI;m++){
                    missions[m].lock=false;
                }
                that.$obj.trigger(eve,[arr]);
            },null);
        });
    };
    this.on=function(event,f){
        that.$obj.on(event,f);
    }
}
var data=new GetData();

