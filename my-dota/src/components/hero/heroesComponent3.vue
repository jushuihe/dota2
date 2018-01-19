<template>
    <div id="content">
        <div class="bg">
          <!-- top -->
          <div class="hero_top clear">
            <!-- left top -->
            <ul class="top_tab_ul">
              <li>
                <router-link to="./all" >全部英雄</router-link>
              </li>
              <li>
                <router-link to="./rank">英雄排行</router-link>
                <!-- <a href="#" class="present">英雄排行</a> -->
              </li>
              <li>
                  <router-link to="./battle"  class="present">英雄对比</router-link>
              </li>
            </ul>
            <!-- right top  -->
            <div class="top_search">
              <div class="top_search_help">
                <input type="text" placeholder="请输入搜索内容" class="search_inp">
                <a href="#" class="search_a">搜索</a>
              </div>
              <div class="top_search_help">
                <a href="#" class="btn_col"></a>
                <a href="#" class="btn_err"></a>
              </div>
            </div>
          </div>
          <!-- 英雄排行 -->
          <div class="hero_cont">
            <h1 class="large">敬请期待!!</h1>
          </div>
        </div>
      </div>
</template>


<script>
  export default {
    data(){
      return {
        list:[true,true,true,true,false]

      }
    }
  }

</script>

<style lang="">
  .large{
    font-size:100px;
  }
  #content {
    width:100%;
    background: #141516;;
  }
  #content .bg{
      width:100%;
      background-color: #141516;
  }
  #content .bg .hero_top{
      background-color:#1F2021;
      width:1000px;
      height: 115px;
      padding: 0 10px;
      margin: 0 auto;
      overflow: hidden;
      background-image: url(../../assets/img/heroes/hero_top_bg.jpg);
  }
  #content .bg .hero_top .top_tab_ul{
      float: left;
      padding-top: 69px;
      height: 42px;
      /*overflow: hidden;*/
      display: inline-block;
  }
  #content .bg .hero_top .top_tab_ul>li{
      float: left;
      display: inline-block;
      width: 129px;
      margin-right: 1px;
      background:red;
  }
  #content .bg .hero_top .top_tab_ul>li>a{
      display: inline-block;
      width: 129px;
      height: 42px;
      text-align: center;
      color: #c0c0c0;
      background: linear-gradient(to bottom,#913333 0% , #892F2E 10% ,#501F1A 100%);
      background:url("../../assets/img/heroes/top_tab.jpg");
      background-position: 0 0px;
      line-height: 40px;
      font-size: 20px;
  }
  #content .bg .hero_top .top_tab_ul>li>a.present{
    background-position: 0 -42px;
  }
  #content .bg .hero_top .top_tab_ul>li>a:hover{
      background-position: 0 -42px;
  }
  #content .bg .hero_top .top_search{
      float: right;
      width: 248px;
      padding-top: 22px;
  }
  #content .bg .hero_top .top_search .top_search_help{
      width: 248px;
      padding-top: 10px;
      overflow: hidden;
  }
  #content .bg .hero_top .top_search .top_search_help .search_inp{
      float: left;
      width: 167px;
      height: 22px;
      padding: 0 5px;
      color: #717779;
      font: normal 12px/22px "宋体";
      background-color: #1a1d1e;
      border: 1px solid #2c2f33;
      border-collapse:collapse;
      /*去掉输入框蓝色边框*/
      outline:medium;
  }
  #content .bg .hero_top .top_search .top_search_help .search_a{
      width:65px;
      height:25px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      border-radius:3px;
      margin-left:10px;
      background: linear-gradient(to bottom,#913333 0% , #892F2E 10% ,#501F1A 100%);
  }
  #content .bg .hero_top .top_search .top_search_help .btn_col,.btn_err{
      width: 120px;
      height: 30px;
      border: 3px solid #27292b;
      cursor: pointer;
  }
  #content .bg .hero_top .top_search .top_search_help .btn_col{
      float: left;
      background-image: url("../../assets/img/heroes/btn_shoucang-w382.png");
  }
  #content .bg .hero_top .top_search .top_search_help .btn_err{
      float: right;
      background-image: url(../../assets/img/heroes/btn_baocuo.png);
  }
  
</style>