
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
    res.redirect("/index");
});
router.get("/index",(req,res)=>{
    res.send("this goods index page")
});
router.get("/detail/:goodsid",(req,res)=>{
    let gid = req.params.goodsid;
    if(gid == "undefined"){
        res.send("输入的信息不正确");
    }else{
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select s.did,goods_price,dname,descr,notes,attrib,mc,cd,lore,goods_pic from 
           goods_detail_style as s inner join goods_detail as d on d.did=s.did where 
           s.did=${gid}
        `;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                res.json(result);
            })
        })
    }

});


module.exports = router;