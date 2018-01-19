<template>
<div>
    <Header></Header>
    
    <NewsDetailComponent></NewsDetailComponent>
    <Footer></Footer>
</div>
</template>


<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  import NewsDetailComponent from '@/components/news/newsDetailComponent'
  export default{
    data:function(){
      return {
        heroId:0,
      } 
    },
    components: {
      Header: Header,
      Footer: Footer,
      NewsDetailComponent: NewsDetailComponent
    },
    created:function(){
      
    }
  }
</script>

<style>

</style>

