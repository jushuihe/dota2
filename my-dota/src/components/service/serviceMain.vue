<template>
<div class="wrap">
    <serviceHeader></serviceHeader>
    <serviceContent></serviceContent>
    <Footer></Footer>
    
</div>


</template>
<script>
  import serviceContent from '@/components/service/serviceContent'
  import serviceHeader from '@/components/service/serviceHeader'
  import footer from '@/components/utility/footer'

  export default {
      components:{
        serviceContent:serviceContent,
        serviceHeader:serviceHeader,
        Footer:footer
      }
  }
</script>
<style>
.wrap{
    background:url(../../assets/img/service/bg.jpg) no-repeat center top;
    
}
</style>

