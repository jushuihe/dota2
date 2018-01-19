<template>
<div>
    <Header></Header>
    <h1> this is the login page</h1>
    <Footer></Footer>
</div>
</template>


<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  
  export default{
    data:function(){
      return {
        heroId:0,
      } 
    },
    components: {
      Header: Header,
      Footer: Footer,
    },
    created:function(){
      
    }
  }
</script>

<style>

</style>

