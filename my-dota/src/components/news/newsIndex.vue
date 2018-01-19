<template>
<div>
    <Header></Header>
    <NewsIndexComponent></NewsIndexComponent>
    <Footer></Footer>
</div>
</template>


<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  import NewsIndexComponent from '@/components/news/newsIndexComponent'
  import NewsIndexContentComponent from '@/components/news/newsIndexContentComponent'
  
  export default{
    data:function(){
      return {
        heroId:0,
      } 
    },
    components: {
      Header: Header,
      Footer: Footer,
      NewsIndexComponent: NewsIndexComponent,
      NewsIndexContentComponent:NewsIndexContentComponent
    },
    created:function(){
      
    }
  }
</script>

<style>

</style>

