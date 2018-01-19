<template>
    <div class="content">
        <div class="banner"> 
            <a href="http://secretshop.dota2.com.cn/" target="_blank"></a>
        </div>
        <NewsDetailContentComponent></NewsDetailContentComponent>
    </div>
</template>


<script>
    import NewsDetailContentComponent from '@/components/news/newsDetailContentComponent'

    export default {
        components:{
            NewsDetailContentComponent:NewsDetailContentComponent
        }
    }
</script>
    
<style>
    .content{
    
    background:#1A1B1F;
    }
    .banner {
    height: 890px;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color:#1A1B1F;
    background:#1A1B1F url(../../assets/img/news/44a04c01449e6cefa1e3fc17ec5c302e1513781529.jpg) no-repeat top center;
    /*background-attachment: fixed;*/
    }

    .banner a {
    display: block;
    width: 1200px;
    height: 380px;
    margin: 0 auto;
    }
</style>
