<template>
  <div class="mohu"  :style="{'width':mohuWidth,'height':mohuHeight}" >
    <div class="weixin" >
      <h3>扫一扫关注DOTA2官方微信公众平台</h3>
      <p>获取更多最新的DOTA2精彩资讯！</p>
      <ul class="clear">
        <li>
          <i></i>
          <span>DOTA2官方微信服务号</span>
        </li>
        <li>
          <i></i>
          <span>DOTA2官方微信订阅号</span>
        </li>
      </ul>
      <div class="closeweixin">
        <a @click="removemohu"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        isShowMohu:false,
        mohuWidth:null,
        mohuHeight:null
      }
    },
    methods:{
      removemohu:function(){
        this.isShowMohu = false;
        this.$emit("mikolaile",this.isShowMohu);
      }
    },
    created:function(){
      let width =  window.screen.availWidth;   //可操作区域的宽度和高度
      let height = window.screen.availHeight;
      this.mohuWidth = width+'px';
      this.mohuHeight = height+'px';
    },
    
  }


</script>

<style>
  .mohu{
    width:10px;
    height:10px;
    background:rgba(0,0,0,0.7);
  }
  .mohu .weixin{
    width:620px;
    height:385px;
    background:url("../../assets/img/base/navwx_bg.jpg");
    margin:250px auto;
    text-align: center;
    position:relative;
  }
  .mohu .weixin:before{
    content:"";
    display:table;
  }
  .mohu .weixin h3{
    font-size:20px;
    font-weight:bold;
    color:#fff;
    margin-top:54px;
  }
  .mohu .weixin p{
    font-size:16px;
    color:#888;
    margin-bottom:40px;
  }
  .mohu .weixin ul{
    width:360px;
    margin:30px auto;
  }
  .mohu .weixin ul li:first-child{
    float:left;
  }
  .mohu .weixin ul li:last-child{
    float:right;
  }
  .mohu .weixin ul li i{
    display: block;
    width: 156px;
    height: 156px;
    background-color: #fff;
  }
  .mohu .weixin ul li:first-child i{
    background:url("../../assets/img/base/navwx_subscribe.png")
  }
  .mohu .weixin ul li:last-child i{
    background:url("../../assets/img/base/navwx_vservice.png")
  }
  .mohu .weixin ul li span{
    color:#fff;
    font-size:14px;
    line-height: 50px;
  }
  .mohu .weixin .closeweixin{
    width:60px;
    height:60px;
    position:absolute;
    background:#3c2728;
    top:0;
    right:-61px;
  }
  .mohu .weixin .closeweixin a{
    display:block;
    width:60px;
    height:60px;
    background:url("../../assets/img/base/navwx_close.png");
    opacity: 0.5;
  }
  .mohu .weixin .closeweixin a:hover{
    opacity:1;
  }
</style>