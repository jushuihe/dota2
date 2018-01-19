<template>
<div>
  <div class="bottom"><div class="rel1100">
      <dl class="foot_dl">
          <dt>
              <a class="wanmei" href="http://www.wanmei.com/" target="_blank">
                <img src="http://www.dota2.com.cn/public/images/logo-wanmei.png" alt="">
              </a>
              <a href="http://www.valvesoftware.com/" target="_blank">
                <img src="http://www.dota2.com.cn/public/images/logo-valve.png" alt="">
              </a>
           </dt>
           <dd>
               完美世界（北京）网络技术有限公司 版权所有 Copyright © 2012-2017 Bei
               jing Perfect World Network Technology Co., Ltd. All Rights rese
               rved<br>©2012 Valve Corporation. All Rights reserved. Licensed 
               to Beijing Perfect World Network Technology Co., Ltd. in China
            </dd>
       </dl>
       <p class="certificate">京ICP证：050016号《网络文化经营许可证》编号：京网文[2011]0782-287号 
           《网络视听许可证》编号：0110587<br>京公网安备11010502033859号 文网进字[2013] 028号 新出审字[20
           13] 1505号 ISBN：978-7-89989-826-0
       </p>
    </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
    .bottom {
    font-family: "Microsoft YaHei", 微软雅黑, Arial, "Helvetica Neue", Helvetica, sans-serif;
    height: 160px;
    background-color: rgb(0, 0, 0);
    z-index: 1;
    font-size: 12px;
    color: rgb(149, 149, 149);
    position: relative;
    background-repeat: no-repeat;
        bottom:0px;
}
.rel1100 {
    margin: 0 auto;
    width: 1100px;
    position: relative;
}
.foot_dl {
    position: absolute;
    top: 40px;
}
.foot_dl dt a.wanmei {
    border-right: 1px solid #000;
}
.foot_dl dt a {
    float: left;
    padding: 0 20px;
}
a {
    color: #000;
}
.foot_dl dd {
    float: right;
    font-size: 12px;
    margin: 0;
    line-height: 1.25;
    max-width: 815px;
    position: relative;
    left: 33%;
    top: -43px;
}

.bottom .rel1100 .certificate {
    position: absolute;
    top: 85px;
    left: 230px;
    line-height: 1.5;
    font-size: 12px;
    color: #333;
    text-align: center;
}
</style>
