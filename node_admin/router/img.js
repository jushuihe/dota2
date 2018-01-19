/*
 * 这是用户相关的所有路由
 * */
const http = require("http");
const express= require("express");

let router = express.Router();
const fileUrl = "C:/xampp/htdocs/group_project/node_font_admin/html/";
router.get("/",(req,res)=>{
    res.redirect("/login");
});
router.get("/login",(req,res)=>{
    res.sendFile(fileUrl+"login.html");
});
router.get("/register",(req,res)=>{
    res.sendFile(fileUrl+"register.html");
});
router.get("/center/:uname",(req,res)=>{
    let uname = req.params.uname;
    console.log(uname);
    res.sendFile(fileUrl+"usercenter.html");
});

module.exports = router;