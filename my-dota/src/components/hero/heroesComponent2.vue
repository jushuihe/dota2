<template>
  <div id="content">
    <div class="bg">
      <!-- top -->
      <div class="hero_top clear">
        <!-- left top -->
        <ul class="top_tab_ul">
          <li>
            <router-link to="./all" >全部英雄</router-link>
          </li>
          <li>
            <router-link to="./rank" class="present">英雄排行</router-link>
            <!-- <a href="#" class="present">英雄排行</a> -->
          </li>
          <li>
              <router-link to="./battle">英雄对比</router-link>
          </li>
        </ul>
        <!-- right top  -->
        <div class="top_search">
          <div class="top_search_help">
            <input type="text" placeholder="请输入搜索内容" class="search_inp">
            <a href="#" class="search_a">搜索</a>
          </div>
          <div class="top_search_help">
            <a href="#" class="btn_col"></a>
            <a href="#" class="btn_err"></a>
          </div>
        </div>
      </div>
      <!-- 英雄排行 -->
      <div class="hero_cont">
        <div class="hero_cont_info">
          <div class="rankscontent clear" v-for="(rank,index1) in theAllHeroRank">
            <div class="rank" v-for="(tmp1,index2) in rank" >
              <h1 class="rank_title">{{tmp1.title}}</h1><span>最高英雄  Top5</span>
              <p class="rankTitle">
                <span>排名</span>
                <span>英雄名称</span>
                <span>攻击类型</span>
                <span>{{tmp1.title}}</span>
                
              </p>
              <ul class="rankcontainer" :class="{'addmore':isAddMore[index1*5+index2],'addyincang':!isAddYincang[index1*5+index2]}">
                <li v-for="(tmp2,index3) in tmp1.data">
                  <img :src="'../../src/assets/img/base/sort'+(index3+1)+'.png'" alt="" class="rankbianhao">
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp2.hid">
                    <img :src="tmp2.xs_pic" alt="">
                    <span>{{tmp2.hero_cname}}</span>
                  </a>
                  <span>{{tmp2.attack_type}}</span>
                  <span>{{tmp2.value}}</span>
                  <!-- <div>{{isAddMore[1]}}</div> -->
                </li>
              </ul>
              <div class="pulldown">
                <span @click="addMore(index1,index2)" v-if="!isAddMore[index1*5+index2]">加载更多</span>
                <span v-if="isAddMore[index1*5+index2]"  class="yincang" @click="addyincang(index1,index2)">隐藏</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        theAllHeroRank:[],              //保存所有的英雄的数据
        isAddMore:[false,false,false,false,false,false,false,false,false],
        isAddYincang:[true,true,true,true,true,true,true,true,true],
        theConnectLocalUrl:'http://127.0.0.1:3000/',
        theConnectUrl1:'http://176.211.99.67:3000/',
        theConnectUrl2:'http://176.211.99.144:3000/',
        theConnectUrl3:'http://176.211.99.125:3000/',            
        theConnectUrl4:'http://176.211.99.95:3000/',            
        theConnectUrl5:'http://127.0.0.1:3000/',            
        theConnect:"http://176.211.99.51:3000/"
      }
    },
    methods:{
      changeBigPic(num,event){
        if(event.target.className==""){
          this.isShowBig=num;
        }
        this.location = event.target.attributes.herolocation.value;
        this.heroName = event.target.attributes.heroname.value;
        this.attackType = event.target.attributes.heroAttackType.value;
      },
      changeSmallPic(num){
        this.isShowBig=null;
      },
      getNowPageData(){   //从服务器上得到英雄全部的数据
        this.$http.get(this.theConnect+"hero/rank/").then((data)=>{
                let newArr1 = [];
                newArr1[0]={};
                newArr1[0].title = "力量成长";
                newArr1[0].data = data.body["power_grow"];
                newArr1[1] = {};
                newArr1[1].title = "智力成长";
                newArr1[1].data = data.body["brains_grow"];
                newArr1[2] = {};
                newArr1[2].title = "敏捷成长";
                newArr1[2].data = data.body["agility_grow"];
                newArr1[3] = {};
                newArr1[3].title = "移动速度";
                newArr1[3].data = data.body["move_speed"];
                newArr1[4] = {};
                newArr1[4].title = "攻击值";
                newArr1[4].data = data.body["attack_value"];
                this.theAllHeroRank.push(newArr1);

                let newArr2=[];
                newArr2[0] = {};
                newArr2[0].title = "初始力量";
                newArr2[0].data = data.body["power_initial"];
                newArr2[1] = {};
                newArr2[1].title = "初始智力";
                newArr2[1].data = data.body["brains_initial"];
                newArr2[2] = {};
                newArr2[2].title = "初始敏捷";
                newArr2[2].data = data.body["agility_initial"];
                newArr2[3] = {};
                newArr2[3].title = "攻击范围";
                newArr2[3].data = data.body["attack_range"];
                this.theAllHeroRank.push(newArr2);
                // console.log(this.theAllHeroRank);
            })
      },
     
      fn(index){                         //这个函数用来判断 什么时候对 英雄图片增加 className
        if(this.nowshowheroid.length==0){
          if(parseInt(this.selectHeroid) == 0){
           return false;
          }else if(parseInt(this.selectHeroid) == index){
            return false;
          }else{
            return true;
          }
        } 
        if(parseInt(this.selectHeroid)==0){
          if(this.nowshowheroid.indexOf(index) == -1)     //如果hid 在数组中 表示显示
          return true;   //返回true 表示把属性赋值给当前标签，图片不显示
          else return false; //如果 当前传过来的hid 不在数组中  就返回false  不会给当前 的 标签赋予当前属性
        }else{
           if(parseInt(this.selectHeroid) == index){
           return false;
          }else{
            return true;
          }
        }
      },
      addMore(a,b){
        let count = a*5+b;
        this.isAddMore.splice(count,1,true);
        this.isAddYincang.splice(count,1,true);
      },
      addyincang(a,b){
        let count = a*5+b;
        this.isAddMore.splice(count,1,false);
        this.isAddYincang.splice(count,1,false);
      }
    },
    computed:{
      classObjectAddMore:function(a,b){
        return {
          addmore:true,
          addyincang:true
        }
      }
    },
    created:function(){
      this.theConnect = this.theConnectUrl5;
      this.getNowPageData();
    },
    beforeMount:function(){                      //在创建DOM的时候 执行的操作 
      // this.getNowPageData();
    },
  }

</script>

<style>
  #content {
    width:100%;
    background: #141516;;
  }
  #content .bg{
      width:100%;
      background-color: #141516;
  }
  #content .bg .hero_top{
      background-color:#1F2021;
      width:1000px;
      height: 115px;
      padding: 0 10px;
      margin: 0 auto;
      overflow: hidden;
      background-image: url(../../assets/img/heroes/hero_top_bg.jpg);
  }
  #content .bg .hero_top .top_tab_ul{
      float: left;
      padding-top: 69px;
      height: 42px;
      /*overflow: hidden;*/
      display: inline-block;
  }
  #content .bg .hero_top .top_tab_ul>li{
      float: left;
      display: inline-block;
      width: 129px;
      margin-right: 1px;
      background:red;
  }
  #content .bg .hero_top .top_tab_ul>li>a{
      display: inline-block;
      width: 129px;
      height: 42px;
      text-align: center;
      color: #c0c0c0;
      background: linear-gradient(to bottom,#913333 0% , #892F2E 10% ,#501F1A 100%);
      background:url("../../assets/img/heroes/top_tab.jpg");
      background-position: 0 0px;
      line-height: 40px;
      font-size: 20px;
  }
  #content .bg .hero_top .top_tab_ul>li>a.present{
    background-position: 0 -42px;
  }
  #content .bg .hero_top .top_tab_ul>li>a:hover{
      background-position: 0 -42px;
  }
  #content .bg .hero_top .top_search{
      float: right;
      width: 248px;
      padding-top: 22px;
  }
  #content .bg .hero_top .top_search .top_search_help{
      width: 248px;
      padding-top: 10px;
      overflow: hidden;
  }
  #content .bg .hero_top .top_search .top_search_help .search_inp{
      float: left;
      width: 167px;
      height: 22px;
      padding: 0 5px;
      color: #717779;
      font: normal 12px/22px "宋体";
      background-color: #1a1d1e;
      border: 1px solid #2c2f33;
      border-collapse:collapse;
      /*去掉输入框蓝色边框*/
      outline:medium;
  }
  #content .bg .hero_top .top_search .top_search_help .search_a{
      width:65px;
      height:25px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      border-radius:3px;
      margin-left:10px;
      background: linear-gradient(to bottom,#913333 0% , #892F2E 10% ,#501F1A 100%);
  }
  #content .bg .hero_top .top_search .top_search_help .btn_col,.btn_err{
      width: 120px;
      height: 30px;
      border: 3px solid #27292b;
      cursor: pointer;
  }
  #content .bg .hero_top .top_search .top_search_help .btn_col{
      float: left;
      background-image: url("../../assets/img/heroes/btn_shoucang-w382.png");
  }
  #content .bg .hero_top .top_search .top_search_help .btn_err{
      float: right;
      background-image: url(../../assets/img/heroes/btn_baocuo.png);
  }
  /* 所有排行 */
  #content .hero_cont{
      width: 982px;
      padding: 35px 0 50px;
      min-height: 300px;
      margin: 0 auto;
      background-color: #0f0f0f;
  }

  #content .hero_cont .hero_cont_info .rankscontent{
    width:45%;
    display:inline-block;
    vertical-align: top;
  }
  #content .hero_cont .hero_cont_info .rankscontent:first-child{
    margin-right:50px;
  }
  #content .hero_cont .hero_cont_info .rank{
    width:80%;
    float: right;
    margin-bottom:30px;
  }
  #content .hero_cont .hero_cont_info .rankscontent:last-child .rank{
    float:left;
  }
  #content .hero_cont .hero_cont_info .rank h1{
    height:32px;
    padding:0 20px;
    background-color:#501e19;
    color:#fff;
    font:normal 22px/32px "微软雅黑";
   
    display:inline-block;
  }
  #content .hero_cont .hero_cont_info .rank>span{
    font:normal 14px/40px "宋体";
    color:#89332b;
    margin-left:10px;
  }
  #content .hero_cont .hero_cont_info .rank .rankTitle{
    height: 37px;
    background-color: #1a1c1d;
    color: #ababab;
    font-size:14px;
    font-weight:bold;
    width:100%;
    font:bold 14px/37px "宋体";
  }
  #content .hero_cont .hero_cont_info .rank .rankTitle span{
    width:20%;
    display:inline-block;
    padding-left:10px;
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer{
    width:100%;
    overflow: hidden;
    height:215px; 

  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li{
    height: 37px;
    color: #ababab;
    font-size:14px;
    font-weight:bold;
    width:100%;
    font:bold 12px/37px "宋体";
    margin-top:5px;
    position:relative;
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li img{
    vertical-align: middle;
    margin-left:20px;
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li>span{
    position:absolute;
    left:218px;
    
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li>span:last-child{
    left:300px;
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li a{
    color:#ababab;
  }
  #content .hero_cont .hero_cont_info .rank .rankcontainer li a:hover{
    color:#fff;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown{
    height:37px;
    width:100%;
    text-align:center;
    font:normal 14px/37px "微软雅黑";
    background:#151515;
    margin-top:5px;
    cursor: pointer;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown span{
    width:100px;
    height:37px;
    vertical-align: middle;
    display:inline-block;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown span{
    background:url("../../assets/img/personal/pay_triangle.png") left center no-repeat;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown span.yincang{
    background:url("../../assets/img/personal/pay_triangle_down.png") left center no-repeat;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown span:hover{
    background:url("../../assets/img/personal/pay_triangle_h.png") left center no-repeat;
    color:#ababab;
  }
  #content .hero_cont .hero_cont_info .rank .pulldown span.yincang:hover{
    background:url("../../assets/img/personal/pay_triangle_down_h.png") left center no-repeat;
    color:#ababab;
  }


  .addmore{
    animation: myAdd 1s 1;
    animation-fill-mode:both;
  }
  @keyframes myAdd{
    0%{
      height:215px;
    }
    100%{
      height:420px;
    }
  }
  .addyincang{
    animation: myYincang 1s 1;
    animation-fill-mode:both;
  }
  @keyframes myYincang{
    0%{
      height:420px;
    }
    100%{
      height:215px;
    }
  }
</style>
