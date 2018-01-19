<template>
  <div class="main-container clearfix clear">
    <div class="news">
      <div class="news_header">
        <h1>新闻中心</h1>
        <h3>
          <span>您的位置：</span>
          <router-link to="/main">首页</router-link>
          <span>&gt;</span>
          <router-link to="/news">{{showNowNewsStyle}}</router-link>
        </h3>
      </div>
      <div class="news_start">
        <div class="news_hot">
          <ul class="lists clearfix">
            <li class="item">
              <a href="/article/details/20171222/197231.html" target="_blank">
                <i class="icon icon-new"></i>
                <span>
                  <img src="http://img.dota2.com.cn/dota2/19/6d/196d48e9a8fd9991f6656ab15474ae0e1513915061.jpg" alt="DOTA2 PGL Major直邀Newbee、VG、LFY 公开赛报名即将开启">
                </span>
                <span class="filter"></span>
                <span class="desc">DOTA2 PGL Major直邀Newbee、VG、LFY 公开赛报名即将开启</span>
              </a>
            </li>
            <li class="item">
              <a href="/article/details/20171109/196761.html" target="_blank">
                <i class="icon icon-hot"></i>
                <span>
                  <img src="http://img.dota2.com.cn/dota2/3f/e6/3fe699c89a7a040736321e15ba66806a1510220153.jpg" alt="DOTA2完美大师赛互动指南上线 完美盛典投票开启">
                </span>
                <span class="filter"></span>
                <span class="desc">DOTA2完美大师赛互动指南上线 完美盛典投票开启</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="news_lists" id="news_lists">
          <ul class="tabs clearfix">
            <li>
              <a class="tab" :class="{'active':isActive==1}" @click.prevent="changeNewsStyle('all',1)" id="news">综合新闻</a>
            </li>
            <li>
              <a class="tab " :class="{'active':isActive==2}" @click.prevent="changeNewsStyle('gamenews',2)" id="gamenews">官方新闻</a>
            </li>
            <li>
              <a class="tab " :class="{'active':isActive==3}" @click.prevent="changeNewsStyle('competition',3)" id="competition_news">赛事新闻</a>
            </li>
            <li>
              <a class="tab " :class="{'active':isActive==4}" @click.prevent="changeNewsStyle('new_update',4)" id="news_update">更新日志</a>
            </li>
          </ul>
        </div>
        <ul class="news_lists">
          <li class="pane active" v-for="(tmp,index) in showData">
            <a class="item" target="_blank" :href="'http://127.0.0.1:8080/#/news/detail/'+tmp.nid">
              <div class="news_logo">
                <img :src="tmp.new_pic" :alt="tmp.new_title">
              </div>
              <div class="news_msg">
                <h2 class="title">{{tmp.new_title}}</h2>
                <p class="content">{{tmp.new_little_content}}</p>
                <p class="date">{{new Date(tmp.new_creatTime).toLocaleDateString()}}</p>
              </div>
            </a>
          </li>
        </ul>
        <div class="btn_more" id="btn_more">
          <div class="nav nav-prev">
            <a @click="toNextPage(false)">
              <i class="icon icon-left-arrow"></i>
            </a>
          </div>
          <li v-for="tmp in littlePageData" v-if="theOneShow" :class="{'page':'true','active':tmp==pno}">
            <a @click="tothisPage(tmp)" :title="'第'+tmp+'页'">{{tmp}}</a>
          </li>
          <li class="page dots active" v-if="theOneShow">
            <i class="icon icon-dot"></i>
          </li>
          <li v-for="tmp in pageData" :class="{'page':'true','active':tmp==pno}">
            <a @click="tothisPage(tmp)" :title="'第'+tmp+'页'">{{tmp}}</a>
          </li>
          <li class="page dots active" v-if="theTwoShow">
            <i class="icon icon-dot"></i>
          </li>
          <div class="nav nav-next">
            <a @click="toNextPage(true)">
              <i class="icon icon-right-arrow"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <SilderBar class="silder"></SilderBar>
    <div class="anchor" id="anchor" style="display: block;" v-if="anchorShow">
      <a href="javascript:(0)">
        <i class="icon icon-anchor" @click="toTop(0)"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import SilderBar from "@/components/utility/siderbar"
  export default {
    data: function () {
      return {
        isActive: 1,
        isActiveStyle: '综合新闻',
        showData: [],
        anchorShow: false, //回到顶部按钮是否显示
        pno: "1", //用一个变量来保存当前页码数
        news_style: "all", //保存选择的新闻类型
        pageData: [1, 2, 3, 4, 5, 6, 7], //保存当前页码的组成的数组
        littlePageData: [1, 2],
        totalCount: null, //保存总的记录数，用于计算总的页面数
        totalPage: null, //保存总的页面数
        theOneShow: false, //页码条 第一个省略号是否显示
        theTwoShow: true, //页码条里面的 第二个省略号是否显示
        theConnectUrl: 'http://176.211.99.125:3000/', //保存当前的node 的服务器的地址
        theConnectUrl1: 'http://176.211.99.144:3000/', //保存当前的node 的服务器的地址
        theConnectLocalUrl: 'http://127.0.0.1:3000/'
      };
    },
    components: {
      SilderBar: SilderBar
      // 右边导航栏的组件
    },
    methods: {
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 400) this.anchorShow = true;
        else this.anchorShow = false;
      },
      toTop(topheight) {
        let timer = setInterval(() => {
          document.documentElement.scrollTop -= 30;
          if (document.documentElement.scrollTop <= topheight) {
            clearInterval(timer);
            timer = null;
          }
        }, 1);
      },
      tothisPage(tmp) {
        if (this.pno != tmp) {
          this.pno = tmp;
          this.getNowPage();
          this.toTop(300);
        }
      },
      toNextPage(bol) {
        if (bol) {
          if (this.pno < this.totalPage) {
            this.pno++;
            this.getNowPage();
          }
        } else {
          if (this.pno > 1) {
            this.pno--;
            this.getNowPage();
          }
        }
        this.toTop(300);
      },
      getNowPage() { //向服务器请求数据并且 将数据渲染到页面上
        //  url = "http://127.0.0.1:3000/news/index/gamenews/1";

        this.$http.get(this.theConnectLocalUrl + "news/index/" + this.news_style + "/" + this.pno).then((data) => {
          this.showData = data.body.data;
          this.pno = parseInt(data.body.pno);
          this.totalCount = parseInt(data.body.totalCount);
          this.totalPage = Math.ceil(this.totalCount / 10);
          this.getThePageData();
        })
      },
      getThePageData() { //获取当前页码的数组
        if (this.pno < 6) {
          this.pageData = [];
          this.pageData = [1, 2, 3, 4, 5, 6, 7];
          this.theOneShow = false;
          this.theTwoShow = true;
        } else if (this.pno > this.totalPage - 4) {
          this.pageData = [this.totalPage - 4, this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];
          this.theOneShow = true;
          this.theTwoShow = false;
        } else if (this.pno >= 6) {
          this.pageData = [];
          this.pageData[0] = this.pno - 2;
          this.pageData[1] = this.pno - 1;
          this.pageData[2] = this.pno;
          this.pageData[3] = this.pno + 1;
          this.pageData[4] = this.pno + 2;
          this.theOneShow = true;
          this.theTwoShow = true;
        }

      },
      changeNewsStyle(style, index) { //得到当前选中的是哪一个类型的新闻
        this.isActive = index;
        this.pno = 1;
        this.news_style = style;
        this.getNowPage();
      }
    },
    computed: {
      showNowNewsStyle: function () {
        let nowStyle;
        switch (this.isActive) {
          case 1:
            nowStyle = "综合新闻";
            break;
          case 2:
            nowStyle = "官方新闻";
            break;
          case 3:
            nowStyle = "赛事新闻";
            break;
          case 4:
            nowStyle = "更新日志";
            break;
        }
        return nowStyle;
      }
    },
    beforeCreate: function () {
      //在beforeCreate里面得不到 当前保存的变量
    },
    created: function () {
      window.addEventListener('scroll', this.handleScroll);
      this.pno = this.$route.params.pno || 1;
      this.news_style = this.$route.params.style || "all";
      switch (this.news_style) {
        case "all":
          this.isActive = 1;
          break;
        case "gamenews":
          this.isActive = 2;
          break;
        case "competition":
          this.isActive = 3;
          break;
        case "new_update":
          this.isActive = 4;
          break;
        default:
          this.isActive = 1;
          this.news_style = "all";
      }
      this.getNowPage();

    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },

  };

</script>

<style>
  .main-container {
    position: relative;
    width: 1200px;
    margin: -480px auto 0px;
    padding-bottom: 100px;
  }

  .news {
    width: 930px;
    background: #f5f5f5;
    float: left;
  }

  .news .news_header {
    padding: 20px;
    background-color: #ededed;
    overflow: hidden;
  }

  .main-container .news .news_header {
    padding: 20px;
    background-color: #ededed;
    overflow: hidden;
  }

  .main-container .news_header h1,
  .main-container .news_header h3 {
    float: left;
  }

  .main-container .news_header h1 {
    padding: 0 35px 0 10px;
    font-size: 26px;
    color: #333;
    line-height: 1;
    border-left: 4px solid #379be9;
  }

  .main-container .news_header h3 {
    font-size: 14px;
    line-height: 26px;
  }

  .main-container .news .news_start {
    padding: 40px;
  }

  .main-container .news_start .news_hot .item {
    float: left;
    position: relative;
    width: 415px;
    height: 244px;
  }

  .main-container .news_start .news_hot .item:first-child {
    margin-right: 20px;
  }

  .main-container .news_start .news_hot .item a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 20px;
    line-height: 22px;
    color: #fff;
    text-align: center;
  }

  .main-container .news_start .news_hot .item img {
    width: 100%;
    height: 100%;
  }

  .main-container .news_start .news_hot .filter {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8) 80%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8) 80%);
  }

  .icon.icon-hot,
  .icon.icon-new {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
  }

  .icon.icon-hot {
    background-position: -216px -159px;
  }

  .icon.icon-new {
    background-position: -122px -159px;
  }

  .icon.icon-left-arrow {
    background-position: -209px -233px;
  }

  .icon.icon-left-arrow:hover {
    background-position: -285px -233px;
  }

  .icon.icon-right-arrow {
    background-position: -207px -297px;
  }

  .icon.icon-right-arrow:hover {
    background-position: -283px -297px;
  }

  .icon.icon-dot {
    background-position: -334px -233px;
  }

  .main-container .news_start .news_hot .item .desc {
    position: absolute;
    padding: 0 10px;
    display: block;
    width: 100%;
    bottom: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .main-container .news_start .news_hot .item:hover .desc {
    color: #379be9;
  }

  .main-container .news_start .news_lists {
    margin-top: 40px;
  }

  .main-container .news_lists .tab {
    float: left;
    padding: 5px 0;
    width: 25%;
    font-size: 16px;
    height: 36px;
    margin-top: 20px;
    border-style: solid;
    border-color: #d9d9d9 #d9d9d9 #d9d9d9 transparent;
    border-width: 1px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    color: #404040;
    cursor: pointer;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .main-container .news_lists .tab:first-child {
    border-left-color: #d9d9d9;
  }

  .main-container .news_lists .tab:hover,
  .main-container .news_lists .tab.active {
    color: #379be9;
    border-color: #379be9;
  }

  .main-container .news_lists .panes {
    margin-top: 8px;
  }

  .main-container .news_lists .pane {
    display: none;
  }

  .main-container .news_lists .pane.active {
    display: block;
  }

  .main-container .news_lists .pane .item {
    display: block;
    overflow: hidden;
    padding: 22px 25px 22px 0;
    border-bottom: 1px solid #ebebeb;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .main-container .news_lists .pane .item:hover {
    background-color: #eee;
  }

  .main-container .news_lists .pane .item:hover .title {
    color: #379be9;
  }

  .main-container .news_lists .pane .news_logo,
  .main-container .news_lists .pane .news_msg {
    float: left;
    height: 135px;
    overflow: hidden;
  }

  .main-container .news_lists .pane .news_logo {
    width: 230px;
  }

  .main-container .news_lists .pane .news_logo img {
    width: 100%;
    height: 100%;
  }

  .main-container .news_lists .pane .news_msg {
    width: 570px;
    margin-left: 25px;
  }

  .main-container .news_lists .news_msg .title {
    color: #404040;
    font-size: 22px;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .main-container .news_lists .news_msg .content {
    margin-top: 12px;
    max-height: 48px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .main-container .news_lists .news_msg .date {
    color: #999;
    line-height: 45px;
  }

  .main-container .news_start .btn_more {
    display: table;
    border-spacing: 5px 0;
    margin: 20px auto 0;
  }

  .main-container .news_start .btn_more .pages {
    display: table-cell;
    vertical-align: middle;
    border-spacing: 2px 0;
    font-size: 14px;
    line-height: 16px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  .main-container .news_start .btn_more .nav,
  .main-container .news_start .btn_more .page {
    display: table-cell;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .main-container .news_start .btn_more .nav:hover,
  .main-container .news_start .btn_more .page:hover {
    border-color: #379be9;
    color: #379be9;
  }

  .main-container .news_start .btn_more .nav:hover .icon-left-arrow {
    background-position: -285px -233px;
  }

  .main-container .news_start .btn_more .nav:hover .icon-right-arrow {
    background-position: -283px -297px;
  }

  .main-container .news_start .btn_more .nav i {
    margin-top: -4px;
  }

  .main-container .news_start .btn_more .page.active {
    background-color: #379be9;
    border-color: #379be9;
    color: #fff;
  }

  .main-container .news_start .btn_more .page.active a {
    background-color: #379be9;
    color: #fff;
  }

  .main-container .news_start .btn_more .page.dots {
    background-color: transparent;
    border-color: transparent;
  }

  .main-container .news_start .btn_more a {
    display: block;
    /*margin-top: 13px;*/
    background-color: #eee;
    text-align: center;
    height: 100%;
    line-height: 35px;
    font-size: 18px;
    border: 1px solid transparent;
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    color: #666;
  }

  .main-container .news_start .btn_more a:hover {
    /*border-color: #379be9;*/
    color: #379be9;
  }

  .main-container .news_start .btn_more a:hover .icon-plus {
    background-position: -118px -272px;
  }


  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    background-image: url("../../assets/img/news/icons.png");
  }

  .icon.icon-anchor {
    width: 52px;
    height: 52px;
    background-position: -14px -159px;
  }

  .icon.icon-anchor:hover {
    background-position: -14px -239px;
  }
  /* 设置右边导航 栏的 位置  */

  .main-container .silder {
    width: 240px;
    height: 800px;
    float: left;
  }

</style>
