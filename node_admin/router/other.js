/**
 * Created by web-01 on 2017/12/26.
 */
/*
 * 这是一些静态页面的相关路由
 * */
const http = require("http");
const express= require("express");
const pool = require("../pool");

let router = express.Router();


/*
* 提供的接口
* 1、原话欣赏页面  http://127.0.0.1:3000/other/bizhi
* 2、精美壁纸页面  http://127.0.0.1:3000/other/jinmei
* */
router.get("/",(req,res)=>{
    res.redirect("/bizhi");
})
router.get("/bizhi",(req,res)=>{
    console.log("得到壁纸的请求");
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `select hid,yuanhua_xs,yuanhua_pc,hero_title from hero_bizhi where hid < 45`;
        conn.query(sql,(err,result)=>{
            if(err) throw err;

            res.json(result);
            conn.release();
        })
    })
});
router.get("/jinmei",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `select bid,jinmei_sp,jinmei_lp,jinmei_lp1,jinmei_lp2 from hero_bizhi_jinmei where bid < 46`;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});


module.exports = router;