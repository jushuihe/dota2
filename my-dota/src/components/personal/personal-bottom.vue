<template>
    <div>
        <div class="bottom">
            <div class="rel960">
                <a class="wanmei" target="_blank" href="http://www.wanmei.com/">
                    <img alt="" src="../../assets/img/personal/bottom_logo.png">
                </a>
                完美世界（北京）网络技术有限公司 版权所有<br>Copyright © 2004-2016 Perfect World Co.,Ltd.All rights reserved.
                <div class="language" style="display: block;">
                    <a href="">简体中文</a>|
                    <a href="">English</a>
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
    .bottom {
    position: relative;
    height: 120px;
    width: 100%;
    line-height: 20px;
    background: #1a1a1b;
}
.bottom .rel960 {
    height: 80px;
    padding-top: 40px;
    position: relative;
}
.rel960 {
    position: relative;
    width: 960px;
    margin: 0 auto;
}
.bottom .wanmei {
    float: left;
    margin-right: 16px;
}
.language {
    top: 38px;
    right: 0;
    position: absolute;
    background: url(../../assets/img/personal/language_icon.png) no-repeat left center;
    padding-left: 13px;
}
.language a {
    color: #999999;
    font-size: 14px;
    margin: 0 10px;
}


</style>
