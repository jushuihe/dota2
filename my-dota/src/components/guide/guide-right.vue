<template>
    <ul class="g_right_menu" id="menu">
        <li data-menuanchor="page1" class="step_1" :class="{'active':nowStep==1}">
            <a href="#page1" class="step1"></a>
        </li>
        <li data-menuanchor="page2" class="step_2" :class="{'active':nowStep==2}">
            <a href="#page2" class="step2"></a>
        </li>
        <li data-menuanchor="page3" class="step_3" :class="{'active':nowStep==3}">
            <a href="#page3" class="step3"></a>
        </li>
    </ul>
</template>

<script>
export default {
    data:function(){
        return {
            nowStep:1
        }
    },
    methods:{
        onScroll(){
            let scrolled=document.documentElement.scrollTop ||
                document.body.scrollTop || window.pageYOffset;
            if(scrolled>=1063){
                this.nowStep = 3;
            }else if(scrolled<1063 &&scrolled>=586){
                this.nowStep = 2;
            }else{
                this.nowStep = 1;
            }
        }
    },
    created:function(){
        window.addEventListener("scroll",this.onScroll);
    }
}
</script>

<style>
.g_right_menu{
    margin:0;
    padding: 0;
    position: fixed;
    right:88px;
    top:50%;    
    z-index:70;
    margin-top:-100px;
}
/*.g_right_menu li.step_1.active {
   
}*/

.g_right_menu li.step_1 {
    background:url(../../assets/img/guide/1_normal.png) no-repeat center top;
    width: 90px;
    height: 83px;
    margin-bottom: 20px;
}   
.g_right_menu li.step_1.active {
    background: url(../../assets/img/guide/1_chosen.png) no-repeat center top;
}
.g_right_menu li.step_2 {
    width: 90px;
    height: 83px;
    background: url(../../assets/img/guide/2_normal.png) no-repeat center top;
    margin-bottom: 20px;
}
.g_right_menu li.step_2.active {
    background: url(../../assets/img/guide/2_chosen.png) no-repeat center top;
}
.g_right_menu li.step_3 {
    width: 90px;
    height: 83px;
    background: url(../../assets/img/guide/3_normal.png) no-repeat center top;
    margin-bottom: 20px;
}
.g_right_menu li.step_3.active {
    background: url(../../assets/img/guide/3_chosen.png) no-repeat center top;
}
.g_right_menu li a.step1:hover {
    background: url(../../assets/img/guide/step_1.png) no-repeat center top;
}
.g_right_menu li a.step1, .g_right_menu li a.step2, .g_right_menu li a.step3 {
    display: inline-block;
    width: 199px;
    height: 83px;
    position: relative;
    left: -109px;
}
.g_right_menu li a.step2:hover {
    background: url(../../assets/img/guide/step_2.png) no-repeat center top;
}
.g_right_menu li a.step3:hover {
    background: url(../../assets/img/guide/step_3.png) no-repeat center top;
}
</style>