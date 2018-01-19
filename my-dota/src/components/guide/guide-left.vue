<template>
   <div class="m-slide opened"  id="J_slide"
   v-bind:style="{left:myLeft+'px'}">
            <a class="m-slide-trigger J-slide-trigger" :class="{mSlideRrr:sure}" @click="toggle"></a>
        </div>
</template>

<script>
export default {
    data:function(){
        return{
          myLeft:-215,
          sure:true
        }
    },
    methods:{
        toggle:function(){
            if(this.myLeft<0){
                this.myLeft=0;
                this.sure=false;
            }else{
                this.myLeft=-215;
                this.sure=true;
            }
        }
    }
}
</script>

<style>
    .m-slide {
    position: fixed;
    left: 0px;
    top: 20%;
    width: 218px;
    height: 574px;
    background: url(../../assets/img/guide/slide_backgimg.jpg) no-repeat top center;
    z-index: 1001;
    transition: all .5s linear;
}

.m-slide-trigger {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 28px;
    right: -30px;
    width: 30px;
    height: 140px;
    background: url(../../assets/img/guide/slide_arrow.png) no-repeat scroll 0 0;
}
.mSlideRrr{
   background: url(../../assets/img/guide/slide_arrow.png) no-repeat scroll -30px;
}
</style>
