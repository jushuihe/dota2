<template>
<div>
    <Header></Header>
    <h1> this is the goods page</h1>
    <goodsComponent></goodsComponent> 
    <Footer></Footer>
</div>
</template>

<script>
  import Header from '@/components/utility/header'
  import Footer from '@/components/utility/footer'
  import goodsComponent from '@/components/goods/goodsComponent'
  export default{
    components: {
      Header: Header,
      Footer: Footer,
      goodsComponent: goodsComponent
    }
  }
</script>

<style>

</style>

