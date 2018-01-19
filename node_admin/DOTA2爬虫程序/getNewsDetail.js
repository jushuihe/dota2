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

//todo 通过传入新闻页面的url 地址 下载 当前的页面到电脑中
function getPageMsg(url){
    let newNumber = url.slice(url.lastIndexOf("/")+1);
    let address = "./file/allnewsPage1/"+newNumber;
    fs.writeFileSync(address,'');  //将原文件清空
    http.get(url,(res,err)=>{
        res.on("data",(buf)=>{
            let msg = buf.toString();
            fs.appendFile(address,msg,function(){
                console.log("写入完毕");
            });

        })
    })
}

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
let url = "http://www.dota2.com.cn/article/details/20170214/193421.html";
// getMsg(url,1); //下载的页面的内容不对

// todo 下载每一个新闻页面的图片并且 返回新闻页的 内容
function getMsg(url,nid) {
    let newNumber = url.slice(url.lastIndexOf("/")+1);
    let fileaddress = "./file/allnewsPage1/"+newNumber;
    // console.log(fileaddress+"打开的文件名");
    console.log(newNumber+"打开的文件名");
    fs.readFile(fileaddress, (err, buf) => {
        if (err) throw err;
        var str = buf.toString();
        let $ = cheerio.load(str);
        if($(".content").html()!=""&&$(".content").html()!=null){
            let newMsg = he.decode($(".content").html());    //得到的是文章的内容
            let count = $(".content p img").length;
             console.log(url+"图片的个数是%d", count);
            for(let i=0;i<count;i++){
                let msgUrl = $(".content p img")[i].attribs.src;
                let newMsgUrl = msgUrl.slice(msgUrl.lastIndexOf("/")+1);
                // console.log("图片的下载地址" + msgUrl + "  图片的保存地址" + newMsgUrl);
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
            // console.log(newMsg)
            //将得到的文章的内容加入数据库中
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                newMsg = newMsg.replace(/'/ig,"\"");
                let sql = `UPDATE game_new SET new_content_part = '${newMsg}' WHERE nid = ${nid}`;
                conn.query(sql,(err,result)=>{
                    if(err){
                        throw err;
                    }
                    conn.release();
                    console.log("update Success");
                })
            })
        }
    })
}

//todo 这里封装一个功能函数，传入一个url地址和保存图片的名称 将图片保存在电脑中
function downloadPic(url,fileName){
    let fileAddress = "./file/img/new/"+fileName;
    // console.log(muluAddress);
    if(url.slice(0,5)=="https"){
        https.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+url);
        });
    }else if(url.slice(0,5)=="http:"){
        http.get(url,(res)=>{
            res.pipe(fs.createWriteStream(fileAddress));
            console.log("下载图片完成"+url);
        });
    }
}

//todo 这里已经将每个新闻页面的 地址保存在数据库中，通过new_id 属性 获取每个新闻页面的地址 再下载，再读取，再操作 数据
function miko(nid){
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `select new_url from game_new where nid=${nid}`;
        // console.log(sql);
        conn.query(sql,(err,result)=>{
            if(err) throw err;
                conn.release();
                let url = result[0].new_url;
                console.log(url);
                if(url.slice(0,4) == "/art" || url.slice(0,4) == "/new"){
                    url = "http://www.dota2.com.cn"+url;
                    // getPageMsg(url);  这个只是用来下载页面的
                //接下来读取页面 的内容
                getMsg(url,nid);
            }
            //下载页面
        })
    })
}

function fn1(num) {


    for (let i = num*10; i < (num+1)*10; i++) {
        miko((i + 1));
    }
}
// fn1(11);
let i=56;
setInterval(()=>{
    console.log(i);
    fn1(i);
    i++;
},30000);
