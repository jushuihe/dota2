/**
 * Created by web-01 on 2017/12/21.
 */

const http = require("http");
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const he = require("he");
const https = require("https");

let pool = mysql.createPool({
    host:"127.0.0.1",
    user:'root',
    database:'dota-test',
    password:'',
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

function getPageMsg(url){
    let newNumber = url.slice(url.lastIndexOf("/")+1);
    let address = "./file/allnewsPage1/"+newNumber;
    fs.writeFileSync(address,'');  //将原文件清空
    http.get(url,(res,err)=>{
        res.on("data",(buf)=>{
            let msg = buf.toString();
            fs.appendFileSync(address,msg);
            console.log("写入完毕");
        })
    })
}

// todo 下载每一个新闻页面的图片并且 返回新闻页的 内容
function getMsg(url,nid) {
    let newNumber = url.slice(url.lastIndexOf("/")+1);
    let fileaddress = "./file/allnewsPage/"+newNumber;
    // console.log(fileaddress+"打开的文件名");
    console.log(newNumber+"打开的文件名");
    fs.readFile(fileaddress, (err, buf) => {
        if (err) throw err;
        var str = buf.toString();
        let $ = cheerio.load(str);
        if($(".content").html()!=""&&$(".content").html()!=null){
            let newMsg = he.decode($(".content").html());    //得到的是文章的内容
            let count = $(".content p img").length;
            for(let i=0;i<count;i++){
                let msgUrl = $(".content p img")[i].attribs.src;
                let newMsgUrl = msgUrl.slice(msgUrl.lastIndexOf("/")+1);
                //得到图片的名字和 url 地址 将图片存储在电脑内存中
                if(msgUrl.slice(-3)=="jpg"){
                    downloadPic(msgUrl,newMsgUrl);
                }
                let newFileAddress = "img/news/"+newMsgUrl;
                newMsg = newMsg.replace(msgUrl,newFileAddress);  //将所有的img url 地址都替换为后期存储的图片的地址
                newMsg = newMsg.replace(/'/ig,"\"");
                newMsg = newMsg.replace(/'/ig,"\"");
            }
            newMsg = newMsg.replace(/'/ig,"\"");
            //将得到的文章的内容加入数据库中
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                newMsg = newMsg.replace(/'/ig,"\"");
                let sql = `UPDATE game_new SET new_content_part = '${newMsg}' WHERE nid = ${nid}`;
                console.log(sql);
                // console.log(sql);
                conn.query(sql,(err,result)=>{
                    if(err){
                        console.log(sql);
                        throw err;
                    }
                    conn.release();
                })
            })
        }
        // console.log($(".content p img")[1].attribs.src);
    })
}

// getMsg();

//todo 这里封装一个功能函数，传入一个url地址和保存图片的名称 将图片保存在电脑中
function downloadPic(url,fileName){
    let fileAddress = "./file/img/new/"+fileName;
    // console.log(muluAddress);
    if(url.slice(0,5)=="https"){
        https.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+url+fileName);
        });
    }else if(url.slice(0,5)=="http:"){
        http.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+url+fileName);
        });
    }
}

/*
 let url = "http://www.dota2.com.cn/news/gamenews/index.htm";
 let url = "http://www.dota2.com.cn/news/competition/index.htm";
 let url = "http://www.dota2.com.cn/news/gamepost/news_update/index.htm";
 let url = "http://www.dota2.com.cn/article/details/20171108/196741.html";  //综合新闻
 let url = "http://www.dota2.com.cn/article/details/20171109/196751.html";

 */

// todo 这里遍历一个新闻标题页
/*
* var obj = {
* {  new_title
     new_pic
     new_little_content
     new_creatTime
     new_content_part1
* },
* {},
*
* }
*
* */

let url = "http://www.dota2.com.cn/news/gamenews/index.htm";
// getNewPageMsg(url);
function getNewPageMsg(url,type){
    let newNumber = url.slice(url.lastIndexOf("/")+1);
    let address = "./file/"+type+"/"+newNumber;
    fs.writeFileSync(address,'');  //将原文件清空
    http.get(url,(res,err)=>{
        res.on("data",(buf)=>{
            let msg = buf.toString();
            fs.appendFileSync(address,msg);
            console.log("写入完毕");
        })
    })
}
//todo 遍历新闻标题页 得到新闻的；类型 ，创建时间， 小图，标题
// getNewindexMsg("gamenews",1,1);
function getNewindexMsg(type,i,nid) {
    let fileAddress = `./file/${type}/index${i}.htm`;
    fs.readFile(fileAddress, (err, buf) => {
        if (err) throw err;
        // console.log("操作文件名为"+fileAddress);
        var str = buf.toString();
        let $ = cheerio.load(str);
        let biaoqian = $(".panes>li>a");
        let length = biaoqian.length;
        for(let i=0;i<length;i++){
            let obj = new Object();
            obj.new_title=$(".panes>li>a:nth-child("+(i+1)+") .title").text();
            obj.new_pic=$(".panes>li>a:nth-child("+(i+1)+") img").attr("src");
            obj.new_little_content=$(".panes>li>a:nth-child("+(i+1)+") .content").text();
            obj.new_creatTime= new Date($(".panes>li>a:nth-child("+(i+1)+") .date").text()).getTime();
            obj.new_style = type;
            obj.new_url =$(".panes>li>a:nth-child("+(i+1)+")").attr("href");
            updateToMysql(obj,nid)
            nid++;
        }
        // console.log($(".panes>li>a:nth-child(1) .content").text());
    })
}

//todo 封装一个函数 传入一个对象，将对象添加到数据库中


function updateToMysql(obj,nid){
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `UPDATE game_new SET new_title = '${obj.new_title}',
                                new_pic='${obj.new_pic}',
                                new_little_content='${obj.new_little_content}',
                                new_creatTime='${obj.new_creatTime}',
                                new_style='${obj.new_style}',
                                new_url = '${obj.new_url}'
                                 WHERE nid = ${nid}`;
        console.log(sql);
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
        })
    })
}

//添加行
/*for(let i =1;i<2000;i++){
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `INSERT INTO game_new(nid) values (${i})`;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
        })
    })
}*/

// todo  第一步先下载所有的 标题页
// 只下载50页
// download();
function download(){
    for(let i=1;i<51;i++){
        let url= `http://www.dota2.com.cn/news/gamenews/index${i}.htm`;
        getNewPageMsg(url,"gamenews");
        url = `http://www.dota2.com.cn/news/competition/index${i}.htm`;
        getNewPageMsg(url,"competition");
        if(i<36){
            url =`http://www.dota2.com.cn/news/gamepost/news_update/index${i}.htm`;
            getNewPageMsg(url,"new_update");
        }

    }
}

//todo 第二步 循环遍历三个文件夹中的HTML文件
function updateAllNews(num){
    let nid =num;
    for(let i=0;i<50;i++){
        // downloadAllNewspage("gamenews",(i+1),nid);
        getNewindexMsg("gamenews",(i+1),nid);
        nid += 8;
    }
    console.log("第一步完成");
    for(let i=0;i<50;i++){
        // downloadAllNewspage("competition",(i+1),nid);
        getNewindexMsg("competition",(i+1),nid);
        nid += 8;
    }
    console.log("第二步完成");
    for(let i=0;i<35;i++){
        // downloadAllNewspage("new_update",(i+1),nid);
        getNewindexMsg("new_update",(i+1),nid);
        nid += 8;
    }
    console.log("第三步完成"+nid);
}

// updateAllNews(1);  //读取所有的新闻的标题 的内容 更新数据库




function downloadAllNewspage(type,i,nid) {
    let fileAddress = `./file/${type}/index${i}.htm`;
    fs.readFile(fileAddress, (err, buf) => {
        if (err) throw err;
        var str = buf.toString();
        let $ = cheerio.load(str);
        let biaoqian = $(".panes>li>a");
        let length = biaoqian.length;
        for (let i = 0; i < length; i++) {
            let url = $(".panes>li.pane>a:nth-child(" + (i + 1) + ")").attr("href");
            if(url.slice(0,4) == "/art" || url.slice(0,4) == "/new"){
                url = "http://www.dota2.com.cn"+url;
                getMsg(url,nid);
                nid++;
            };
        }
    })
}



