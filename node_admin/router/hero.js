/*
 * 这是用户相关的所有路由
 * */
const http = require("http");
const express= require("express");
const pool = require("../pool");

let router = express.Router();


router.get("/",(req,res)=>{
    res.redirect("/hero/index");
})
router.get("/index",(req,res)=>{
    //这是英雄 的首页 要将所有的英雄的数据都发送过去
        //将英雄分为 三个不同的注属性传输过去
    output=[
        {
        power:[
            {hid:1,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            {hid:2,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            {hid:3,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            ],
        agility:[],
        brains:[]
        },
        {
        power:[
            {hid:1,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            {hid:2,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            {hid:3,hero_name:"",hero_cname:"",xs_pic:"",sm_pic:"",hero_location:[]},
            ],
        agility:[],
        brains:[]
        },
    ];
    let count =0;   //定义一个全局变量，检查是否所有要查询的数据都已近查到
    function getAllMsg(camp,num){
        let main_attribute = [
            {name:"力量",eng:"power"},
            {name:"敏捷",eng:"agility"},
            {name:"智力",eng:"brains"},
            ];
        for(let att of main_attribute){
            pool.getConnection((err,conn)=>{
                if(err) throw err;
                let sql = `select p.hid,hero_name,hero_cname,main_attribute,attack_type,xs_pic,sm_pic,hexin,kongzhi,duixianfuzhu,xianshou,daye,fuzhu,naijiu,baofa,tuijin,taosheng`;
                sql += ` from heroes_data d inner join hero_pic p  inner join hero_location l`;
                sql += ` on p.hid=d.hid and p.hid=l.hid`;
                sql += ` where `;
                sql += ` camp='${camp}' AND main_attribute='${att.name}' `;
                // console.log(sql);
                conn.query(sql,(err,result)=>{
                    if(err) throw err;
                    output[num][att.eng] = result;
                    conn.release();
                    count++;
                    if(count==6){
                        res.json(output);
                    }

                })
            })
        }

    }
    getAllMsg("天辉",0);
    getAllMsg("夜魇",1);


});

router.get("/location",(req,res)=>{
    let output={
        daye:[],
        baofa:[],
    };
    let location = ["hexin","kongzhi","duixianfuzhu","xianshou","daye","fuzhu","naijiu","baofa","tuijin","taosheng"];
    let count = 0;
    for(let f of location){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select hid from hero_location where ${f}="1"`;

        //  通过遍历的当时将 是否是当前location的 hid保存在数组中
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                function getHid(arr){
                    let newarr = [];
                    for(let f of arr){
                        newarr.push(f.hid);
                    }
                    return newarr;
                }
                output[f]=getHid(result);
                conn.release();
                count++;
                if(count==10){
                    res.json(output);
                    // console.log(output);
                }
            })

        })
    }
})
router.get("/attacktype",(req,res)=>{
    let output= {};
    let attype = ["远程","近战"];
    let count = 0;
    for(let i =0;i<2;i++){
        let f= attype[i];
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `select hid from heroes_data where attack_type="${f}"`;
            //  通过遍历的当时将 是否是当前location的 hid保存在数组中
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                function getHid(arr){
                    let newarr = [];
                    for(let f of arr){
                        newarr.push(f.hid);
                    }
                    return newarr;
                }
                let type = ["yuancheng","jinzhan"]

                output[type[i]]=getHid(result);
                conn.release();
                count++;
                if(count==2){
                    res.json(output);
                }
            })
        })
    }
})
router.get("/herolist",(req,res)=>{
    let output=[{},{},{}];
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `select hid,hero_name,hero_cname from heroes_data`;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
})

router.get('/rank',(req,res)=>{
    let output = {power_initial:[],brains_initial:[],agility_initial:[],
        power_grow:[],brains_grow:[],agility_grow:[],move_speed:[],
        attack_value:[],attack_range:[]};
    let arr = ["power_initial","brains_initial","agility_initial",
        "power_grow","brains_grow","agility_grow",
        "move_speed","attack_value","attack_range"];
    let count = 0;
    for(let f of arr){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `SELECT p.hid,hero_cname,xs_pic,${f} as value,attack_type FROM 
                hero_property as p inner JOIN heroes_data
                as d on d.hid=p.hid inner join hero_pic as
                b on b.hid=d.hid ORDER BY ${f} DESC limit 0,10`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output[f] = result;
                count++;
                conn.release();
                if(count==9){
                    res.json(output);
                }
            });
        })
    }

})







router.get("/detail",(req,res)=>{
    res.redirect("/detail/1");
});
router.get("/detail/:hero_id",(req,res)=>{
    let hid = req.params.hero_id;
    /*
    * 要返回过去的内容结构分为
    * let output = {
    *   hero_data:[],
    *   hero_dower:[],
    *   hero_equipment:[],
    *   hero_intro:[],
    *   hero_location:[],
    *   hero_match:[],
    *   hero_pic:[],
    *   hero_property:[],
    *   hero_punctuate:[],
    *   hero_skill:[]
    * };
    *
    * */
    let output = {};
    let tableArr = ["heroes_data","hero_dower",
        "hero_intro","hero_location","hero_pic",
        "hero_property","hero_punctuate","hero_skill"];
    let count = 0;
    for(let f of tableArr){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `SELECT * from ${f} where hid = ${hid}`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                output[f] = result;
                count++;
                conn.release();
                if(count==10){
                    res.json(output);
                }
            });
        })
    }
    let otherArr = ["hero_equipment","hero_match"];

    //对装备选择板块进行 解析
    pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = `SELECT * from hero_equipment where hid = ${hid}`;
            conn.query(sql,(err,result)=>{
                if(err) throw err;
                conn.release();
                let obj = result[0];
                let objArr = Object.keys(result[0]);
                let objCount = 0;  //用来判断是否所有的数据都已经返回
                for(let i in obj){
                    if(i!= "hid" && i!= "hero_id"){
                        // console.log(obj[i]);
                        let str = obj[i];
                        let arr = str.split("@");
                        arr = arr.slice(0,-1);
                        obj[i]=[];
                        let arrCount = 0;
                        for(let f of arr){
                            pool.getConnection((err,conn)=>{
                                if(err) throw err;
                                let sql = `SELECT dname,d.did,goods_pic from goods_detail_style as s 
                        inner join goods_detail as d  on s.did=d.did where dname = '${f}'`;
                                conn.query(sql,(err,result)=>{
                                    if(err) throw err;
                                    // console.log(result[0]);
                                    conn.release();
                                    obj[i].push(result[0]);
                                    arrCount++;
                                    if(arrCount==arr.length){
                                        objCount++;
                                        if(objCount==objArr.length-2){
                                            output["hero_equipment"] = obj;
                                            count++;
                                            if(count==10){
                                                res.json(output);
                                            }
                                        }
                                    }
                                })
                            })
                        }
                    }
                }
            });
        })

    //对英雄配饰板块进行解析
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = `SELECT * from hero_match where hid = ${hid}`;
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            conn.release();
            let obj = result[0];
            let objArr = Object.keys(result[0]);
            let objCount = 0;
            for(let i in obj){
                if(i != "hid" && i != "hero_id"){
                    let str = obj[i];
                    let arr = str.split("@");
                    arr = arr.slice(0,-1);
                    obj[i]=[];
                    let arrCount = 0;
                    for(let f of arr){
                        pool.getConnection((err,conn)=>{
                            if(err) throw err;
                            let sql = `SELECT hero_cname,s.hid,ss_pic from heroes_data as s 
                        inner join hero_pic as p  on s.hid=p.hid where hero_cname = '${f}'`;
                            conn.query(sql,(err,result)=>{
                                if(err) throw err;
                                conn.release();
                                obj[i].push(result[0]);
                                arrCount++;
                                if(arrCount == arr.length){
                                    objCount++;
                                    if(objCount==objArr.length-2){
                                        output["hero_match"] = obj;
                                        count++;
                                        if(count==10){
                                            res.json(output);
                                        }
                                    }
                                }
                            })
                        })
                    }
                }
            }
        });
    })


});


module.exports = router;

// pool.getConnection((err,conn)=>{
//     if(err) throw err;
//     let sql = `SELECT * from hero_match where hid = 1`;
//     conn.query(sql,(err,result)=>{
//         if(err) throw err;
//         let obj = result[0];
//         let objArr = Object.keys(result[0]);
//         /*
//         * obj={hid,hero_id,equierment:[]}
//         *
//         * */
//         let objCount = 0;
//         for(let i in obj){
//             if(i!= "hid" && i!= "hero_id"){
//                 // console.log(obj[i]);
//                 let str = obj[i];
//                 let arr = str.split("@");
//                 arr = arr.slice(0,-1);
//                 console.log(arr);
//                 obj[i]=[];
//                 let count = 0;
//                 for(let f of arr){
//                     pool.getConnection((err,conn)=>{
//                         if(err) throw err;
//                         let sql = `SELECT hero_cname,s.hid,ss_pic from heroes_data as s
//                         inner join hero_pic as p  on s.hid=p.hid where hero_cname = '${f}'`;
//                         conn.query(sql,(err,result)=>{
//                             if(err) throw err;
//                             // console.log(result[0]);
//                             obj[i].push(result[0]);
//                             count++;
//                             if(count==arr.length){
//                                 objCount++;
//                                 if(objCount==objArr.length-2){
//                                     console.log(obj);
//                                 }
//                             }
//                         })
//                     })
//                 }
//             }
//         }
//     });
// })