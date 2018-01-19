<template>
  <div>
      <div class="middleArea">
                <div class="not">
                    <div class="high"></div>
                    <div class="high"></div>
                    <div class="title">
                        完美通行证详情
                        <i></i>
                        <div>完美通行证是提供游戏充值的支付账号</div>
                    </div>
                    <div class="item">
                        <div class="dl clearfix">
                            <div class="dt">完美通行证：</div>
                            <div class="dd"><strong>15629050636</strong></div>
                        </div>
                        <div class="dl clearfix">
                            <div class="dt">完美电竞ID：</div>
                            <div class="dd">223101793</div>
                        </div>
                        <div class="dl clearfix">
                            <div class="dt">账 号 安 全：</div>
                            <div class="dd">
                                <ul class="stateList">
                                    <li class="state1"><i></i>已登记</li><li class="state2"><i></i>已绑定<div class="phone_pop" id="phone" style="display: none;">您已绑定手机156****0636<a class="manage" href="http://passport.wanmei.com/mobilebind/" target="_blank">管理</a></div></li><li class="state5"><i></i>未绑定<a class="bindmail" href="http://passport.wanmei.com/emailbind/" target="_blank">绑定邮箱</a></li><li class="state7"><i></i><a class="refresh" href="http://passport.wanmei.com/sso/accounts/serviceLogin?continue=http://members.dota2.com.cn/SSOServerLogin&amp;isiframe=1&amp;service=dota2" title="刷新绑定状态">刷新</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="dl clearfix">
                            <div class="dt">上 次 登 录：</div>
                            <div class="dd"><p class="last">2017-12-19 19:22:29&nbsp;&nbsp;&nbsp;59.175.170.226</p></div>
                        </div>
                        <div class="dl balance clearfix">
                            <div class="dt">账 号 余 额：</div>
                            <div class="dd"><b>0</b>刀币<a class="regBtn" href="https://pay.wanmei.com/new/dota2/index.do?inGame=0" target="_blank">充值刀币</a></div>
                        </div>
                        <div class="dl clearfix">
                            <div class="dt">近 期 充 值</div>
                            <div class="dd fl m0">
                                <div class="not_record">
                                    暂无DOTA2充值记录
                                </div>
                            </div>
                        </div>
                        <div class="dl clearfix">
                            <div class="dt">近 期 消 费</div>
                            <div class="dd fl m0">
                                <div class="not_record">
                                    暂无DOTA2消费记录
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr_30"></div>
                    <div class="tit">
                        DOTA2账号详情
                        <i class="tips">
                            <div class="account_pop" style="display: none;">
                                DOTA2账号是提供游戏登录的游戏账号
                            </div>
                        </i>
                    </div>
                    <div class="item account_details">
                        <div class="dl clearfix">
                            <div class="dd fl m0">
                                <div class="not_record">
                                    暂无内容<br>请
                                    <a class="down" href="http://www.dota2.com.cn/download/" target="_blank">下载DOTA2国服客户端
                                    </a>
                                    进行注册DOTA2账号，并绑定完美通行证。
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr_30"></div>
                    <div class="tit bn">
                        DOTA2国服注册指南
                    </div>
                    <div class="ug_list">
                        <ul>
                            <li class="ugli1"><p>下载安装客户端</p><a class="gamedown" href="http://www.dota2.com.cn/download/" target="_blank">立即下载客户端</a></li>
                            <li class="ugli2"><p>打开客户端</p>注册DOTA2账号</li>
                            <li class="ugli3"><p>进入游戏</p>绑定完美通行证</li>
                            <li class="ugli4"><p>开始游戏</p>全新游戏体验</li>
                        </ul>
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
div.personal{
    width:1190px;
    overflow: hidden;
    margin:0 auto;
    position: relative;
    height: 1170px;
}
    div.middleArea{
     width:770px;
     background: #fff;
     float: left;
 }
div.not{
    width:670px;
    margin:0 auto;
    padding-bottom: 100%;
}
div.high{
    height:30px;
}
div.title{
    height:40px;
    font-size:20px;
    font-weight:bold;
    color:#333;
    border-bottom:1px solid #e0e0e0;
}
div.title i{
    display:inline-block;
    background:url("../../assets/img/personal/tips_icon_blue.png") no-repeat;
    width:16px;
    height:16px;
    vertical-align: middle;
    position: relative;
}
/*******隐藏完美通行证是提供游戏充值的支付账号框*********/
div.title>div{
    position: absolute;
    background: url("../../assets/img/personal/not_pop.png");
    width:242px;
    height:48px;
    line-height:40px;
    text-align: center;
    font-weight:normal;
    font-size:12px;
    top: 15px;
    left: 369px;
    display:none;
}

/*******item模块********/
.item .dl {
    padding: 13px 0;
}
.clearfix {
    zoom: 1;
}
.item .dl .dt {
    float: left;
    width: 98px;
    color: #333;
    font-size: 14px;
}
.item .dl .dd {
    margin-left: 98px;
}
.item .dl .dd strong {
    font-size: 14px;
    color: #333;
}
.item .dl .dd .stateList li {
    float: left;
    padding-right: 30px;
    font-size: 14px;
    color: #2aa3e9;
    position: relative;
}
.item .dl .dd .stateList li.state3, .item .dl .dd .stateList li.state5, .item .dl .dd .stateList li.state6 {
    color: #ff6600;
    position: relative;
    padding-right: 115px;
}
.item .dl .dd .stateList li i {
    background: url(../../assets/img/personal/state_icon.png) no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: -3px;
    margin-right: 5px;
}
.item .dl .dd .stateList li.state2 i {
    background-position: -92px 0;
}
.item .dl .dd .stateList li.state5 i {
    background-position: -384px 0;
}
.item .dl .dd .stateList li.state7 i {
    background-position: -32px 0;
    cursor: pointer;
}
.item .dl .dd .stateList li.state3 .bindphoe, .item .dl .dd .stateList li.state5 .bindmail, .item .dl .dd .stateList li.state6 .bindanti {
    color: #333;
    background: #f6f7f9;
    display: inline-block;
    border: 1px solid #e6e6e6;
    height: 28px;
    line-height: 29px;
    position: absolute;
    right: 20px;
    top: -5px;
    padding: 0 15px;
}
.item .dl .dd p.last {
    color: #666;
    line-height: 20px;
}
.item .balance {
    line-height: 28px;
    color: #666;
    font-size: 14px;
    padding: 6px 0;
}
.item .dl .dd b {
    color: #2aa3e9;
}
.item .dl .dd .regBtn {
    font-size: 14px;
    width: 85px;
    height: 28px;
    background: #359be0;
    color: #fff;
    border: 1px solid #3392d2;
    display: inline-block;
    text-align: center;
    line-height: 27px;
    margin-left: 10px;
}
.item .dl .dd.m0 {
    margin: 0;
}
.leftArea, .fl, .middleArea {
    float: left;
}
.item .dl .dd .not_record {
    background: url(../../assets/img/personal/not_content.png) no-repeat;
    width: 670px;
    height: 111px;
    line-height: 111px;
    text-align: center;
    margin: 6px 0 20px;
    font-size: 14px;
    color: #666;
}
.account_details .dl .dd .not_record {
    height: 75px;
    padding-top: 36px;
    line-height: 1.5;
}
.item .dl .dd .not_record .down {
    color: #2aa3e9;
    margin: 0 5px;
}
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
}

.hr_30 {
    height: 30px;
}
/*******tit********/
#personal .middleArea .tit {
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
}

#personal .middleArea .tit i {
    background: url(../../assets/img/personal/tips_icon_blue.png) no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
}
.account_pop {
    font-size: 12px;
    color: #333;
    font-style: normal;
    font-weight: 400;
    left: -24px;
    top: -50px;
}
/******account_details*********/
#personal .middleArea .tit.bn {
    border: 0;
}
/***********ug_list*******/
.ug_list {
    width: 670px;
    height: 108px;
    background: url(../../assets/img/personal/step.jpg) no-repeat;
    position: relative;
}
.ug_list li {
    position: absolute;
    top: 32px;
}
.ug_list .ugli1 {
    left: 47px;
}
.ug_list .ugli2 {
    left: 240px;
}
.ug_list .ugli3 {
    left: 402px;
}
.ug_list .ugli4 {
    left: 560px;
}
.ug_list li p {
    font-size: 16px;
    color: #333;
}
.ug_list li .gamedown {
    background: #f6f7f9;
    display: block;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    margin: 6px 0 0 0;
    border: 1px solid #e6e6e6;
}
</style>
