/**
 * Created by Administrator on 2016/5/17.
 */
var db= openDatabase("MY_games18","1.0.1","我的本地数据库",3*1024);
$(function(){
    db.transaction(function(tx){
        /*用户资料列表*/
        tx.executeSql("create table if not exists users(" +
            "id          integer primary key autoincrement," +
            "login       text    unique  not null, " +
            "password    text    NOT NULL," +
            "u_name      text    unique  not null," +
            "level       integer not null," +           /*角色等级*/
            "money       integer not null," +
            " online_time float," +
            "last_time   date);");
        var user_table="insert into users (id,login, password, u_name, level, money)values (?, ?,?,?,1,?)";
        tx.executeSql(user_table,[1,"admin","123456","我喜欢",666666666]);
        tx.executeSql(user_table,[2,"lucifer","123456","Lucifer",100000]);
        ///!*装备属性列表*!/
           tx.executeSql("create table if not exists equipment(" +
            "id         integer primary key autoincrement," +
            "name       text    unique, " +
            "type       integer not null," +
            "value_type integer," +
            "value      integer," +                         /*属性*/
            "degree     integer default ( 1 )," +       /*等级*/
            " price     integer not null," +
            "img        text    not null," +
            "img2       text not null);");
        var equipment_table="insert into equipment(name, type, value_type, value, price, img,img2)values(?, ?, ?, ?, ?, ?,?)";
        tx.executeSql(equipment_table,["哈雷摩托",1,1,110,8000,"img/m1s.png","img/m1.png"],null,function(e,tx){alert(e.messages)});
        tx.executeSql(equipment_table,["滑板车",1,1,76,5520,"img/m2s.png","img/m2.png"]);
        tx.executeSql(equipment_table,["奔驰",1,1,86,5600,"img/m3s.png","img/m3.png"]);
        tx.executeSql(equipment_table,["宝马",1,1,100,6870,"img/m4s.png","img/m4.png"]);    /*摩托车*/
        tx.executeSql(equipment_table,["A1",2,2,10,1800,"img/w1s.png","img/w1.png"]);
        tx.executeSql(equipment_table,["A2",2,2,11,1830,"img/w2s.png","img/w2.png"]);
        tx.executeSql(equipment_table,["A3",2,2,14,2300,"img/w3s.png","img/w3.png"]);
        tx.executeSql(equipment_table,["A4",2,2,15,4200,"img/w1s.png","img/w1.png"]);
        tx.executeSql(equipment_table,["A5",2,2,18,4830,"img/w2s.png","img/w2.png"]);
        tx.executeSql(equipment_table,["A6",2,2,22,5300,"img/w3s.png","img/w3.png"]);       /*摩托车轮*/
        tx.executeSql(equipment_table,["TSI",3,3,10,3680,"img/engine01.png","img/engine01.png"]);
        tx.executeSql(equipment_table,["TFSI",3,3,12,8888,"img/engine03.png","img/engine03.png"]);
        tx.executeSql(equipment_table,["AMG",3,3,14,2300,"img/engine04.png","img/engine04.png"]);
        tx.executeSql(equipment_table,["CDI",3,3,18,9080,"img/engine05.png","img/engine05.png"]);
        tx.executeSql(equipment_table,["V7",3,3,19,10010,"img/engine06.png","img/engine06.png"]);
        tx.executeSql(equipment_table,["V587",3,3,22,12300,"img/engine07.png","img/engine07.png"]);  /*引擎动机*/
        /*车手属性列表*/
        tx.executeSql("create table if not exists riders(" +
            "id         integer primary key autoincrement," +
            "r_name     text    unique," +
            "price      integer not null," +
            "img_1      text    not null," +
            "img_2      text    not null," +
            "skill      text," +
            "r_level    integer default ( 1 ));");
        var riders_table="insert into riders(r_name,price,img_1,img_2,skill) values(?,?,?,?,null);"
        tx.executeSql(riders_table,["来买我",1000,"img/c1s.png","img/c1.png"]);
        tx.executeSql(riders_table,["带走我",2000,"img/c2s.png","img/c2.png"]);
        tx.executeSql(riders_table,["大麻哈1",3000,"img/c3s.png","img/c3.png"]);
        tx.executeSql(riders_table,["大麻哈2",4000,"img/c4s.png","img/c4.png"]);
        tx.executeSql(riders_table,["大麻哈3",500,"img/c5s.png","img/c5.png"]);
        tx.executeSql(riders_table,["大麻哈4",6000,"img/c6s.png","img/c6.png"]);
        tx.executeSql(riders_table,["大麻哈5",7000,"img/c7s.png","img/c7.png"]);
        tx.executeSql(riders_table,["大麻哈6",8000,"img/c8s.png","img/c8.png"]);      /*骑手*/
        /*用户拥有的车手列表*/
        tx.executeSql("create table if not exists user_rider(" +
            "userid     integer references users ( id )," +
            "riderid    integer references rider ( id )," +
            "blong_time date," +
            "now_value  integer default ( 1 )," +
            "degree     integer default ( 1 )," +
            "CONSTRAINT pk_ur PRIMARY KEY ( userid, riderid ));");
        tx.executeSql("insert into user_rider(userid,riderid) values(2,2);");
        var user_rider_table="insert into user_rider(userid,riderid) values(?,?);";
        tx.executeSql(user_rider_table,[1,1]);
        tx.executeSql(user_rider_table,[1,2]);
        tx.executeSql(user_rider_table,[1,3]);
        /*用户拥有的车子列表*/
        tx.executeSql("create table if not exists user_bike(" +
            "id         integer primary key autoincrement," +
            "userid     integer references users (id)," +
            "bikebody   integer not null," +
            "tyre       integer not null," +
            "engine     integer not null," +
            "blong_time date," +
            "now_value  integer," +
            "degree     integer)");
        /*用户装备列表*/
        tx.executeSql("create table if not exists user_equip(" +
            "userid     integer references users ( id )," +
            "equipid    integer references equipment ( id )," +
            "now_value  integer default ( 1 )," +
            "degree     integer default ( 1 )," +
            "blong_time date," +
            "CONSTRAINT pk_ue PRIMARY KEY ( userid, equipid ));");
        var user_equip_table="insert into user_equip(userid,equipid) values(?,?);";
        tx.executeSql(user_equip_table,[1,1]);
        tx.executeSql(user_equip_table,[1,12]);
        tx.executeSql(user_equip_table,[1,15]);
        /*关卡列表*/
        tx.executeSql("create table if not exists mission (" +
            "id         integer primary key autoincrement," +
            "name     text," +
            "descript text," +
            "level    integer default ( 1 )," +
            "belong   integer," +
            "map      text," +
            "conf     text," +
            "img      text);");
        var mission_table="insert into mission(name,belong,map,img) values(?,?,?,?);";
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map01.jpg"]);
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map02.jpg"]);
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map03.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map01.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map02.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map03.jpg"]);
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map01.jpg"]);
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map02.jpg"]);
        tx.executeSql(mission_table,["沙漠",1,"match01.png","map03.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map01.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map02.jpg"]);
        tx.executeSql(mission_table,["城市",2,"match02.png","map03.jpg"]);
        /*用户关卡列表*/
        tx.executeSql("create table if not exists user_mission (" +
            "userid     integer references users ( id )," +
            "missionid  integer references mission ( id )," +
            "degree     integer," +
            "CONSTRAINT pk_ue PRIMARY KEY ( userid, missionid));");
        var user_mission_table="insert into user_mission(userid,missionid,degree) values(?,?,?);";
        tx.executeSql(user_mission_table,[1,1,1]);
        /*tx.executeSql(user_mission_table,[1,2,1]);
        tx.executeSql(user_mission_table,[1,3,1]);
        tx.executeSql(user_mission_table,[1,4,2]);
        tx.executeSql(user_mission_table,[1,5,2]);
        tx.executeSql(user_mission_table,[1,6,2]);
        tx.executeSql(user_mission_table,[1,7,3]);
        tx.executeSql(user_mission_table,[1,8,3]);
        tx.executeSql(user_mission_table,[1,9,3]);*/
        /*用户跑完的比赛的结果列表*/
        tx.executeSql("create table if not exists match_result (" +
            "userid     integer references users ( id )," +
            "missionid  integer references mission ( id )," +
            "match_time date," +
            "result     integer," +
            "award      integer," +
            "CONSTRAINT pk_mr PRIMARY KEY ( userid, missionid, match_time ));");
    });
});
