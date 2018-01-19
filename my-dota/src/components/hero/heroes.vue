<template>
<div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</div>
</template>


<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  export default{
    components: {
      Header: Header,
      Footer: Footer,
    }
  }
</script>
<style>

</style>

