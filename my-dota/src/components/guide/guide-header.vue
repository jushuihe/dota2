<template>
    <div>
        <div id="dota2_topnav" class="dota2_nav_container">
            <div class="nav_main clearfix">
                <a href="http://www.dota2.com.cn/" title="《DOTA2》官方网站" class="nav_logo" target="_blank">《DOTA2》官方网站</a>
                <div class="dota2nav" id="dota2nav">
                    <div class="link_div" @mouseover="changeShow(1)" @mouseout="changeShow(0)">
                        <a href="http://www.dota2.com.cn/main.htm" target="_blank" id=" link_nav1" class="link_nav">
                            <span >首页</span>
                            <span class="link_nav_e">HOME</span>
                        </a>
                        <div class="link_pop" v-if="isShow==1" >
                            <a href="http://www.dota2.com.cn/" target="_blank" >品牌站</a>
                            <a href="http://members.dota2.com.cn/login?url=/info" target="_blank">个人中心</a>
                            <a href="http://secretshop.dota2.com.cn/" target="_blank">神秘商店</a>
                            <a href="http://fx.wanmei.com/dota2" target="_blank">玩家工坊</a>
                        </div>
                    </div>
                    <div class="link_div" @mouseover="changeShow(2)" @mouseout="changeShow(0)">
                        <a href="http://www.dota2.com.cn/news/index.htm" id="link_nav2" class="link_nav" target="_blank">
                            <span>资讯</span>
                            <span class="link_nav_e">NEWS</span>
                        </a>
                        <div class="link_pop" v-if="isShow==2">
                            <a href="http://www.dota2.com.cn/news/gamenews/index.htm" target="_blank">官方新闻</a>
                            <a href="http://www.dota2.com.cn/news/competition/index.htm" target="_blank">赛事新闻</a>
                            <a href="http://www.dota2.com.cn/news/gamepost/index.htm" target="_blank">更新日志</a>
                            <a href="http://www.dota2.com.cn/raiders/index.htm" target="_blank">游戏攻略</a>
                        </div>
                    </div>
                    <div class="link_div"  @mouseover="changeShow(3)" @mouseout="changeShow(0)">
                        <a href="http://act.dota2.com.cn/match" id="link_nav3" class="link_nav" target="_blank">
                            <span>赛事</span>
                            <span class="link_nav_e">MATCH</span>
                        </a>
                        <div class="link_pop" v-if="isShow==3">
                            <a href="http://www.dota2.com.cn/procircuit/" target="_blank">职业赛季</a>
                            <a href="http://act.dota2.com.cn/match" target="_blank">赛事中心</a>
                            <a href="http://act.dota2.com.cn/match/list" target="_blank">赛事总览</a>
                            <a href="http://www.dota2.com.cn/activity/gamematch/index.htm" target="_blank">赛事活动</a>
                        </div>
                    </div>
                    <div class="link_div" @mouseover="changeShow(4)" @mouseout="changeShow(0)">
                        <a href="http://www.dota2.com.cn/activity/all/index.htm" id="" class="link_nav" target="_blank">
                            <span>互动</span>
                            <span class="link_nav_e">INTERACTION</span>
                        </a>
                        <div class="link_pop" v-if="isShow==4">
                            <a href="http://www.dota2.com.cn/activity/all/index.htm" target="_blank">精彩综合</a>
                            <a href="http://www.dota2.com.cn/activity/gameevent/index.htm" target="_blank">官方活动</a>
                            <a href="http://bbs.dota2.com.cn/forum.php" target="_blank">玩家论坛</a>
                            <a href="http://weibo.com/dota2comcn" target="_blank">新浪微博</a>
                            <a href="javascript:;" id="j-navwxlink">官方微信</a>
                        </div>
                    </div>
                    <div class="link_div" @mouseover="changeShow(5)" @mouseout="changeShow(0)">
                        <a href="http://www.dota2.com.cn/zlz/index.htm" id="link_nav4" class="link_nav" target="_blank">
                            <span>资料</span>
                            <span class="link_nav_e">DATA</span>
                        </a>
                        <div class="link_pop" v-if="isShow==5">
                            <a href="http://www.dota2.com.cn/heroes/index.htm" target="_blank">英雄资料</a>
                            <a href="http://www.dota2.com.cn/items/index.htm" target="_blank">物品资料</a>
                            <a href="http://www.dota2.com.cn/videocenter/" target="_blank">视频中心</a>
                            <a href="http://maps.dota2.com.cn/" target="_blank">自定义地图</a>
                            <a href="http://www.dota2.com.cn/guide" target="_blank">新手引导</a>
                        </div>
                    </div>
                    <div class="link_div" @mouseover="changeShow(6)" @mouseout="changeShow(0)">
                        <a href="http://kf.dota2.com.cn/" target="_blank" id="link_nav5" class="link_nav">
                            <span>服务</span>
                            <span class="link_nav_e">SERVICE</span>
                        </a>
                        <div class="link_pop" v-if="isShow==6">
                            <a href="http://kf.dota2.com.cn" target="_blank">客服中心</a>
                            <a href="http://cs.wanmei.com/genius?imCode=imdotagames" target="_blank">在线客服</a>
                            <a href="http://cs.wanmei.com/getServicesByGameType?gametype=22" target="_blank">自助专区</a>
                            <a href="http://bbs.dota2.com.cn/forum.php?mod=viewthread&tid=1250459" target="_blank">被盗找回</a>
                            <a href="http://bbs.dota2.com.cn/forum.php?mod=viewthread&tid=1245751" target="_blank">忘记账号</a>
                            <a href="http://members.dota2.com.cn/findPwAccount" target="_blank">通行证查询</a>
                            <a href="http://wb.dota2.com.cn/" target="_blank">网吧特权</a>
                        </div>
                    </div>
                    <div class="link_div" @mouseover="changeShow(7)" @mouseout="changeShow(0)">
                        <a href="http://www.dota2.com.cn/download/" target="_blank" id="link_nav6" class="link_nav">
                            <span>下载</span>
                            <span class="link_nav_e">DOWN</span>
                        </a>
                        <div class="link_pop" v-if="isShow==7">
                            <a href="http://www.dota2.com.cn/download/" target="_blank">游戏下载</a>
                            <a href="http://app.dota2.com.cn/web.html" target="_blank">刀塔助手</a>
                            <a href="http://www.dota2.com.cn/enjoy/gamewall/index.htm" target="_blank">精美壁纸</a>
                            <a href="http://www.dota2.com.cn/comics/index.htm" target="_blank">官方漫画</a>
                        </div>
                    </div>
                </div>
                <div class="dota2user" id="dota2user">
                    <div class="info">
                        <i class="nav-avatar avatar-default"></i>
                        <div class="enter-box">
                            <p class="name">
                                <span>您好，请&nbsp;</span><a href="javascript:;" id="J_dota2SignIn">登录</a>
                            </p>
                            <span class="tt">登录后可进入您的个人中心</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- overlay -->
            <div id="Dota2_overlay"></div>

            <!-- J_dialog_passport -->
            <div class="Dota2dialogWrap" id="J_dialog_dota2_passport" style="background:#070707 ">
                <!--<h3 class="title-passport">完美通行证登录</h3>-->
                <a href="javascript:;" class="close-passport"></a>
                <iframe width="" height="" frameborder="0" scrolling="no" data-src="http://passport.wanmei.com/sso/accounts/serviceLogin?continue=http%3A%2F%2Fwww.dota2.com.cn%2Fsso%2FloginPc&service=dota2_act&isiframe=1&location=687474702533412532462532467777772E646F7461322E636F6D2E636E2532466E657773253246696E6465782E68746D" src="" name="passport_login_iframe_parent" allowtransparency="true"></iframe>
            </div>

            <!-- wx -->
            <div class="nav_wxdialog" id="j-navwxdialog" style="display: none;">
                <h4>扫一扫关注DOTA2官方微信公众平台</h4>
                <p>获取更多最新的DOTA2精彩资讯！</p>
                <ul>
                    <li class="subscribe">
                        <i></i>
                        <span>DOTA2官方微信服务号</span>
                    </li>
                    <li class="vservice">
                        <i></i>
                        <span>DOTA2官方微信订阅号</span>
                    </li>
                </ul>
                <a href="javascript:;" class="close" id="j-wxclose"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            isShow:false
        }
    },
    methods:{
        changeShow:function(num){
            this.isShow=num;
        }
    }
}
</script>

<style>
    .dota2_nav_container {
    width: 100%;
    height: 80px;
    background: url(../../assets/img/news/data2.home.nav.bg.png) center top no-repeat;
    color: #827c79;
    font: 16px/16px 'Microsoft YaHei';
}
.nav_main {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
}
.nav_main .nav_logo {
    display: block;
    width: 260px;
    height: 40px;
    margin-top: 20px;
    margin-right: 20px;
    text-indent: -1000px;
    background: url(../../assets/img/news/dota2.home.log.png) center top no-repeat;
}
.nav_main .nav_logo, .nav_main .dota2nav {
    float: left;
}
.nav_main .dota2nav .link_div {
    position: relative;
    float: left;
    padding: 23px 7px;
    text-align: center;
    width: 78px;
}
.nav_main .dota2nav .link_div a {
    display: block;
    font-size: 15px;
    color: #827c79;
}
.nav_main .dota2nav .link_div .link_pop {
    /*display: none;*/
    z-index:20;
    position: absolute;
    top: 70px;
    left: 0;
    padding-top: 10px;
    width: 100%;
    height: 239px;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    background: url(../../assets/img/news/data2.home.submenu.bg.png) top center no-repeat;
    background-size: cover;
}
.nav_main .dota2nav .link_div a {
    display: block;
    font-size: 15px;
    color: #827c79;
}
.nav_main .dota2nav .link_div span {
    display: block;
    font-size: 16px;
}
.nav_main .dota2nav .link_div .link_nav_e {
    margin-top: 2px;
    font-size: 9px;
    line-height: 16px;
    -webkit-transform: scale(0.75);
}
.nav_main .dota2user {
    float: right;
    width: 234px;
    height: 100%;
    margin-right: 0;
    color: #ccc;
    position: relative;
}
.nav_main .dota2user .info {
    padding-left: 65px;
    height: 100%;
}
.nav_main .dota2user .avatar-default {
    background-color: #101215;
    background-image: url(../../assets/img/news/icon.png);
    background-position: 13px -451px;
}
.nav_main .dota2user .enter-box {
    margin-top: 17px;
    display: block;
}
.nav_main .dota2user .nav-avatar {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 13px;
    border-radius: 50%;
    border: 1px solid #262323;
    background-color: #101215;
    box-sizing: content-box;
}
.nav_main .dota2user .name {
    font-size: 18px;
    color: #00b7f4;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0;
    margin-bottom: 3px;
}
.nav_main .dota2user .name span {
    color: #fff;
    font-family: "Microsoft YaHei",Verdana,Geneva,sans-serif,\5b8b\4f53;
}
.nav_main .dota2user .tt {
    font-size: 12px;
    color: #898989;
    padding: 0;
    line-height: 1.5;
    font-family: "Microsoft YaHei",Verdana,Geneva,sans-serif,\5b8b\4f53;
}
.nav_main .dota2user .name a {
    color: #00b7f4;
}
.nav_main .dota2nav .link_div:hover .link_nav {
    color: #00c0ff;
}
.nav_main .dota2nav .link_div .link_pop a:hover {
    color: #00c0ff;
}
</style>
