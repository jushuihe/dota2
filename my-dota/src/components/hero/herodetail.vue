<template>
<div>
    <Header></Header>
    <HeroDetailComponent :heroId="heroId"></HeroDetailComponent>
    <Footer></Footer>
</div>
</template>


<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  import HeroDetailComponent from '@/components/hero/herodetailComponent'
  export default{
    data:function(){
      return {
        heroId:0,
      } 
    },
    components: {
      Header: Header,
      Footer: Footer,
      HeroDetailComponent: HeroDetailComponent
    },
    created:function(){
      console.log("组件创建的时候");
      this.heroId = this.$route.params.heroId;
      console.log(this.heroId);
    }
  }
</script>

<style>

</style>

