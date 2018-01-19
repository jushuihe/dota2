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
          <span>&gt;</span>
          <router-link :to="'/news/detail/'+newsId">{{newsTitle}}</router-link>
        </h3>
      </div>
      <div class="news_main">
        <div id="title">
          <h1>{{newsTitle}}</h1>
          <h3>{{newsUpdateTime}}
            <span>
              【字号:
              <a @click="changeFontSize(16)">大</a>&nbsp;
              <a @click="changeFontSize(14)">中</a>&nbsp;
              <a @click="changeFontSize(12)">小</a>&nbsp; 】
            </span>
            <span class="comments-count" id="comments-count">
              <i class="icon icon-comments"></i>
              <em>1</em>
            </span>
          </h3>
        </div>
        <div class="newscontent" v-html="newsContent"></div>
        <div class="newsfooter">
          <span>分享到:</span>
          <span class="bdsharebuttonbox bdshare-button-style0-24">
            <a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
            <a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            <a class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
            <a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
            <a class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
            <a class="bds_linkedin" data-cmd="linkedin" title="分享到linkedin"></a>
          </span>
        </div>
        <div class="comments-wrapper">
          <h1>评论</h1>
          <div class="comments" v-for="tmp in 4" id="comments">
            <div class="comment">
              <div class="avatar">
                <img src="../../assets/img/news/comment_default_avatar.png">
              </div>
              <div class="comment-body">
                <div class="body-header">
                  <span class="name">玩家656123321</span>
                  <span class="date">2017-12-23 10:02:03</span>
                  <div class="btns"></div>
                </div>
                <div class="body-content">
                  <p>miko棒棒哒 dota群258215655 诚招各路闲散玩家</p>
                </div>
                <div class="body-sub">
                  <p class="name">玩家44646</p>
                  <p>求一个到DOTA群</p>
                </div>
              </div>
            </div>

          </div>
          <div class="replay" id="reply">
            <div class="reply-title clearfix">
              <h2>您的评论</h2>
              <h6>共
                <em>0</em>条评论</h6>
            </div>
            <div class="reply-box clear">
              <textarea placeholder="请输入您的评论"></textarea>
              <div class="sreply-btn">
                <span>最多输入200字</span>
                <input type="button" id="btn-submit" value="登录">
              </div>
            </div>

          </div>
          <div class="report" id="report">
            <div class="report-header clearfix"></div>
            <div class="report-body"></div>
            <div class="report-footer"></div>
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
        isActiveStyle: '综合新闻', //用来保存当前的新闻的类型
        newsId: null,
        anchorShow: false, //回到顶部按钮是否显示
        newsContent: null, //用来当前页面的 新闻的信息 新闻的内容
        newsTitle: null, //新闻的标题
        newsUpdateTime: null, //新闻的更新时间
        newsStyle: null, // 新闻的类型
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
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);
        if (scrollTop > 400) this.anchorShow = true;
        else this.anchorShow = false;

        // console.log(this.anchorShow);
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
      getNowPageData() { //向服务器请求数据并且 将数据渲染到页面上
        this.$http.get(this.theConnectLocalUrl + "news/detail/" + this.newsId).then((data) => {
          if (data.body == "error") {
            this.$router.push("/error")
          } else {
            this.newsContent = data.body[0].new_content_part;
            this.newsTitle = data.body[0].new_title;
            this.newsUpdateTime = data.body[0].new_creatTime;
            this.newsUpdateTime = new Date(this.newsUpdateTime).toLocaleDateString();
            this.newsStyle = data.body[0].new_style;
          }

        })
      },
      changeFontSize(size) {
        // console.log(size);
        let content = document.getElementsByClassName("newscontent")[0];
        content.style.fontSize = size + "px";
      }
    },
    computed: {
      showNowNewsStyle: function () {
        let nowStyle;
        switch (this.newsStyle) {
          case "gamenews":
            nowStyle = "官方新闻";
            break;
          case "competition":
            nowStyle = "赛事新闻";
            break;
          case "new_update":
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
      this.newsId = this.$route.params.newsId
      this.getNowPageData();
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

  .main-container #title h1 {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 40px;
    font-size: 32px;
  }

  .main-container #title h3 {
    text-align: center;
    margin-bottom: 30px;
    color: #888;
  }

  .main-container #title h3 a {
    color: #888;
    cursor: pointer;
  }

  .main-container .newscontent {
    background: #f5f5f5;
    font-size: 14px;
  }
  .main-container .newscontent img{
    width:100%;

  }
  .newscontent p {
    margin-left: 70px;
    margin-right: 70px;
    margin-top: 25px !important;
  }
  /* newsfooter 里面的分享 后面的图片 */

  .main-container .newsfooter {
    margin-top: 30px;
    margin-left: 20px;
    font-size: 16px;
  }

  .main-container .bdshare-button-style0-24 a {
    display: inline-block;
    float: none;
    padding-left: 24px;
    margin-left: -5px;
    vertical-align: middle;
    background-image: url("../../assets/img/news/icons.png");
    height: 30px;
    margin-right: 0;
    margin-left: 10px;
    vertical-align: middle;
  }

  .bdshare-button-style0-24 [class^="bds_"]:hover {
    opacity: 1 !important;
  }

  .bdshare-button-style0-24 .bds_tqq {
    background-position: -14px -9px !important;
  }

  .bdshare-button-style0-24 .bds_tqq:hover {
    background-position: -14px -84px !important;
  }

  .bdshare-button-style0-24 .bds_qzone {
    background-position: -68px -9px !important;
  }

  .bdshare-button-style0-24 .bds_qzone:hover {
    background-position: -68px -84px !important;
  }

  .bdshare-button-style0-24 .bds_sqq {
    background-position: -122px -9px !important;
  }

  .bdshare-button-style0-24 .bds_sqq:hover {
    background-position: -122px -84px !important;
  }

  .bdshare-button-style0-24 .bds_tsina {
    background-position: -176px -9px !important;
  }

  .bdshare-button-style0-24 .bds_tsina:hover {
    background-position: -176px -84px !important;
  }

  .bdshare-button-style0-24 .bds_weixin {
    background-position: -230px -9px !important;
  }

  .bdshare-button-style0-24 .bds_weixin:hover {
    background-position: -230px -84px !important;
  }

  .bdshare-button-style0-24 .bds_linkedin {
    background-position: -284px -9px !important;
  }

  .bdshare-button-style0-24 .bds_linkedin:hover {
    background-position: -284px -84px !important;
  }
  /* 评论区的样式 */

  .main-container .comments-wrapper {
    width: 90%;
    margin: 50px auto;
    border-top: 2px solid #bbb;
  }

  .main-container .comments-wrapper h1 {
    margin-top: 50px;
    color: #666;
    font-weight: 300;
  }

  .main-container .comments-wrapper .replay {
    /* 设置提交评论的样式 */
    margin-top: 30px;
    font-weight: 300;
  }

  .main-container .comments-wrapper .replay h2 {
    display: inline-block;
  }

  .main-container .comments-wrapper .replay h6 {
    display: inline-block;
    float: right;
    margin-right: 20px;
    line-height: 24px;
  }

  .main-container .comments-wrapper .reply-box {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 10px;
    box-shadow: 2px 2px 2px #ddd;
  }

  .main-container .comments-wrapper .reply-box textarea {
    margin: 10px 10px;
    border: none;
    resize: none;
    line-height: 1.5;
    overflow: hidden;
    background: #fff;
    width: 95%;
    height: 100px;
    font-size: 16px;
    padding-left: 10px;
  }

  .main-container .comments-wrapper .reply-box .sreply-btn span {
    margin-left: 20px;
    line-height: 30px;
  }

  #btn-submit {
    display: inline-block;
    float: right;
    margin: 5px 5px 0 0;
    padding: 0 20px;
    height: 30px;
    border-radius: 3px;
    background-color: #379be9;
    border: none;
    color: #fff;
    cursor: pointer;
    font-family: 'Microsoft YaHei';
    line-height: 30px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .main-container .comments-wrapper .reply-box textarea:focus {
    outline: 0;
  }

  .main-container .comment {
    padding-bottom: 25px;
    border-bottom: 1px solid #ebebeb;
  }

  .main-container .comment .avatar {
    float: left;
    margin-top: 5px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #cfcfcf;
    overflow: hidden;
  }

  .main-container .comment .avatar img {
    width: 100%;
    height: 100%;
  }

  .main-container .comment .comment-body {
    margin: 35px 0 0 50px;
  }

  .main-container .comment .body-header {
    font-size: 12px;
    line-height: 22px;
    color: #999;
  }

  .main-container .comment .body-header .name {
    margin-right: 20px;
    color: #379be9;
  }

  .main-container .comment .body-header .btns {
    float: right;
  }

  .main-container .comment .body-header .link-btn {
    background: none;
    margin-left: 10px;
    color: #999;
  }

  .main-container .comment .body-header .link-btn:hover {
    color: #379be9;
  }

  .main-container .comment .body-header .link-btn:hover .icon-replay {
    background-position: -384px -120px;
  }

  .main-container .comment[data-approved="true"] .body-header .link-btn.btn-agree {
    cursor: default;
    color: #379be9;
    pointer-events: none;
  }

  .main-container .comment .body-header .link-btn:hover .icon-report {
    background-position: -380px -156px;
  }

  .main-container .comment[data-approved="true"] .body-header .icon-agree,
  .main-container .comment .body-header .link-btn:hover .icon-agree {
    background-position: -380px -46px;
  }

  .main-container .comment .body-content {
    margin-top: 5px;
    font-size: 14px;
    line-height: 24px;
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .main-container .comment .body-sub {
    margin-top: 10px;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 24px;
    background-color: #ebebeb;
  }

  .main-container .comment .body-sub .name {
    margin-bottom: 5px;
    color: #379be9;
  }
  /* 设置右边导航 栏的 位置  */

  .main-container .silder {
    width: 240px;
    height: 800px;
    float: left;
  }

  .main-container .anchor {
	position: fixed;
	display: none;
	left: 50%;
	margin-left: 360px;
	bottom: 200px;
	/*margin-top: 200px;*/
}
.icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    background-image: url("../../assets/img/news/icons (1).png");
}
.icon.icon-anchor {
    width: 52px;
    height: 52px;
    background-position: -14px -159px;
}
.icon.icon-anchor:hover {
    background-position: -14px -239px;
}
.icon.icon-comments {
    background-position: -456px -5px;
}

</style>
