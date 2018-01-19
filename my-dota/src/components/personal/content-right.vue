<template>
    <div>
          <div class="rightArea">
                <div class="tit"><span>我的游戏</span></div>
                <div class="gameBox">
                    <img src="../../assets/img/personal/(2).png">
                    <p>
                        中文：<span>刀塔</span>
                        <br>
                        英文：<span>DOTA2</span>
                        <br>
                        状态：<span>开放测试</span>
                        <br>
                        国服上线日期：<span>2013.4.28</span>
                    </p>
                    <div class="btns clearfix">
                        <a class="fl home"  target="_blank">进入官网</a>
                        <a class="fr down" target="_blank">下载客户端</a>
                    </div>
                </div>
                <div class="tit"><span>我的产品</span></div>
                <div class="productBox">
                    <ul class="clearfix">
                        <li class="fl">
                            <a href="#" target="_blank">
                            <img src="../../assets/img/personal/(3).png"></a>
                            <p>完美刀塔APP</p>
                            <div class="btns">
                                <img src="../../assets/img/personal/(4).png">
                                <img src="../../assets/img/personal/(5).png">
                                <img src="../../assets/img/personal/(6).png">
                            </div>
                        </li>
                        <li class="fr">
                            <a href="#" target="_blank">
                            <img src="../../assets/img/personal/(7).png"></a>
                            <p>完美电竞平台</p>
                            <div class="btns">
                                <img src="../../assets/img/personal/(8).png">
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.personal .rightArea {
    width: 195px;
    float: right;
    padding: 50px 0 100px;
}
.personal .rightArea .tit {
    height: 36px;
    color: #333;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
}
.personal .rightArea .tit span {
    height: 36px;
    border-bottom: 1px solid #3e9fe1;
    display: inline-block;
    margin-bottom: -1px;
}
/*******gameBox*******/
.gameBox {
    padding: 20px 0 45px;
}
.gameBox p {
    padding: 10px 0;
    line-height: 1.6;
}
.gameBox p span {
    color: #666;
}
.rightArea, .fr {
    float: right;
}
.gameBox .btns a {
    width: 92px;
    height: 28px;
    line-height: 30px;
    border: 1px solid #dfdfdf;
    background: #fff;
}
.gameBox .btns a.home {
    background: url(../../assets/img/personal/home.png) no-repeat 13px center #fff;
    text-indent: 30px;
}
.gameBox .btns a.down {
    background: url(../../assets/img/personal/down.png) no-repeat 10px center #fff;
    text-indent: 24px;
}
/*********productBox*********/
.productBox {
    padding-top: 20px;
}
.productBox li {
    width: 92px;
    text-align: center;
}
.productBox li {
    width: 92px;
    text-align: center;
}
.productBox li p {
    line-height: 28px;
}
.productBox li .btns img {
    vertical-align: middle;
    margin: 0 5px;
}
</style>
