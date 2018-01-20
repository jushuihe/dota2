<template>
  <div class="goods_pop_box">
    <div class="goods_pop_title">
      <img :src="goods_pic" alt="">
      <div class="equip_item_r">
        <span class="equip_name">{{dname}}</span>
        <div class="equip_price">{{goods_price}}</div>
      </div>
    </div>
    <p class="pop_skill_p">
    </p>
    <div v-html="descr"></div>
    <p></p>
    <p class="pop_skill_p color_green">
       
    </p>
    <p class="pop_skill_p color_green">
      {{notes}}
    </p>
    <div v-html="attrib"></div>
    <div class="xiaohao_wrap pop_xiaohao">
      <div class="icon_xh">{{mc}}</div>
      <div class="icon_lq">{{cd}}</div>
    </div>
    <p class="pop_skill_s">{{lore}}</p>
  </div>
</template>


<script>
  export default{
    props:{
      goodsId:Number
    },
    data:function(){
      return {
        goods_price:0,
        dname:"仙灵之火",
        descr:"<h1>使用：传送</h1>经过3.0秒持续施法后传送到一个指定的友方建筑。<br><br>双击将直接传送至己方泉水。",
        notes:"如果多名英雄在短时间内接连传送至相同地点，那么后续英雄的传送时间都会相应的有所延长。",
        attrib:'<p class="pop_skill_p">+伤害:<span class="color_yellow">2</span></p>',
        mc:"75",
        cd:"75",
        lore:"虚无的火焰，来自天木熊熊燃烧的遗迹，可以跨越现实燃烧。",
        did:1,
        goods_pic:"",
        theConnectUrl1:'http://176.211.99.67:3000/',
        theConnectUrl2:'http://176.211.99.144:3000/',
        theConnectUrl3:'http://176.211.99.125:3000/', 
        theConnectUrl4:'http://127.0.0.1:3000/', 
        theConnectUrl5:'http://176.211.99.95:3000/', 
        theConnectUrl6:'http://miko.applinzi.com/', 
        theConnect:"http://176.211.99.51:3000/"
      }
    },
    created:function(){
      this.theConnect = this.theConnectUrl6;
      this.$http.get(this.theConnect+"goods/detail/"+this.goodsId).then((data)=>{
        let obj = data.body[0];
        // console.log(obj);
        for(let i in obj){
          this[i] = obj[i];
        }
      })
    },
  }


</script>
<style>
  .goods_pop_box{
    position: absolute;
    width: 300px;
    padding: 10px 15px 20px;
    background-color: #1e1e1d;
    border: 2px solid #000000;
    color: #c0c0c0;
    overflow: hidden;
    z-index: 2;
    left:10px;
    right:10px;
    text-align: left;
    display: none;
  }
  .goods_pop_box .goods_pop_title{
    overflow:hidden;
  }
  .goods_pop_box .goods_pop_title img{
    float: left;
    width: 70px;
    height: 53px;
  }
  .goods_pop_box .goods_pop_title .equip_item_r{
    width: 240px;
    padding-left: 80px;
  }
  .goods_pop_box .goods_pop_title .equip_item_r .equip_name{
    font-size:16px;
  }
  .goods_pop_box .goods_pop_title .equip_item_r .equip_price{
    height: 16px;
    margin-top: 5px;
    padding-left: 30px;
    color: #f5c433;
    font: bold 14px/16px "宋体";
    background:url('../../assets/img/base/icon_money.png') 0 0 no-repeat;
  }
  .goods_pop_box .pop_skill_p{
    width: 310px;
    margin: 5px auto 0;
    font: bold 14px/22px "宋体";
  }
  .goods_pop_box  h1{
    font-size:16px;
  }
  .goods_pop_box .color_green{
    color:#6fe771;
  }
  .goods_pop_box .color_yellow{
    color:#fbb040;
  }
  .goods_pop_box .xiaohao_wrap{
    width: 310px;
    margin: 0 auto;
    padding: 10px 0;
    overflow: hidden;
  }
  .goods_pop_box .xiaohao_wrap div{
    float: left;
    height: 24px;
    padding-left: 30px;
    line-height: 24px;
    width: 125px;
    color: #7a7a7a;
  }
  .goods_pop_box .xiaohao_wrap .icon_xh{
    background:url("../../assets/img/base/icon_xiaohao.png") 0 0 no-repeat;
  }
  .goods_pop_box .xiaohao_wrap .icon_lq{
    background:url("../../assets/img/base/icon_lengque.png") 0 0 no-repeat;
  }
  .goods_pop_box .pop_skill_s{
    width: 310px;
    margin: 5px auto 0;
    line-height: 18px;
  }
</style>
