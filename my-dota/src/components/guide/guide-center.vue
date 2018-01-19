<template>
  <div>
    <div class="section bg1 clearfix">
      <div class="bg1_inner">
        <div class="step1-box">
          <div class="inner">
            <div class="download-box">
              <h4>
                <font>DOTA2</font> 最新客户端下载</h4>
              <p style="font-size: 14px;">玩家下载安装官方DOTA2客户端后，将直接进入国服进行游戏。
                <br>若您已拥有STEAM平台账号，可在登录后进行国服绑定。</p>
              <div class="btn_gf">
                <a target="_blank" style="opacity: 0;">
                  <img src="../../assets/img/guide/btn_gf_hover.png">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section bg2 clearfix">
      <div class="bg2_inner">
        <div class="inner">
          <div class="reg_box">
            <div class="btn_reg">
              <a target="_blank" style="opacity: 0;">
                <img src="../../assets/img/guide/btn_reg.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section bg3 clearfix">
      <div class="bg3_inner">
        <div class="inner">
          <div class="newplayer_box">
            <div class="btn_xs">
              <a href="/recruit" style="opacity: 0;">
                <img src="images/btn/btn_xs_hover.png">
              </a>
            </div>
            <div class="btn_zlz">
              <a target="_blank" style="opacity: 0;">
                <img src="images/btn/btn_zlz_hover.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
  .bg1 {
    background: #ebebeb url(../../assets/img/guide/bg1.jpg) no-repeat center top;
    position: relative;
  }

  .bg1_inner {
    height: 1212px;
    padding-top: 1px;
  }

  .step1-box {
    font-size: 20px;
    color: #d8d8d8;
    width: 1100px;
    height: 688px;
    margin: 532px auto 0;
    background: url(../../assets/img/guide/step1.png)no-repeat center top;
    box-sizing: border-box;
  }

  .btn_gf {
    display: inline-block;
    background: url(../../assets/img/guide/btn_gf_hover.png)no-repeat center top;
    width: 211px;
    height: 59px;
  }

  .download-box {
    width: 422px;
    height: 180px;
    float: right;
    margin-top: 307px;
    margin-right: 153px;
  }

  .step1-box h4 {
    font-weight: normal;
  }

  .step1-box font {
    font-size: 34px;
  }

  .step1-box p {
    margin-bottom: 25px;
    margin-top: 5px;
    color: #5b6150;
    line-height: 24px;
  }
  /*bg2*/

  .bg2 {
    background: #ebebeb url(../../assets/img/guide/bg2_01.jpg) no-repeat center top;
    position: relative;
  }

  .bg2_inner {
    height: 744px;
    padding-top: 1px;
  }

  .bg2 .inner {
    width: 1100px;
    margin: 200px auto 0;
  }

  .reg_box {
    text-align: center;
  }

  .btn_reg {
    display: inline-block;
    background: url(../../assets/img/guide/btn_reg.png) no-repeat center top;
    width: 250px;
    height: 76px;
  }
  /*bg3*/

  .bg3 {
    background: url(../../assets/img/guide/bg2_02.png) no-repeat center top;
    position: relative;
  }

  .bg3_inner {
    height: 785px;
    padding-top: 1px;
  }

  .bg3 .inner {
    width: 1100px;
    margin: 462px auto 0;
  }

  .newplayer_box {
    width: 460px;
    margin-left: 487px;
    display: inline-block;
  }

  .btn_xs {
    margin-left: 10px;
    display: inline-block;
    background: url(../../assets/img/guide/btn_xs.png)no-repeat center top;
    width: 220px;
    height: 65px;
  }

  .btn_xs a {
    display: inline-block;
    width: 220px;
    height: 65px;
  }

  .btn_zlz {
    display: inline-block;
    background: url(../../assets/img/guide/btn_zlz.png)no-repeat center top;
    width: 220px;
    height: 65px;
  }

  .btn_zlz a {
    display: inline-block;
    width: 220px;
    height: 65px;
  }

</style>
