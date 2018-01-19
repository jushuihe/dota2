/**
 * Created by web-01 on 2017/12/12.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
let superagent = require('superagent');
let cheerio = require('cheerio');

const pool = require("./pool");

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
// let url = "http://www.dota2.com.cn/enjoy/gameart/index3.htm";     //原画欣赏
let url = 'http://www.dota2.com.cn/enjoy/gamewall/index3.htm';    //精美壁纸
// downLoad(url);     // 下载页面的函数


// let fileAddress = "./file/index1.ht.html";
// getMsg(fileAddress);
function getMsg(address){
    fs.readFile(address,(err,data)=>{
        var str = data.toString();
        const $ = cheerio.load(str);
        for(let i = 0;i<15;i++){
            let yuanhua_pc = $(".picbox li:nth-child("+(i+1)+") a").attr("href");
            let yuanhua_xs = $(".picbox li:nth-child("+(i+1)+") img").attr("src");
            let hero_cname = $(".picbox li:nth-child("+(i+1)+") p").attr("title");
            console.log(yuanhua_pc,yuanhua_xs,hero_cname);
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                let sql = `UPDATE hero_bizhi SET yuanhua_pc = '${yuanhua_pc}',yuanhua_xs='${yuanhua_xs}',
                hero_title='${hero_cname}'  WHERE hid ='${(i+31)}' `;
                console.log(sql);
                conn.query(sql,(err,result)=>{
                    if(err) throw err;
                    conn.release();
                    console.log("更新成功");
                    // count++;
                    // console.log(count);
                })
            });
        }
    })
}


let fileAddress = "./file/index2.ht.html";
// getMsgJinmei(fileAddress);
function getMsgJinmei(address){
    fs.readFile(address,(err,data)=>{
        var str = data.toString();
        const $ = cheerio.load(str);
        for(let i = 0;i<15;i++){
            let jinmei_sp = $(".picbox li:nth-child("+(i+1)+") h2 img").attr("src");
            let jinmei_lp = $(".picbox li:nth-child("+(i+1)+") p>span:first-child a").attr("href");
            let jinmei_lp1 = $(".picbox li:nth-child("+(i+1)+") p>span:nth-child(2) a").attr("href");
            let jinmei_lp2 = $(".picbox li:nth-child("+(i+1)+") p>span:nth-child(3) a").attr("href");
            console.log(jinmei_sp,jinmei_lp,jinmei_lp1,jinmei_lp2);
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                let sql = `UPDATE hero_bizhi_jinmei SET jinmei_sp = '${jinmei_sp}',jinmei_lp='${jinmei_lp}',
                jinmei_lp1='${jinmei_lp1}',jinmei_lp2='${jinmei_lp2}'  WHERE bid ='${(i+16)}' `;
                console.log(sql);
                conn.query(sql,(err,result)=>{
                    if(err) throw err;
                    conn.release();
                    console.log("更新成功");
                    // count++;
                    // console.log(count);
                })
            });
        }
    })
}

function thePiclastFn(table,lieName){
    for(let i=45;i<=45;i++){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select ${lieName},bid from ${table} where bid=${i} `;
            // console.log(sql);
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();

                 fn3(result[0],lieName,table);   //这是 hero_punctuate 和 hero_skill 两个表的  修改方式
                // fn4(result[0],lieName,table);   //这是 goods_detail 这个表的  修改方式
            })
        });
    }
}

// thePiclastFn('hero_bizhi','yuanhua_pc');
// thePiclastFn('hero_bizhi_jinmei','jinmei_lp2');   //修改数据库的数据和 下载当前页面

function fn3(obj,lieName,table){
    console.log(obj);
    let url = obj[lieName];
    if(url =="undefined") return;
    if(url.slice(0,4)=="http"){
        downloadPic(url);
    }else{
        url = "http://www.dota2.com.cn"+url;
        downloadPic(url);
    }
    url = "../../src/assets/img/bizhi/"+url.slice(url.lastIndexOf("/")+1);
    console.log(url);
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `UPDATE ${table} SET ${lieName} = '${url}' WHERE bid =${obj['bid']} `;
        console.log(sql);
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
            console.log("更新成功");
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

function downloadPic(url){
    let fileName  = url.slice(url.lastIndexOf("/")+1);
    let fileAddress = "./file/img/bizhi/"+fileName;
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
