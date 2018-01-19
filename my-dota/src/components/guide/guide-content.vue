<template>
       <div>
           <guide-header></guide-header>
           <guide-center></guide-center>
           <guide-right></guide-right>
           <guide-left></guide-left>
           <guide-footer></guide-footer>
       </div>
</template>

<script>
import GuideHeader from '@/components/utility/header';
import GuideFooter from '@/components/utility/footer';
import GuideCenter from '@/components/guide/guide-center'
import GuideRight from '@/components/guide/guide-right'
import GuideLeft from '@/components/guide/guide-left'
export default {
    components:{
        guideHeader:GuideHeader,
        guideFooter:GuideFooter,
        guideCenter:GuideCenter,
        guideRight:GuideRight,
        guideLeft:GuideLeft,
    }
}
</script>

<style>

</style>
