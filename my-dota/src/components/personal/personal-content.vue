<template>
  <div class="personal">
    <content-left></content-left>
    <content-center></content-center>
    <content-right></content-right>
  </div>
</template>

<script>
import ContentLeft from "@/components/personal/content-left";
import ContentCenter from "@/components/personal/content-center";
import ContentRight from "@/components/personal/content-right";
export default {
    components:{
       contentLeft:ContentLeft,
       contentCenter:ContentCenter,
       contentRight:ContentRight,
   }
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
</style>
