const http = require("http");
const fs = require("fs");
const path = require("path");
const superagent = require("superagent");
const cheerio = require("cheerio");
const mysql = require("mysql");

//创建连接池
let pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    database:"dota-test",
    password:"",
    port:3306,
    connectionLimit:25
});


//todo 创建一个构造多层文件的函数
function mkdir(dirpath,dirname){
    //判断是否是第一次调用
    if(typeof dirname === "undefined"){
        if(fs.existsSync(dirpath)){
            return;
        }else{
            mkdir(dirpath,path.dirname(dirpath));
        }
    }else{
        //判断第二个参数是否正常，避免调用时传入错误参数
        if(dirname !== path.dirname(dirpath)){
            mkdir(dirpath);
            return;
        }
        if(fs.existsSync(dirname)){
            fs.mkdirSync(dirpath)
        }else{
            mkdir(dirname,path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}

// let url = "http://www.dota2.com.cn/hero/vengeful_spirit/";

//todo 第一步 传入一个url 地址 读取页面 的内容 保存在电脑内存中
function downLoad(url){
    let lastName = url.slice(url.slice(0,url.length-2).lastIndexOf("/")+1,url.length-1);
    let fileAddress = `./file/${lastName}.html/`;
    fs.writeFileSync(fileAddress,'');  //将原文件清空
    return new Promise((ress,err)=>{
        http.get(url,(res)=>{
            // let writer = fs.createWriteStream(fileAddress);
            res.on('data',(buf)=>{
                // console.log(buf);
                let msg = buf.toString('utf-8');
                fs.appendFileSync(fileAddress,msg);
                console.log(fileAddress+"写入完毕");
                ress(fileAddress);
            })
        }).on("error",(e)=>{
            console.error(`${e.message}`);
        })
    })
}



// todo 第二步  读取电脑中的文件 读取关键信息
/*
*   计划将所有有用的数据保存在一个数组中
*   var allMsg = [
*       {
*        hero_name
         hero_cname            #中文名
         main_attribute        #主属性   **
         other_name            #其他简称
         camp                  #阵营 天辉 或者 夜魇
         attack_type           #攻击类型   近战或远程

*       },
*       {}]
* */
// let fileAddress = './file/chen.html/';
// getMsg(fileAddress);
// thelastfn();
function getMsg(fileAddress){
    return new Promise((res,err)=>{
        let obj = new Object();

        fs.readFile(fileAddress,(err,buf)=>{
            if(err) throw err;
            console.log("操作文件名为"+fileAddress);
            var str = buf.toString();
             // console.log(str);
            // console.log(str);   //得到了完整的数据
            let $ = cheerio.load(str);
            obj.heroes_data = {};
            obj.heroes_data.hero_cname = $(".top_hero_card p span").text().trim();
            obj.heroes_data.hero_name = $(".top_hero_card p").text().slice(obj.heroes_data.hero_cname.length).trim();
            obj.heroes_data.other_name = $(".hero_info>.info_ul>li:last-child>.info_p").text().trim();
            obj.heroes_data.camp = $(".zhengying_p").text().trim();
            obj.heroes_data.attack_type =$(".hero_info>.info_ul>li:first-child>.info_p").text().trim();

            obj.hero_location={};
            let heroes_location = $(".hero_info>.info_ul>li:nth-child(2)>.info_p>span").text().trim();
            obj.hero_location.hexin =heroes_location.indexOf("核心")==-1?"0":"1";
            obj.hero_location.kongzhi =heroes_location.indexOf("控制")==-1?"0":"1";
            obj.hero_location.duixianfuzhu =heroes_location.indexOf("对线辅助")==-1?"0":"1";
            obj.hero_location.xianshou =heroes_location.indexOf("先手")==-1?"0":"1";
            obj.hero_location.daye =heroes_location.indexOf("打野")==-1?"0":"1";
            obj.hero_location.fuzhu =heroes_location.indexOf("辅助")==-1?"0":"1";
            obj.hero_location.naijiu =heroes_location.indexOf("耐久")==-1?"0":"1";
            obj.hero_location.baofa =heroes_location.indexOf("高爆发")==-1?"0":"1";
            obj.hero_location.tuijin =heroes_location.indexOf("推进")==-1?"0":"1";
            obj.hero_location.taosheng =heroes_location.indexOf("逃生")==-1?"0":"1";
            /*
             hexin                 #核心
             kongzhi               #控制
             duixianfuzhu          #对线辅助
             xianshou              #先手
             daye                  #打野
             fuzhu                 #辅助
             naijiu                #耐久
             baofa                 #爆发
             tuijin                #推进
             taosheng              #逃生33
            * */


            /*
            * power_initial          #初始的力量值
             brains_initial         #初始的智力值
             agility_initial        #初始的敏捷值
             power_grow             #力量成长值
             brains_grow            #智力成长值
             agility_grow           #敏捷的成长值
             move_speed             #英雄的初始移动速度
             armor                  #英雄的初始护甲
             attack_value           #初始的攻击力
             attack_speed           #攻击速度
             attack_harm            #攻击伤害  字符窜
             attack_range           #攻击范围   int
            * */
            obj.hero_property={};
            obj.hero_property.power_initial = parseInt($(".pro6_box>li:first-child").text().trim().slice(0,2));
            obj.hero_property.power_grow = parseFloat($(".pro6_box>li:first-child").text().trim().slice(5,8));
            obj.hero_property.brains_initial = parseInt($(".pro6_box>li:nth-child(2)").text().trim().slice(0,2));
            obj.hero_property.brains_grow = parseFloat($(".pro6_box>li:nth-child(2)").text().trim().slice(5,8)) || 0;
            obj.hero_property.agility_initial = parseInt($(".pro6_box>li:nth-child(3)").text().trim().slice(0,2));
            obj.hero_property.agility_grow = parseFloat($(".pro6_box>li:nth-child(3)").text().trim().slice(5,8));
            obj.hero_property.move_speed = parseInt($(".pro6_box>li:last-child").text().trim());
            obj.hero_property.armor = parseInt($(".pro6_box>li:nth-child(5)").text().trim().slice(0,1));
            // console.log($(".pro6_box>li:nth-child(3)").text().trim());

            let attack_msg = $(".pro6_box>li:nth-child(4)").text().trim();
            let attacknum1 = attack_msg.indexOf("攻击速度");
            let attacknum2 = attack_msg.indexOf("攻击伤害");
            let attacknum3 = attack_msg.indexOf("攻击距离");
            obj.hero_property.attack_value =parseInt(attack_msg.slice(0,2));
            obj.hero_property.attack_speed = attack_msg.slice(attacknum1+5,attacknum2-2).trim().replace(/\t/g,"");
            obj.hero_property.attack_harm =attack_msg.slice(attacknum2+5,attacknum3-2).trim().replace(/\t/g,"");
            obj.hero_property.attack_range = parseInt(attack_msg.slice(attacknum3+5).trim());

            /*
            *    hero_story1           #英雄故事背景1
                 hero_story2           #英雄故事背景2
                 hero_story3           #英雄故事背景3
                 hero_video            #视频攻略
            * */
            obj.hero_intro={};
            obj.hero_intro.hero_story1 = $(".story_box").text().trim();
            obj.hero_intro.hero_story2 = '';
            obj.hero_intro.hero_story3 = '';
            obj.hero_intro.hero_video = $(".video_box>.v_tab>li").attr("videourl") || "";


            /*
            * table6   hero_dower{        天赋树
                     did
                     hero_id
                     dower10_part1         #英雄10级天赋 第一部分
                     dower10_part2         #英雄10级天赋 第二部分
                     dower15_part1         #英雄15级天赋 第一部分
                     dower15_part2         #英雄15级天赋 第二部分
                     dower20_part1         #英雄20级天赋 第一部分
                     dower20_part2         #英雄20级天赋 第二部分
                     dower25_part1         #英雄25级天赋 第一部分
                     dower25_part2         #英雄25级天赋 第二部分
             }
            * */
            obj.hero_dower={};
            obj.hero_dower.dower10_part1 = $(".talent_ul>li:last-child>div:first-child").text();
            obj.hero_dower.dower10_part2 = $(".talent_ul>li:last-child>div:last-child").text();
            obj.hero_dower.dower15_part1 = $(".talent_ul>li:nth-child(3)>div:first-child").text();
            obj.hero_dower.dower15_part2 = $(".talent_ul>li:nth-child(3)>div:last-child").text();
            obj.hero_dower.dower20_part1 = $(".talent_ul>li:nth-child(2)>div:first-child").text();
            obj.hero_dower.dower20_part2 = $(".talent_ul>li:nth-child(2)>div:last-child").text();
            obj.hero_dower.dower25_part1 = $(".talent_ul>li:first-child>div:first-child").text();
            obj.hero_dower.dower25_part2 = $(".talent_ul>li:first-child>div:last-child").text();

            /* table7  英雄技能介绍
            * skill1_title           #技能一的标题
             skill1_pic             #技能一的图片
             skill1_intro1           #技能一的简单描述
             skill1_intro2          #技能一的特殊描述
             skill1_spell           #魔法消耗
             skill1_cooling         #冷却时间
             skill1_effect          #技能效果
             #采用一个长段的字符串 来全部描述出技能的效果  中间采用特殊字符的方式来区分名称以及效果
             skill1_video           #技能的视屏展示
             skill1_supplement      #技能一的技能补充
            * */
            obj.hero_skill={};
            for(let i = 0;i<4;i++){
                obj.hero_skill["skill"+(i+1)+"_title"] =$("[jnxs="+i+"] .skill_intro span").text().trim();
                obj.hero_skill["skill"+(i+1)+"_pic"] = $("[jnxs="+i+"] .skill_b").attr("src").trim();
                obj.hero_skill["skill"+(i+1)+"_intro1"]=$("[jnxs="+i+"] .color_green").text().trim();
                obj.hero_skill["skill"+(i+1)+"_intro1"] =$("[jnxs="+i+"] .skill_intro").text().trim().slice($("[jnxs=1] .skill_intro").text().trim().lastIndexOf("\t")+1);
                obj.hero_skill["skill"+(i+1)+"_spell"] = $("[jnxs="+i+"] .xiaohao_wrap .icon_xh").text().trim();
                obj.hero_skill["skill"+(i+1)+"_cooling"] = $("[jnxs="+i+"] .xiaohao_wrap .icon_lq").text().trim();
                obj.hero_skill["skill"+(i+1)+"_effect"] =$("[jnxs="+i+"] .skill_ul").text().trim().replace(/\t/g,"");
                obj.hero_skill["skill"+(i+1)+"_video"]=$("[jnxs="+i+"] .btn_skill_v").attr("videourl");
                obj.hero_skill["skill"+(i+1)+"_supplement"]=$("[jnxs="+i+"] .skill_bot").text().trim();
            }

            /* table 8
             skill1_sm_pic          #技能一小图片
             skill2_sm_pic          #技能二小图片
             skill3_sm_pic          #技能三小图片
             skill4_sm_pic          #技能四小图片
             skill5_sm_pic          #技能五小图片
             punctuate              #推荐加点顺序
             #采用长字符窜的 方式 向“32514325”
            * */
            obj.hero_punctuate={};
            obj.hero_punctuate.skill1_sm_pic = $(".ability_box>.point_wrap:nth-child(1)>img").attr("src");
            obj.hero_punctuate.skill2_sm_pic = $(".ability_box>.point_wrap:nth-child(2)>img").attr("src");
            obj.hero_punctuate.skill3_sm_pic = $(".ability_box>.point_wrap:nth-child(3)>img").attr("src");
            obj.hero_punctuate.skill4_sm_pic = $(".ability_box>.point_wrap:nth-child(4)>img").attr("src") || "";
            obj.hero_punctuate.skill5_sm_pic = "";
            obj.hero_punctuate.punctuate = "";
            for(let i=0;i<5;i++){
                obj.hero_punctuate.punctuate += $(".ability_box>.point_wrap:nth-child("+(i+1)+")>.point_ul").attr("addnum")+"@";
            }
            /*  table9
            *    equipment1          #出门装
                 equipment2          #游戏初期
                 equipment3          #核心装备
                 equipment4          #后期神装
                 #用装备的id 拼接而来
            * */
            obj.hero_equipment={};
            obj.hero_equipment.equipment1 = "";
            obj.hero_equipment.equipment2 = "";
            obj.hero_equipment.equipment3 = "";
            obj.hero_equipment.equipment4 = "";

            for(let j=0;j<4;j++){
                let aa = $(".equip_wrap>.equip_one:nth-child("+(j+1)+")>ul>li .equip_item_r>span");
                let length = aa.length;
                // console.log(length);
                for(let i = 0;i<length;i++){
                    obj.hero_equipment["equipment"+(j+1)+""] += $(".equip_wrap>.equip_one:nth-child("+(j+1)+")>ul>li:nth-child("+(i+1)+") .equip_item_r>span").text().trim() +"@";
                }
            }
            /*
            * table10  hero_match{
                 mid
                 hero_id
                 fit_match           #适合组队的英雄
                 same_type           #相同类型的英雄
                 用hero_id 的拼接来而来
                }
            * */
            obj.hero_match={};
            obj.hero_match.fit_match='';
            obj.hero_match.same_type='';
            let match_length = $(".match_ul:nth-child(2)>li").length;
            for(let i=0;i<match_length;i++){
                obj.hero_match.fit_match += $(".match_ul:nth-child(2)>li:nth-child("+(i+1)+")>a").text()+"@";
            }
            let same_length = $(".match_ul:nth-child(4)>li").length;
            // console.log(same_length);
            for(let i=0;i<same_length;i++){
                obj.hero_match.same_type += $(".match_ul:nth-child(4)>li:nth-child("+(i+1)+")>a").text()+"@";
            }

            /*为英雄的图片 增加数据  hero_pic
             ss_pic               #英雄适配 模块的 图片 127*71   和英雄主页头上的小图片是相同的地址
             mm_pic               #英雄主页的大图的图片 247*284
             touxiang_pic
            *
            * */
            obj.hero_pic={};
            obj.hero_pic.ss_pic=$(".top_hero_card>div>img").attr("src");
            obj.hero_pic.mm_pic=$(".hero_info>img").attr("src");
            obj.hero_pic.touxiang_pic = $(".hero_name>img").attr("src");


             // console.log($(".hero_name>img").attr("src"));
            res(obj);
        });
    })
}
// todo  第三步  得到获取的关键数据 把数据导入数据库中
function addTosql(data,hidNum){
    //data 表示获取到的英雄数据的对象  hidNum表示要修改的行名  用遍历对象的方式获取
    //通过遍历得到对象里面的每个属性和属性值
    // 将属性名和表名对应
    for(let i in data){
        for(let j in data[i]){
            /*
            * 因为每一次遍历都会进一次循环
            * 所以只有采用update的当时对数据库进行操作
            * */
            // console.log(typeof data[i][j]);
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                let sql;
                if(typeof data[i][j] == "string"){
                 sql = `UPDATE ${i} SET ${j}='${data[i][j]}' WHERE hid=${parseInt(hidNum)}`;}
                else if(typeof data[i][j] == "number"){

                        sql = `UPDATE ${i} SET ${j}=${data[i][j]} WHERE hid=${parseInt(hidNum)}`;
                    }else{
                    sql = `UPDATE ${i} SET ${j}='' WHERE hid=${parseInt(hidNum)}`
                }
                // console.log(sql);
                conn.query(sql,(err,result)=>{
                    console.log("修改成功");
                    if(err) throw err;
                    conn.release();
                })
            })
        }
    }
}

// let fileAddress = "./file/vengeful_spirit.html/";
// getMsg(fileAddress).then((data)=>{
//     addTosql(data);
// });

//todo 第四步  通过 查找页面 来找到左右英雄的名字  和对应的详情页的url
function getAllHero(){
    let url = 'http://www.dota2.com.cn/heroes/index.htm';
    downLoad(url).then((data)=>{

    });
}
//创建一个子函数用来查找 所有的heroNames
function getAllHeroName(fileAddress) {
    return new Promise((res, err) => {
        let obj = new Object();
        fs.readFile(fileAddress, (err, buf) => {
            var str = buf.toString();
            /*
            * 这个函数要返回的结果
            * obj={
            *   {hid:'',heroName:"",main_attribute:"力量/敏捷/智力",xs_pic:"",sm_pic:""},
            *   {heroName:"",main_attribute:"力量/敏捷/智力",xs_pic:"",sm_pic:""},
            * }
            * */
            let $ = cheerio.load(str);
            let num = 0;
            for(let i=0;i<6;i++){
                let liLength =  $(".hero_list:nth-child("+(i+1)+")>li").length;
                for(let j=0;j<liLength;j++){
                    if(i<3&&j==0){
                    } else{
                        num++;
                        let nameStr = $(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a").attr("href");
                        let name = nameStr.slice(nameStr.slice(0,-1).lastIndexOf('/')+1,-1);
                        obj[num]={};
                        obj[num].heroName = name;
                        obj[num].hid = num;
                        obj[num].main_attribute = i%3==0?"力量":(i%3==1?"敏捷":"智力");
                        obj[num].xs_pic = "http://www.dota2.com.cn"+$(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a>img:last-child").attr("src");
                        obj[num].sm_pic = "http://www.dota2.com.cn"+$(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a>img:first-child").attr("src");
                    }
                }
            } res(obj);
        });

    });
}

//创键一个子函数将 获取到的数据导入到数据库中  todo  这两个函数只会使用一次
function appendAllHero(obj){
    for(let i in obj){
        // insertMsg(obj[i].hid);
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `UPDATE heroes_data SET main_attribute = '${obj[i].main_attribute}' WHERE hid = ${obj[i].hid}`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
            })
        });
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `UPDATE hero_pic SET xs_pic = '${obj[i].xs_pic}',sm_pic='${obj[i].sm_pic}' WHERE hid = ${obj[i].hid}`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
            })
        })
    }
}


function insertMsg(num){
    var tableNames = ['heroes_data','hero_dower','hero_equipment',
        'hero_intro','hero_location','hero_match','hero_pic','hero_property',
        'hero_punctuate','hero_skill'
        ];
    for(let f of tableNames){
         pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `INSERT INTO ${f}(hid,hero_id) VALUES(${num},${num}) `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
            })
         })
    }
}



   // todo 这是用来创建所有的英雄资料的 函数
// thelastfn();
function thelastfn(){
    // let fileAddress = './file/index.ht.html/';
    let str = './file/templar_assassin.html/@./file/tusk.html/@./file/clockwerk.html/@./file/gyrocopter.html/@./file/huskar.html/@./file/phoenix.html/@./file/timbersaw.html/@./file/bloodseeker.html/@./file/elder_titan.html/@./file/earthshaker.html/@./file/tiny.html/@./file/kunkka.html/@./file/alchemist.html/@./file/oracle.html/@./file/bounty_hunter.html/@./file/dragon_knight.html/@./file/legion_commander.html/@./file/storm_spirit.html/@./file/crystal_maiden.html/@./file/tinker.html/@./file/shadow_shaman.html/@./file/medusa.html/@./file/treant_protector.html/@./file/broodmother.html/@./file/warlock.html/@./file/sand_king.html/@./file/silencer.html/@./file/slark.html/@./file/chen.html/@./file/ember_spirit.html/@./file/windranger.html/@./file/pudge.html/@./file/terrorblade.html/@./file/techies.html/@./file/ursa.html/@./file/jakiro.html/@./file/sven.html/@./file/winter_wyvern.html/@./file/beastmaster.html/@./file/Outworld_Devourer.html/@./file/meepo.html/@./file/viper.html/@./file/mirana.html/@./file/pugna.html/@./file/dazzle.html/@./file/clinkz.html/@./file/shadow_demon.html/@./file/centaur_warrunner.html/@./file/night_stalker.html/@./file/ogre_magi.html/@./file/magnus.html/@./file/spectre.html/@./file/monkey_king.html/@./file/lich.html/@./file/doom.html/@./file/riki.html/@./file/brewmaster.html/@./file/lina.html/@./file/enchantress.html/@./file/spirit_breaker.html/@./file/ancient_apparition.html/@./file/naga_siren.html/@./file/lone_druid.html/@./file/sniper.html/@./file/chaos_knight.html/@./file/Io.html/@./file/phantom_assassin.html/@./file/lycan.html/@./file/drow_ranger.html/@./file/enigma.html/@./file/visage.html/@./file/lifestealer.html/@./file/undying.html/@./file/shadow_fiend.html/@./file/morphling.html/@./file/puck.html/@./file/rubick.html/@./file/vengeful_spirit.html/@./file/batrider.html/@./file/witch_doctor.html/@./file/faceless_void.html/@./file/keeper_of_the_light.html/@./file/queen_of_pain.html/@./file/arc_warden.html/@./file/disruptor.html/@./file/luna.html/@./file/slardar.html/@./file/earth_spirit.html/@./file/venomancer.html/@./file/omniknight.html/@./file/weaver.html/@./file/anti_mage.html/@./file/abyssal_underlord.html/@./file/invoker.html/@./file/abaddon.html/@./file/dark_seer.html/@./file/pangolier.html/@./file/lion.html/@./file/axe.html/@./file/natures_prophet.html/@./file/wraith_king.html/@./file/juggernaut.html/@./file/dark_willow.html/@./file/tidehunter.html/@./file/razor.html/@./file/necrophos.html/@./file/nyx_assassin.html/@./file/bristleback.html/@./file/leshrac.html/@./file/bane.html/@./file/Skywrath_Mage.html/@./file/troll_warlord.html/@./file/zeus.html/@./file/death_prophet.html/@./file/phantom_lancer.html/';
    let arr = str.split("@");
    // console.log(arr.length);
    for(let i=0;i<arr.length;i++){
        getMsg(arr[i]).then((data)=>{
             addTosql(data,(i+1));
         });
    }
}

function getAllMsg(){
    let fileAddress = './file/index.ht.html/';
    let new_arr = [];
     getAllHeroName(fileAddress).then((data)=>{
         for(let i in data){
             let heroName = data[i].heroName;
             let url = `http://www.dota2.com.cn/hero/${heroName}/`;
             downLoad(url).then((data)=>{
                 new_arr.push(data);
                if(new_arr.length==115){
                    let str =new_arr.join("@");
                    console.log(str);
                } ;
             });
         }
     });
}


/*
* 增加补充  用来修改英雄主属性
* */
function getHeroMainAttr(){
    let fileAddress = './file/index.ht.html/';
    let new_arr = [];
    getAllHeroName(fileAddress).then((data)=>{
        // console.log(data);
        let obj = new Object()
        return new Promise((res,err)=>{
            let i = 0;
            for(let i in data){
                let end = data[i].heroName.indexOf("_");
                if(end == -1) end=data[i].heroName.length;
                let heroName = data[i].heroName.slice(0,end);
                pool.getConnection((err,conn)=>{
                    if(err) throw err;
                    console.log(data[i].main_attribute,heroName);
                    let sql = `UPDATE heroes_data SET main_attribute = '${data[i].main_attribute}' WHERE hero_name='${heroName}' `;
                    conn.query(sql,(err,result)=>{
                        if(err) throw err;
                        console.log("修改成功");
                        conn.release();
                    })
                })
            }
        })
    })

    }
// getHeroMainAttr();


