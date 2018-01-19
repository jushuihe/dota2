<template>
  <div >
    <div class="leftArea">
        <h3>个人中心</h3>
        <ul class="payList">
            <li>
                <a href="#">
                    <i></i>
                    <span>账号概况</span>
                    <em></em>
                </a>
            </li>
            <li><a href="#"><i></i><span>重置密码</span></a></li>
            <li><a href="#"><i></i><span>防沉迷登录</span></a></li>
            <li><a href="#"><i></i><span>充值记录</span></a></li>
            <li><a href="#"><i></i><span>消费记录</span></a></li>
            <li><a href="#"><i></i><span>找回完美通行证</span></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

    div.leftArea{
    width:200px;
    float: left;
    margin:0;
    padding:0;
}
div.leftArea>h3{
    padding:50px 0;
    font-size: 36px;
    color:#333;
    font-weight: normal;
    margin:0;
}
ul.payList li{
    height:30px;
    margin-bottom:30px;
}
ul.payList li a{
    width:100%;
    height:30px;
    line-height:30px;
    font-size:16px;
    display:block;
    position: relative;
    color:#333;
}
ul.payList li a:hover{
    color:#359be0;
}
ul.payList li a i{
    width:30px;
    height:30px;
    display:inline-block;
    margin-right:13px;
    vertical-align: middle;
    background:url("../../assets/img/personal/leftBar_icon.png") no-repeat ;
}

/***账号概括**/
ul.payList>li:first-child>a>em{
    display:block;
    width:20px;
    height:28px;
    top:5px;
    background:url("../../assets/img/personal/triangle_icon.png") no-repeat;
    position:absolute;
    right:-15px;
}

ul.payList>li:first-child>a>i:first-child{
    background-position:-30px -361px;
}
ul.payList>li:nth-child(2)>a>i:first-child{
    background-position:-30px -421px;
}
ul.payList>li:nth-child(3)>a>i:first-child{
    background-position:-30px -481px;
}
ul.payList>li:nth-child(4)>a>i:first-child{
    background-position: -30px -120px;
}
ul.payList>li:nth-child(5)>a>i:first-child{
    background-position: -30px -180px;
}
ul.payList>li:nth-child(6)>a>i:first-child{
    background-position: -30px -240px;
}

/**左边列表移入事件*/
ul.payList li a i:hover{
    width:30px;
    height:30px;
    display:inline-block;
    margin-right:13px;
    vertical-align: middle;
    background:url("../../assets/img/personal/leftBar_icon.png") no-repeat ;
}
ul.payList>li:first-child>a>i:first-child:hover{
    background-position:0px -361px;
}
ul.payList>li:nth-child(2)>a>i:first-child:hover{
    background-position:0px -421px;
}
ul.payList>li:nth-child(3)>a>i:first-child:hover{
    background-position:0px -481px;
}
ul.payList>li:nth-child(4)>a>i:first-child:hover{
    background-position:0px -120px;
}
ul.payList>li:nth-child(5)>a>i:first-child:hover{
    background-position:0px -180px;
}
ul.payList>li:nth-child(6)>a>i:first-child:hover{
    background-position:0px -240px;
}
ul.payList li a span{
    display:inline-block;
    vertical-align: middle;
}
</style>
