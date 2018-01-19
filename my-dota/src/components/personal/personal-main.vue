<template>
    <div class="personal_bg">
        <per-header></per-header>  
        <per-content></per-content>
        <per-bottom></per-bottom>
    </div>
</template>

<script>
import PersonalHeader from "@/components/personal/header";
import PersonalContent from '@/components/personal/personal-content';
import PersonalBottom from '@/components/personal/personal-bottom';
export default {
   components:{
       perHeader:PersonalHeader,
       perContent:PersonalContent,
       perBottom:PersonalBottom,
   }
}
</script>

<style>
    div.personal_bg {
        background: #efeff1;
    }
</style>
