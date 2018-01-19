<template>
  <!--<div>               -->
     <div class="header">
            <div class="header-bg">
                <!--1.1Dota2  LOGO-->
                <a href="#">
                    <img src="../../assets/img/personal/(1).png" alt="">
                </a>
                <!--1.2游戏充值/客服支持-->
                <div class="">
                    <a href="#">游戏充值</a>
                    <a href="#">客服支持</a>
                    <a href="#"   >13596969696</a>
                    <div class="chongzhi"  @mouseover="changeShow(true)" @mouseout="changeShow(false)"v-if="isShow">
                        <div>
                            <ul>
                                <li><a href="#">个人中心</a></li>
                                <li><a href="#">退出登录</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>                
  <!--</div>-->
</template>

<script scoped>
export default {
    data:function(){
        return{
            isShow:false,
        }
    },
    methods:{
        changeShow:function(boolean){
            this.isShow=boolean;
        }
    }
}
</script>

<style>
body{
    margin:0;
}
#personal_bg{
    background:#efeff1;
}
div.header{
    background:url(../../assets/img/personal/pay_header_bg.jpg) no-repeat center ;
    width:100%;
    height:60px;
    position:relative;
}
/* 1.1Dota2  LOGO*/
div.header-bg{
    width:960px;
    height:60px;
    margin:0 auto;
    position:relative;
}
div.header-bg>a{
    position:absolute;
    top:13px;
}
/*1.2游戏充值/客服支持*/
div.header-bg>div{
    position: relative;
    padding-top: 20px;
    float: right;
}
div.header-bg>div>a{
    padding-left:24px;
    margin-left:25px;
    position:relative;
    font-size:14px;
    z-index: 11;
    color:#999;
}
div.header-bg>div>a:first-child{
    background:url(../../assets/img/personal/pay_icon.png) no-repeat left center;
}
div.header-bg>div>a:first-child:hover{
    background:url(../../assets/img/personal/pay_icon_h.png) no-repeat left center;
    color: #79afd3;
    text-shadow: #79afd3 0 0 5px;
}
div.header-bg>div>a:nth-child(2){
    background:url(../../assets/img/personal/kefu_icon.png) no-repeat left center;
}
div.header-bg>div>a:nth-child(2):hover{
    background:url(../../assets/img/personal/kefu_icon_h.png) no-repeat left center;
    color: #79afd3;
    text-shadow: #79afd3 0 0 5px;
}
div.header-bg>div>a:nth-child(3){
    padding-right: 27px;
    background:url(../../assets/img/personal/pay_triangle.png) no-repeat 117px;
    font-size:13px;
    margin-left: 0px;
}
div.header-bg>div>a:nth-child(3):hover{
    color:#359be0;
    background:url(../../assets/img/personal/pay_triangle_h.png) no-repeat 117px;
}
div.chongzhi{
    font-size:15px;
    width:130px;
    height:150px;
    background:#fff;
    position: absolute;
    top:0;
    right:-4px;
    z-index: 2;
    box-shadow: 0 3px 5px rgba(0,0,0,.15);
}
div.chongzhi>a:hover{
    color:#359be0;
    background:url(../../assets/img/personal/pay_triangle_h.png) no-repeat 85px ;
}
div.chongzhi>div>ul{
    position:absolute;
    top:60px;
    width:130px;
    padding:0;
}
div.chongzhi>div>ul>li{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
}
div.chongzhi>div>ul>li:hover{
    background: #efefef;
}
div.chongzhi>div>ul>li:hover>a{
    color: #359be0;
}
</style>
