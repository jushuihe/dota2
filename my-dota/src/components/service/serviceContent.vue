<template>
  <div class="content clear">
    <aside class="pull-left">
      <div class="title">常见问题分类</div>
      <ul>
        <li @click="ardownClick" class="ardown" id="1">
          <span :class="{active:itemShowFlag==1}">帐号问题</span>
        </li>
        <transition name="fold">
          <ul class="list">
            <li @click="getQuestion" :class="{'addmove':itemShowFlag==1,'addremove':itemShowFlag!=1&&itemShow[0]}">
              <a id=71 data-toggle="1,1">充值消费</a>
            </li>
            <li @click="getQuestion" :class="{'addmove':itemShowFlag==1,'addremove':itemShowFlag!=1&&itemShow[0]}">
              <a id=101 data-toggle="1,2">账号管理</a>
            </li>
          </ul>
        </transition>
        <li @click="ardownClick" class="ardown" id="2">
          <span :class="{active:itemShowFlag==2}">交易问题</span>
        </li>
        <ul class="list" >
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==2,'addremove':itemShowFlag!=2&&itemShow[1]}">
            <a id=131 data-toggle="2,3">道具交易</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==2,'addremove':itemShowFlag!=2&&itemShow[1]}">
            <a id=141 data-toggle="2,4">包装礼品</a>
          </li>
        </ul>
        <li @click="ardownClick" class="ardown" id="3">
          <span :class="{active:itemShowFlag==3}">技术问题</span>
        </li>
        <ul class="list"  >
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==3,'addremove':itemShowFlag!=3&&itemShow[2]}">
            <a id=181 data-toggle="3,5">反作弊</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==3,'addremove':itemShowFlag!=3&&itemShow[2]}">
            <a id=201 data-toggle="3,6">客户端问题</a>
          </li>
        </ul>
        <li @click="ardownClick" class="ardown" id="4">
          <span :class="{active:itemShowFlag==4}">游戏问题</span>
        </li>
        <ul class="list" >
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==4,'addremove':itemShowFlag!=4&&itemShow[3]}">
            <a id=91 data-toggle="4,7">游戏功能</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==4,'addremove':itemShowFlag!=4&&itemShow[3]}">
            <a id=111 data-toggle="4,8">游戏介绍</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==4,'addremove':itemShowFlag!=4&&itemShow[3]}">
            <a id=171 data-toggle="4,9">道具相关</a>
          </li>
        </ul>
        <li @click="ardownClick" class="ardown" id="5">
          <span :class="{active:itemShowFlag==5}">活动问题</span>
        </li>
        <ul class="list" >
          <li @click="getQuestion"  :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=81 data-toggle="5,10">2015国际邀请赛</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=121 data-toggle="5,11">传承活动</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=161 data-toggle="5,12">2015亚洲邀请赛</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=191 data-toggle="5,13">PA至宝活动</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=211 data-toggle="5,14">网吧特权</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=221 data-toggle="5,15">年兽活动</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=231 data-toggle="5,16">冥魂之夜</a>
          </li>
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==5,'addremove':itemShowFlag!=5&&itemShow[4]}">
            <a id=241 data-toggle="5,17">夜魇暗潮</a>
          </li>
        </ul>
        <li @click="ardownClick" class="ardown" id="6">
          <span :class="{active:itemShowFlag==6}">其它</span>
        </li>
        <ul class="list">
          <li @click="getQuestion" :class="{'addmove':itemShowFlag==6,'addremove':(itemShowFlag!=6&&itemShow[5])}">
            <a id=271 data-toggle="6,18">其它问题</a>
          </li>
        </ul>
      </ul>
    </aside>
    <!--<router-view></router-view>-->
    <!--<serviceDetail :sendData='qLists' :flagFromFather='flagFromDetail' @sendToFather="rcvMsg"></serviceDetail>-->
    <section class="pull-right" id="question">
      <div class="address">热门问题</div>
      <div class="substance">

        <!--初始状态问题列表-->
        <div v-if="this.qLists.length==0 && searchResult.length==0">
          <ul v-if="!initAnswerShow">
            <li>
              <a @click="getInitAnswer(14)">收费模式是什么？</a>
            </li>
            <li>
              <a @click="getInitAnswer(1)">《DOTA2》如果总提示网络连接中、更新已挂起、准备就绪或者无更新速度如何处理？</a>
            </li>
            <li>
              <a @click="getInitAnswer(2)">《DOTA2》观战页面无比赛或只有少数几场比赛是什么情况？</a>
            </li>
            <li>
              <a @click="getInitAnswer(3)">《DOTA2》我已有外服DOTA2账号，登陆后提示我需要进行一次安全认证？</a>
            </li>
            <li>
              <a @click="getInitAnswer(4)">《DOTA2》如何添加、删除好友？</a>
            </li>
            <li>
              <a @click="getInitAnswer(5)">《DOTA2》windows8系统日文版的是否支持dota2？</a>
            </li>
            <li>
              <a @click="getInitAnswer(6)">《DOTA2》镶嵌宝石后有什么好处？</a>
            </li>
            <li>
              <a @click="getInitAnswer(7)">《DOTA2》如何改为DOTA1传统键位？</a>
            </li>
            <li>
              <a @click="getInitAnswer(8)">《DOTA2》完美手机卡充值流程</a>
            </li>
            <li>
              <a @click="getInitAnswer(9)">《DOTA2》登陆游戏使用DOTA2账号还是使用完美电竞账号？</a>
            </li>

          </ul>
          <ul v-if="initAnswerShow">
            <li>{{qtitle}}</li>
            <li>{{qanswer}}</li>
          </ul>
        </div>
        <!--点击单个问题，显示对应问题答案页面-->
        <ul v-if="QAchangFlag && searchAnswerShow">
          <li>{{qtitle}}</li>
          <li>{{qanswer}}</li>
        </ul>
        <!--点击问题类型，显示对应问题列表-->
        <ul v-if="!QAchangFlag && searchResult.length==0">
          <li v-for="(tmp,index) in qLists" :key="index" @click="getAnswer(tmp,tmp.tid)">
            <a>
              {{tmp.qtitle}}
            </a>
          </li>
        </ul>
        <!--点击搜索，出现所搜结果问题列表-->
        <!--<h1 @click="fn()">{{searchResult}}</h1>-->

        <ul v-if="searchAnswerShow==false">
          <li v-for="(tmp,index) of searchResult" :key="index" @click="getAnswer(tmp,tmp.tid)">{{tmp.qtitle}}</li>
        </ul>
      </div>
      <!--分页按钮-->
      <!--<div class="paginate">
                <ul id="js_paginate">
                    <li class="prev disabled"><a>&lt;</a></li>
                    <li class="active" ><a>1</a></li>
                    <li class="next"><a href="/home/commonques?page=2&amp;cid=71&amp;lpid=">&gt;</a></li>
                </ul>
            </div>-->
    </section>
  </div>
</template>
<script>
  // import serviceDetail from '@/components/service/serviceDetail'
  import Bus from '../common/bus.js'
  export default {
    components: {
      // serviceDetail:serviceDetail
    },
    data: function () {
      return {
        itemShowFlag: 0, //是否显示下拉列表项,判断显示
        itemShow: [false,false,false,false,false,false], //显示一个下拉列表
        qtype: 1, //问题类型1
        qsubtype: 1, //问题子类型
        pno: 0,
        qLists: [], //存放问题答案对象数组
        QAchangFlag: false, //从子组件Detail获取的flag
        qtitle: '',
        qanswer: '',
        searchResult: [], //得到Header传来的查询结果数据
        searchAnswerShow: false, //点击搜索到的问题，跳转到答案页flag
        initAnswerShow: false //初始状态时问题及答案

      }
    },
    mounted: function () {
      // this.$watch(this.sendData,function(sendData){console.log(sendData)});
      // this.output.data=this.sendData;
      Bus.$on('getHeaderData', (msg) => {
        this.searchResult = msg;
        console.log(typeof (this.searchResult));
        // console.log(this.searchResult);
      })
      Bus.$on('getHeaderFlag', (msg) => {
        this.searchAnswerShow = msg;
        console.log("Content中flag值" + this.searchAnswerShow);
      })

    },
    methods: {
      ardownClick:function(e){
        // this.itemShow = true;
        let count;
        if (e.target.tagName == 'SPAN') {
          var tarId = e.target.parentNode.getAttribute("id");
          count = tarId;
        } else {
          count = e.target.getAttribute("id");
        };
        // console.log( this.itemShow)
        this.itemShow.splice(count-1,1,true);
        // console.log(count);
        this.itemShowFlag = (this.itemShowFlag == count) ? 0:count;
      },
      //从服务器端获取问题数据
      getQuestion(e) {
        //点击时从答案页回到问题页的flag设置为false
        this.QAchangFlag = false;
        this.searchResult = [];
        var tar = e.target;
        //点击li如果点击到a标签，做不同处理
        if (e.target.tagName == "A") {
          this.qtype = parseInt(tar.getAttribute("data-toggle").split(",")[0]);
          this.qsubtype = parseInt(tar.getAttribute("data-toggle").split(",")[1]);
        } else {
          this.qtype = parseInt(tar.firstChild.getAttribute("data-toggle").split(",")[0]);
          this.qsubtype = parseInt(tar.firstChild.getAttribute("data-toggle").split(",")[1]);
          // console.log(this.qtype,this.qsubtype);
        }
        this.$http.get("http://127.0.0.1:3000/service/" + this.qtype + "/" + this.qsubtype)
          .then(function (response) {
            // console.log(response);
            this.qLists = response.body.msg;
            //    console.dir(this.qLists);
          })
        // this.$watch('sendData',function(data){console.log(data)});
        // console.log(this.flagFromDetail);

      },
      getAnswer(e, tid) {
        this.qtitle = e.qtitle;
        this.qanswer = e.qanswer;
        // this.getAnswerFlag=this.flagFromFather;
        this.QAchangFlag = true;
        this.searchAnswerShow = true;
        // this.$emit("sendToFather",this.getAnswerFlag);
      },
      //获取子组件传递过来的数据，getAnswerFlag
      // rcvMsg(flag){
      //     this.flagFromDetail=flag;
      //     // console.log(flag);
      // }
      getInitAnswer(tid) {
        this.$http.get("http://127.0.0.1:3000/service/" + tid)
          .then(function (response) {
            var res = response.body.msg;
            this.qtitle = res[0].qtitle;
            this.qanswer = res[0].qanswer;
            this.initAnswerShow = true;
            console.log(res[0].qtitle);
          })
      }
    }

  }

</script>
<style>
  .fold-enter-active {
    transition: all o.5s linear;
  }
  /*标题*/

  .content .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #13a7a9;
    color: #eee;
  }
  /*content 问题内容部分*/

  .content {
    width: 982px;
    min-height: 645px;
    position: relative;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .content a{
      color:#999;
  }
  /*内容左侧导航部分*/

  .content aside {
    float: left;
    width: 192px;
    height: 100%;
    background-color: #293034;
    height:645px;
    margin-left:70px;
  }

  .content>aside>ul>li {
    width: 100%;
    /*height:36px;*/
    padding: 12px 20px 10px 50px;
    box-sizing: border-box;
    background-color: #293034;
    border-bottom: 1px solid #3a4044;
    cursor: pointer;
    /*margin-bottom:10px;*/
  }

  .content ul li span {
    width: 100%;
    display: inline-block;
    /*padding-right:10px;*/
    color: #999;
    font-size: 15px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .content ul li span:after {
    content: "";
    width: 8px;
    height: 8px;
    display: block;
    border-bottom: 2px solid #999;
    border-right: 2px solid #999;
    transform: rotate(-45deg);
    float: right;
  }
  /*列表详情样式*/

  .list {
    width: 100%;
    box-sizing: border-box;
    background-color: black;
    color: #eee;
    font-size: 15px;
    overflow:hidden;
  }

  .list li {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    line-height: 40px;
    height:0px;
  }
  /*点击时活动条样式*/

  .content ul li span.active:after {
    transform: rotate(45deg);
    transition: all .2s linear;
  }
  /*问题答案详情页*/

  .pull-right {
    float: right;
  }

  section {
    width: 720px;
    min-height: 645px;
    background-color: #fff;
  }

  .address {
    color: #f9521e;
    font-size: 14px;
    font-weight: 900;
    line-height: 20px;
    padding:20px 24px 10px;
  }

  section .substance {
    min-height: 350px;
    width: 670px;
    border: 2px solid #d9dddf;
    padding: 15px 0;
    background: url(../../assets/img/service/people.png) no-repeat right 100px;
    margin-bottom: 30px;
    line-height: 25px;
    padding-left: 28px;
    box-sizing: border-box;
    font-size: 13px;
    color: #8f8f8f;
    margin:0px auto;

  }

  .substance ul li {
    cursor: pointer;
  }
  .substance ul li .title{
    font-weight:800;
  }
  .addmove{
    animation: myAdd 0.5s 1;
    animation-fill-mode:both;
  }
  @keyframes myAdd{
    0%{
      height:0;
    }
  
    100%{
      height:40px;
    }
  }
  .addremove{
    animation: myYincang 0.5s 1;
    animation-fill-mode:both;
  }
  @keyframes myYincang{
    0%{
      height:40px;
    }
    100%{
      height:0px;
    }
  }
  

</style>
