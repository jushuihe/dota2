<template>
  <div class='header'>
    <div class="logo pull-left">
      <a class="website" href="http://www.dota2.com.cn/" target="_blank"></a>
    </div>
    <nav class="pull-right">
      <ul>
        <li>
          <a class="index orange" href="/home/index?i=index">首页</a>
        </li>
        <li>
          <a class="myask" id="myask" href="javascript:;">我的提问</a>
        </li>
        <li>
          <a class="self" href="/home/selfservice?i=self">自助服务</a>
        </li>
        <li>
          <a class="online" href="/home/onlineservice?i=online">联系客服</a>
        </li>
        <li>
          <a href="http://www.dota2.com.cn/event/201405/newer/" target="_blank">新手指南</a>
        </li>
      </ul>
      <div class="search pull-left">
        <form id="searchform" name="searchform" action="/home/search" method="post" onkeydown="if(event.keyCode==13){return false;}">
          <input type="text" id="search-input" placeholder="请输入您要搜索的问题" v-model="InputVal" />
          <div @click="searchData" class="serclick orange2 pull-left" id="search">搜索答案</div>
        </form>
        <div class="serclick green pull-right">
          <a href="javascript:;" id="serclick" class="serclick">我要提问？</a>
        </div>
      </div>

    </nav>
    <div class="login" id="js_login"> 您好：
      <span>请
        <a href="#~" class="orange" id="J_dota2SignIn">[登录]</a>
      </span>
    </div>
  </div>

</template>
<script>
  import Bus from '../common/bus.js'
  export default {
    data: function () {
      return {
        InputVal: "",
        searchResult: "",
        searchFlag: false
      }
    },

    methods: {
      searchData() {
        // console.log(this.InputVal);
        this.searchFlag = false;
        this.$http.get("http://127.0.0.1:3000/service/service/data/" + this.InputVal)
          .then(function (response) {
            this.searchResult = response.body.msg;
            // console.log( this.searchResult);
            // this.$emit("getHeader",this.searchResult)
            Bus.$emit("getHeaderData", this.searchResult);
            Bus.$emit("getHeaderFlag", this.searchFlag);
            console.log("header中flag值：" + this.searchFlag);
          })
        // Bus.$emit("getHeaderData",this.searchResult);

      }
    }
  }

</script>
<style>
  /*header左部分LOGO*/

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .header .logo {
    width: 192px;
    height: 200px;
    background: url(../../assets/img/service/dota_logo.png) no-repeat 0 48px;
  }

  .header nav {
    width: 790px;
    height: 200px;
    background: url(../../assets/img/service/service.png) no-repeat left center;
  }

  .header {
    width: 982px;
    height: 200px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
  }

  .header .login {
    position: absolute;
    top: 16px;
    right: 0;
    height: 26px;
    padding: 0 15px;
    border: 1px solid #ccc;
    color: #ccc;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
  }
  /*导航列表*/

  nav ul {
    margin-top: 68px;
    float: right;
  }

  nav ul li {
    float: left;
    margin-left: 30px;
    width: 72px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  nav ul li a {
    font-size: 17px;
    color: #7b7e7e;
    cursor: pointer;
  }
  /*搜索框*/

  nav .search {
    width: 790px;
    height: 36px;
    margin-top: 30px;
    padding: 0;
  }

  nav .search input {
    float: left;
    width: 550px;
    height: 36px;
    padding-left: 20px;
  }

  nav .serclick {
    width: 108px;
    height: 38px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    cursor: pointer;
  }

  nav .orange2 {
    background: #f16236;
  }

  nav .green {
    background: #13a7a9;
  }

</style>
