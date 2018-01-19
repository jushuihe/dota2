/**
 * Created by web-01 on 2018/1/6.
 */
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
//todo 第一步 传入一个url 地址 读取页面 的内容 保存在电脑内存中
function downLoad(url){
    let lastName = url.slice(url.slice(0,url.length-2).lastIndexOf("/")+1,url.length-1);
    let fileAddress = `./file/herodetail/${lastName}.html/`;
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
// let url = 'http://www.dota2.com.cn/heroes/index.htm';
// downLoad(url);

// 读取页面 获得 英雄名
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
                        obj[num].href =$(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a").attr('href');
                        obj[num].xs_pic = "http://www.dota2.com.cn"+$(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a>img:last-child").attr("src");
                        obj[num].sm_pic = "http://www.dota2.com.cn"+$(".hero_list:nth-child("+(i+1)+")>li:nth-child("+(j+1)+")>a>img:first-child").attr("src");
                    }
                }
            } res(obj);
        });

    });
}
let fileAddress = "./file/index.ht.html";
// getAllHeroName(fileAddress).then((data)=>{downAllPage(data)});
function downAllPage(obj){    //// 下载所有的herodetail详情页
    for(let i=1;i<116;i++){
        let now = obj[i];
        downLoad(now.href)
    }
}

// getAllHeroName(fileAddress).then((data)=>{updataMsg(data)});

function updataMsg(obj){
    for(let i=1;i<116;i++){
        let now = obj[i].href;
        let lastName = now.slice(now.slice(0,now.length-2).lastIndexOf("/")+1,now.length-1);
        let fileAddress = `./file/herodetail/${lastName}.html/`;
        getMsg(fileAddress,obj[i].hid).then((data)=>{console.log(data)});
    }
}
function getMsg(fileAddress,hid){
    return new Promise((res,err)=>{
        let obj = new Object();
        obj.hid = hid;
        fs.readFile(fileAddress,(err,buf)=>{
            if(err) throw err;
            console.log("操作文件名为"+fileAddress);
            var str = buf.toString();
            // console.log(str);
            // console.log(str);   //得到了完整的数据
            let $ = cheerio.load(str);
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
            res(obj);
        });
    })
}

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


function thelastfn(){
    let str = './file/templar_assassin.html/@./file/tusk.html/@./file/clockwerk.html/@./file/gyrocopter.html/@./file/huskar.html/@./file/phoenix.html/@./file/timbersaw.html/@./file/bloodseeker.html/@./file/elder_titan.html/@./file/earthshaker.html/@./file/tiny.html/@./file/kunkka.html/@./file/alchemist.html/@./file/oracle.html/@./file/bounty_hunter.html/@./file/dragon_knight.html/@./file/legion_commander.html/@./file/storm_spirit.html/@./file/crystal_maiden.html/@./file/tinker.html/@./file/shadow_shaman.html/@./file/medusa.html/@./file/treant_protector.html/@./file/broodmother.html/@./file/warlock.html/@./file/sand_king.html/@./file/silencer.html/@./file/slark.html/@./file/chen.html/@./file/ember_spirit.html/@./file/windranger.html/@./file/pudge.html/@./file/terrorblade.html/@./file/techies.html/@./file/ursa.html/@./file/jakiro.html/@./file/sven.html/@./file/winter_wyvern.html/@./file/beastmaster.html/@./file/Outworld_Devourer.html/@./file/meepo.html/@./file/viper.html/@./file/mirana.html/@./file/pugna.html/@./file/dazzle.html/@./file/clinkz.html/@./file/shadow_demon.html/@./file/centaur_warrunner.html/@./file/night_stalker.html/@./file/ogre_magi.html/@./file/magnus.html/@./file/spectre.html/@./file/monkey_king.html/@./file/lich.html/@./file/doom.html/@./file/riki.html/@./file/brewmaster.html/@./file/lina.html/@./file/enchantress.html/@./file/spirit_breaker.html/@./file/ancient_apparition.html/@./file/naga_siren.html/@./file/lone_druid.html/@./file/sniper.html/@./file/chaos_knight.html/@./file/Io.html/@./file/phantom_assassin.html/@./file/lycan.html/@./file/drow_ranger.html/@./file/enigma.html/@./file/visage.html/@./file/lifestealer.html/@./file/undying.html/@./file/shadow_fiend.html/@./file/morphling.html/@./file/puck.html/@./file/rubick.html/@./file/vengeful_spirit.html/@./file/batrider.html/@./file/witch_doctor.html/@./file/faceless_void.html/@./file/keeper_of_the_light.html/@./file/queen_of_pain.html/@./file/arc_warden.html/@./file/disruptor.html/@./file/luna.html/@./file/slardar.html/@./file/earth_spirit.html/@./file/venomancer.html/@./file/omniknight.html/@./file/weaver.html/@./file/anti_mage.html/@./file/abyssal_underlord.html/@./file/invoker.html/@./file/abaddon.html/@./file/dark_seer.html/@./file/pangolier.html/@./file/lion.html/@./file/axe.html/@./file/natures_prophet.html/@./file/wraith_king.html/@./file/juggernaut.html/@./file/dark_willow.html/@./file/tidehunter.html/@./file/razor.html/@./file/necrophos.html/@./file/nyx_assassin.html/@./file/bristleback.html/@./file/leshrac.html/@./file/bane.html/@./file/Skywrath_Mage.html/@./file/troll_warlord.html/@./file/zeus.html/@./file/death_prophet.html/@./file/phantom_lancer.html/';
    let arr = str.split("@");
   // for(let now of arr){
   //     let lastName = './file/herodetail/'+ now.slice(now.slice(0,now.length-2).lastIndexOf("/")+1,now.length-1);
   //     console.log(lastName);
   //
   // }
    for(let i=0;i<arr.length;i++){
        let now = arr[i];
        let lastName = './file/herodetail/'+ now.slice(now.slice(0,now.length-2).lastIndexOf("/")+1,now.length-1);

        getMsg(lastName).then((data)=>{
            addTosql(data,(i+1));
        });
    }
}
thelastfn();