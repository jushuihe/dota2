/**
 * Created by web-01 on 2018/1/17.
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
// todo  这里要做的是 封装一个和函数 传入一个 表名  和 列名  下载图片并且 修改为本地url
thePiclastFn("game_new","new_pic");
function thePiclastFn(table,lieName){
    for(let i=1;i<=1000;i++){
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
function fn3(obj,lieName,table){
    // console.log(obj[lieName]);
    // console.log(obj);
    let url = obj[lieName];
    //保存图片的本地地址
    url = "../../src/assets/img/new_title_pic/"+url.slice(url.lastIndexOf("/")+1);
    // console.log(url);
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
    let wenhaoNum = url.lastIndexOf("?")!=-1?url.lastIndexOf("?"):url.length;
    url = url.slice(url.lastIndexOf("/")+1,wenhaoNum);
    // url = url+"ng";

    url = "http://www.dota2.com.cn/items/images/"+url;
    // console.log(url);
    downloadPic(url);
    //保存图片的本地地址
    url = "../../src/assets/img/goods/"+url.slice(url.lastIndexOf("/")+1);
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
    let fileAddress = "./file/img/newGoods/"+fileName;
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