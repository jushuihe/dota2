/**
 * Created by web-01 on 2018/1/5.
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
    database:"dota2",
    password:"",
    port:3306,
    connectionLimit:25
});

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

// let url = "http://www.dota2.com.cn/heroes/index.htm";
// downLoad(url);



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


function sendToSql(obj){
    let count = 0;
    for(let f in obj){
        let now = obj[f];
        let hero_name = now.heroName.replace(/_/ig," ").toLowerCase();
        let xs_pic = now.xs_pic;   //将图片下载到本地存储
        let sm_pic = now.sm_pic;
        // downloadPic(xs_pic);   //将图片下载到本地
        // downloadPic(sm_pic);
        console.log(now.heroName+"==>"+hero_name);

        //将图片地址变成本地获取的方式 来得到
        xs_pic = '../../assets/img/hero/'+xs_pic.slice(xs_pic.lastIndexOf("/")+1);
        sm_pic = '../../assets/img/hero/'+sm_pic.slice(sm_pic.lastIndexOf("/")+1);

        //因为英雄名的 和 和图片名称的不对称性 这个 sql 不能将所有的英雄都修改掉

        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `UPDATE hero_pic SET xs_pic = '${xs_pic}',sm_pic='${sm_pic}' WHERE hid =(select hid from heroes_data where hero_name='${hero_name}') `;
            console.log(sql);
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                console.log("更新成功")
                count++;
                console.log(count);
            })
        });
    }
}

function downloadPic(url){
    let fileName  = url.slice(url.lastIndexOf("/")+1);
    let fileAddress = "./file/img/new_title_pic/"+fileName;
    // console.log(muluAddress);
    if(url.slice(0,5)=="https"){
        https.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+url+fileName);
        });
    }else if(url.slice(0,5)=="http:"){
        http.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+fileName);
        });
    }
}





// let fileAddress = "./file/index.html";
// getAllHeroName(fileAddress).then((data)=>{sendToSql(data)});
//


///*
// 分析：因为 在 hero_pic 中的 ss_pic 的字符串是和 hero_name 对应的 所以可以根据 ss_pic  的值 来得到 xs_pic sm_pic
//
// */
function updata(){
    for(let i=1;i<=115;i++){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select xs_pic,sm_pic,ss_pic from hero_pic where hid=${i} `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
               fn(result[0]);
            })
        });
    }
}
// updata();   //  修改xs_pic  和 ss_pic
function fn(obj){
    if(obj.xs_pic.slice(0,4)=="http"){
        let ss_pic=obj.ss_pic;
        let str = ss_pic.slice(ss_pic.lastIndexOf("/")+1);
        str = str.slice(0,-9);
        console.log(str);
        let xs_pic = '../../assets/img/hero/'+str+'_sb.png';
        let sm_pic = '../../assets/img/hero/'+str+'_hphover.png';
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `UPDATE hero_pic SET xs_pic = '${xs_pic}',sm_pic='${sm_pic}' WHERE ss_pic ='${ss_pic}' `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                console.log("update success");
            })
        });
    }else{return;}
}  //



// 下面做的是 将数据库 hero_pic 中的http 的地址 的图片保存到本地 并且 改变数据库的内容；
function updata2(){
    for(let i=1;i<=115;i++){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select ss_pic,mm_pic,touxiang_pic,hid from hero_pic where hid=${i} `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                fn1(result[0]);
            })
        });
    }
}
// updata2();   //修改 hero_pic 中的图片地址修改为本地地址 并下载到当地
function fn1(obj){  //功能函数  得到图片的对象  下在图片并且 修改数据库
    let hid = obj.hid;
    let ss_pic = obj.ss_pic;
    // downloadPic(ss_pic);
    let mm_pic = obj.mm_pic;  //下载图片
    // downloadPic(mm_pic);
    let touxiang_pic = obj.touxiang_pic;
    // downloadPic(touxiang_pic);
    obj.ss_pic = '../../assets/img/hero/'+ss_pic.slice(ss_pic.lastIndexOf("/")+1);
    obj.mm_pic ='../../assets/img/hero/'+ mm_pic.slice(mm_pic.lastIndexOf("/")+1);
    obj.touxiang_pic = '../../assets/img/hero/'+touxiang_pic.slice(touxiang_pic.lastIndexOf("/")+1);
    getlocalUrl(obj)
}
function getlocalUrl(obj){
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `UPDATE hero_pic SET ss_pic = '${obj.ss_pic}',mm_pic='${obj.mm_pic}',touxiang_pic='${obj.touxiang_pic}' WHERE hid ='${obj.hid}' `;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
        })
    });

}

/*
*  xs_pic: '../../assets/img/hero/pudge_sb.png',
 sm_pic: '../../assets/img/hero/pudge_hphover.png',
 ss_pic: 'http://www.dota2.com.cn/images/heroes/pudge_full.png'
* */




// todo  这里要做的是 封装一个和函数 传入一个 表名  和 列名  下载图片并且 修改为本地url
function thePiclastFn(table,lieName){
    for(let i=0;i<100;i++){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select ${lieName},nid from ${table} where nid=${i} `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                fn3(result[0],lieName,table);   //这是 hero_punctuate 和 hero_skill 两个表的  修改方式
                // fn4(result[0],lieName,table);   //这是 goods_detail 这个表的  修改方式
            })
        });
    }
}
// thePiclastFn('hero_punctuate','skill4_sm_pic');
// thePiclastFn('hero_skill','skill4_pic');
thePiclastFn('game_new','new_pic');
// thePiclastFn('goods_detail','goods_pic');
function fn3(obj,lieName,table){
    // console.log(obj[lieName]);
    // console.log(obj['hid']);
    let url = obj[lieName];
    console.log(url);
    downloadPic(url);
    //保存图片的本地地址
    url = "../../assets/img/new_title_pic/"+url.slice(url.lastIndexOf("/")+1);
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `UPDATE ${table} SET ${lieName} = '${url}' WHERE nid =${obj['nid']} `;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
            console.log("更新成功")
        })
    });
}

function fn4(obj,lieName,table){
    // console.log(obj[lieName]);
    // console.log(obj['hid']);
    let url = obj[lieName];
    url = url.slice(url.lastIndexOf("/")+1);
    // url = url+"ng";
    url = "http://www.dota2.com.cn/items/images/"+url;
    console.log(url);
    downloadPic(url);
    //保存图片的本地地址
    url = "../../assets/img/goods/"+url.slice(url.lastIndexOf("/")+1);
    // pool.getConnection((err,conn)=>{
    //     if(err) throw err;
    //     let sql = `UPDATE ${table} SET ${lieName} = '${url}' WHERE did =${obj['did']} `;
    //     conn.query(sql,(err,result)=>{
    //         if(err) throw err;
    //         conn.release();
    //         console.log("更新成功");
    //     })
    // });
}

