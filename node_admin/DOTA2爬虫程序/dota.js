/**
 * Created by web-01 on 2017/12/12.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
let superagent = require('superagent');
let cheerio = require('cheerio');

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


//todo 封装一个函数  传入一个本地文件的地址，读取文件 获得想要的href 地址的数组
function getMsg(address){
    return new Promise((res,err)=>{
        fs.readFile(address,(err,data)=>{
            var str = data.toString();
            const $ = cheerio.load(str);
            var arr = $(".picbox span>a");
            let hrefArr = [];
            for(var i=0,length=arr.length;i<length;i++){
                hrefArr.push(arr[i].attribs.href);
            }
            res(hrefArr);
        })
    })
}

//toDO 这里封装一个函数 ，如果得到一个可以进入的url， 执行这个函数将请求的文件保存在文件夹中
let j=1;
function download(url){
    let fileAddress = `./file/${filename}.html`;
    // console.log('fileAddress'+fileAddress);
    // console.log(fileAddress);
    return new Promise((ers,err)=>{
        http.get(url,(res)=>{
            // res.pipe(fs.createWriteStream(fileAddress));
            // console.log(res.headers);
            res.on('data',(buf)=>{
                // console.log(buf);
                let msg = buf.toString('utf-8');
                // console.log(msg);
                fs.appendFileSync(fileAddress,msg);
                ers(fileAddress);
                //let writer = fs.createWriteStream(fileAddress);
                // writer.write(msg);
                // writer.end();
                // writer.on('finish',()=>{
                //     console.log("写入完毕");
                //     ers(fileAddress);
                // });
            })
        })
    })
}

let url = "http://www.dota2.com.cn/enjoy/gamewall/index3.htm";
let filename = url.slice(url.lastIndexOf("/")+2,url.lastIndexOf("."));
fun(url);


// let url = "http://pdf7.tarena.com.cn/tts8_source/ttsPage/WEB/WEB_N_V03_P/DATABASE/DAY01/COURSE/ppt.html";
// download(url);    //测试单次写入文件的函数

//todo 通过传入每个图片的地址 将图片保存在电脑中
function downloadPic(url,fileAddress){
    let i = fileAddress.lastIndexOf("/");
    let muluAddress = fileAddress.slice(0,i);
    // console.log(muluAddress);
    mkdir(muluAddress);
    http.get(url,(res)=>{
        res.pipe(fs.createWriteStream(fileAddress));
    });
}

function getFilename(url){
    let str1 = url.slice(34);
    let i = str1.indexOf("/");
    let fileName1 = str1.slice(0,i);
    let str2 = str1.slice(fileName1.length+1);
    i  = str2.indexOf("/");
    let fileName2 = str2.slice(0,i);
    return {name1:fileName1,name2:fileName2};
    // fileName3 = str2.slice(i+1);
}

let names = [
    {name:"SPEC",count:1},
    {name:"DATABASE",count:3},
    {name:"SERVER",count:6},
    {name:"HTML5BASIC",count:2},
    {name:"JAVASCRIPTBASIC",count:5},
    {name:"AJAX",count:3},
    {name:"CSS3BASIC",count:4},
    {name:"CSS3CORE",count:2},
    {name:"JAVASCRIPTCORE",count:6},
    {name:"DOM",count:4},
    {name:"JQUERY",count:5},
    {name:"HTML5CORE",count:5},
    {name:"BOOTSTRAP",count:4},
    {name:"VueJS",count:3},
    {name:"ANGULARJS",count:4},
    {name:"WEB%20APP",count:3},
    {name:"WEBAPPCORE",count:4},
    {name:"HYBRID",count:1},
    {name:"WEIXIN",count:3},
    {name:"NODEJS-N",count:3}
];
//   let url = "http://pdf7.tarena.com.cn/tts8_source/ttsPage/WEB/WEB_N_V03_P/DATABASE/DAY01/COURSE/ppt.html";
// var img_url="http://pdf7.tarena.com.cn/tts8_source/ttsPage/WEB/WEB_N_V03_P/DATABASE/DAY02/COURSE/15_V01DATABASEDAY02_001.png";
//todo 只能获得 url 地址中的内容 和js 地址
async function fun(url){
    // let obj = getFilename(url);  //获取文件的分页表示
    let address = await download(url);
     console.log(address);
    let kwords= await getMsg(address);
    console.log(kwords,kwords.length);   //得到当前页 的图片地址的集合
    for(let f of kwords){
        // console.log(str);
        let obj = getFilename(f);
        if(f.slice(0,4)!="http") f = "http://www.dota2.com.cn"+f;
        let fileAddress = `./file/${filename}/${f.slice(f.lastIndexOf("/"))}`;
        let url_pic = f;
        downloadPic(url_pic,fileAddress);
    }
    // console.log("下载完成");

// fun(url);00
function fn(){
    for(let f of names){
        for(let i =1;i<=f.count;i++){}
            let url = `http://pdf7.tarena.com.cn/tts8_source/ttsPage/WEB/WEB_N_V03_P/${f.name}/DAY0${i}/COURSE/ppt.html`;
            fun(url);
            // console.log('下载完成');
        }
    }
}
// fn();

