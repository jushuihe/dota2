/*
 * 这是用户相关的所有路由
 * */
const http = require("http");
const express= require("express");
const pool = require("../pool");

let router = express.Router();


/*
* 接收到的地址为 news/index/all/:pno
* */

router.get("/index/:style/:pno",(req,res)=>{
    /*
    *   news_style 分为 四大类 all，gamenews(官方新闻),competition(赛事新闻)，new_update(更新日志)
    * */
    let news_style = req.params.style;
    let pno = req.params.pno;
    console.log("得到的类型时"+news_style+"得到的页码是"+pno);

    /*
    * 传过去的数据为 output=[
    *   [pno]=>1,
    *   [totalCunt]=>0,
    *   [data]={}
    * ]
    *
    * */
    let output={};
    output["pno"] = pno;
    let getMsgCount=0;//定义一个全局变量 判断是否得到所有的数据

    if(news_style=="all"){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select count(*) from game_new`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output["totalCount"] = result[0]["count(*)"];
                conn.release();
                getMsgCount++;
                if(getMsgCount==2){
                    res.json(output);
                }
            })
        })
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select nid,new_title,new_pic,new_little_content,new_creatTime from game_new  LIMIT ${(pno-1)*10},10`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output["data"] = result;
                conn.release();
                getMsgCount++;
                if(getMsgCount==2){
                    res.json(output);
                }
            })
        })
    }else{
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select count(*) from game_new where new_style ='${news_style}'`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output["totalCount"] = result[0]["count(*)"];
                conn.release();
                getMsgCount++;
                if(getMsgCount==2){
                    res.json(output);
                }
            })
        })
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select nid,new_title,new_pic,new_little_content,new_creatTime from game_new where new_style ='${news_style}' LIMIT ${(pno-1)*10},10`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output["data"] = result;
                conn.release();
                getMsgCount++;
                if(getMsgCount==2){
                    res.json(output);
                }
            })
        })
    }

});



router.get("/detail/:news_id",(req,res)=>{
    let news_id = req.params.news_id;
    news_id= parseInt(news_id);

    if(isNaN(news_id)){
        console.log("得到的数据为NaN")
        res.send("error");
    }else{
        let output = {};

        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select new_title,new_creatTime,new_content_part,new_style from game_new where nid=${news_id}`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                console.log(result);
                conn.release();

                if(result.length==0){
                    res.send("err");
                }else{
                    res.json(result);
                }
            })
        })
    }

    /*
     * 传过去的数据为 output={
     *   [title]=>,
     *   [content]=>0,
     *   [updata_time]={}
     * }
     *
     * */




});


module.exports = router;