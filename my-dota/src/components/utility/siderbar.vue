<template>
  <div>
  <div class="sidebar" id="sidebar">
    <div class="bar">
      <div class="btns">
        <a href="http://pay.wanmei.com/new/dota2/index.do?inGame=0" target="_blank" class="btn btn-recharge"></a>
        <a href="http://www.dota2.com.cn/download/" target="_blank" class="btn btn-download"></a>
        <a href="http://passport.wanmei.com/reg/?s=dota2" target="_blank" class="btn btn-signup"></a>
      </div>
      <div class="more">
        <a href="http://act.dota2.com.cn/match" target="_blank" class="btn btn-match"></a>
        <a href="http://www.dota2.com.cn/activity/gameevent/index.htm" target="_blank" class="btn btn-events"></a>
        <a href="http://bbs.dota2.com.cn/" target="_blank" class="btn btn-bbs"></a>
      </div>
    </div>
  </div>
  </div>
  
  
</template>
<script>
  export default{

  }
</script>
<style >
.sidebar {
    width: 240px;
    margin-left: 30px;
}

.sidebar .fixed {
    position: fixed;
    top: 20px;
    z-index: 101;
}

.sidebar .btns .btn {
    width:100%;

    height: 82px;
    margin-top: 8px;
}

.sidebar .btns .btn:first-child {
    margin-top: 0;
}

.sidebar .more {
    margin-top: 20px;
}

.sidebar .more .btn {
    height: 75px;
    margin-top: 5px;
    border: 1px solid transparent;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: border-color 0.2s ease-in;
    -o-transition: border-color 0.2s ease-in;
    -webkit-transition: border-color 0.2s ease-in;
    transition: border-color 0.2s ease-in;
}

.sidebar .more .btn:hover {
    border-color: #02baf6;
}

.sidebar .more .btn:first-child {
    margin-top: 0;
}
.btn {
    display: block;
    width: 240px;
    background-image: url("../../assets/img/news/icon-btns.png");
}

.btn.btn-recharge {
    background-position: -15px -9px;
}

.btn.btn-recharge:hover {
    background-position: -15px -113px;
}

.btn.btn-download {
    background-position: -15px -217px;
}

.btn.btn-download:hover {
    background-position: -15px -321px;
}

.btn.btn-signup {
    background-position: -15px -425px;
}

.btn.btn-signup:hover {
    background-position: -15px -529px;
}

.btn.btn-match {
    background-position: -15px -713px;
}

.btn.btn-events {
    background-position: -15px -807px;
}

.btn.btn-bbs {
    background-position: -15px -904px;
}
</style>