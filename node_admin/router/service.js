/**
 * Created by web-01 on 2018/1/18.
 */
const http = require("http");
const express= require("express");
const pool = require("../pool");

let router = express.Router();
router.get('/:tid',(req,res)=>{
    console.log("进入了一个参数的请求");
    var tid=req.params.tid;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql=`SELECT qtitle,qanswer FROM question_list WHERE tid=${tid}`;
        console.log(sql);
        conn.query(sql,function(err,result){
            if(err){throw err}
            if(result.length>0){
                res.json({code:1,msg:result});
            }else{
                res.json({code:-1,msg:"无查询结果"});
            }
            conn.release();
        })
    })
})


//点击大标题下的子标题时，得到问题列表
router.get('/:qtype/:qsubtype',(req,res)=>{
    var output={
        pageSize:10,//每页显示问题数量
        pageCount:0,//总的问题数
        pno:0, //当前页数
        data:[]//当前查询的记录数
    };
    //分页结束
    var qtype=req.params.qtype;
    var qsubtype=req.params.qsubtype;
    output.pno=req.params.pno;
    var start=output.pageSize* parseInt(output.pno);
    var end=output.pageSize;
    //获取当前问题类型的总数
    var poolCount=0;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        //start
        var sql=`SELECT qtitle,qanswer,tid FROM question_list LEFT JOIN question_type ON question_list.tid = question_type.type_id WHERE `;
        sql+=` question_type.qtype = ${qtype} AND question_type.qsubtype=${qsubtype}`;
        conn.query(sql,function(err,result){
            if(err) throw err;
            // output.pageCount=result[0]["count(*)"];
            // console.log("miko"+sql);
            conn.release();
            // poolCount++;
            // if(poolCount==2){
            if(result.length>0){
                res.json({code:1,msg:result});
            }else{
                res.json({code:-1,msg:"无查询结果"});
            }
        })
    });
});

//查询数据
router.get("/service/data/:kw",(req,res)=>{
    // res.header("Access-Control-Allow-Origin", "*");
    // console.log("进入了kw的请求");
    var kw=req.params.kw;
    // console.log(kw);
    var kws=[];
    // console.log("这是kw:"+kw);
    if(kw){
        kws=kw.split(" ");
        for(var i=0;i<kws.length;i++){
            kws[i]=" qtitle like '%"+kws[i]+"%' ";
        }
        var sqlTxt=kws.join(" and ");
        pool.getConnection((err,conn)=>{
            if (err) throw err;
            var sql="SELECT qtitle,qanswer,tid FROM question_list WHERE "+sqlTxt;
            // console.log(sql);
            conn.query(sql,function(err,result){
                if (err) throw err;
                if(result.length>0){
                    // console.log(result);
                    res.json({code:1,msg:result});
                }else{
                    res.json({code:-1,msg:""});
                }
                conn.release();
            })
        })
    }
});
module.exports = router;