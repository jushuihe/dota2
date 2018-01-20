<template>
  <div id="content">
    <div class="bg">
      <!-- top -->
      <div class="hero_top clear">
        <!-- left top -->
        <ul class="top_tab_ul">
          <li>
              <router-link to="./all" class='present' >全部英雄</router-link>
          </li>
          <li>
            <router-link to="./rank">英雄排行</router-link>
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
      <!-- 请选择英雄 -->
      <div class="hero_cont">
        <div class="hero_cont_info">
          <!-- 显示英雄名称 和 英雄定位 -->
          <div class="tit_box">
            <div class="hero_name">{{this.heroName}}</div>
            <div class="hero_roles">
              <span class="hero_attr">{{this.attackType}}</span>
              <span class="hero_attr_more">--{{this.location}}</span>
            </div>
          </div>
          <!-- 英雄过滤 -->
          <div class="hero_filters">
            <span>英雄筛选:</span>
            <!-- 英雄定位 -->
            <select @change="updateFilters($event)" id="filterRole" class="filterSelect" name="filters">
              <option value="" disabled>按定位</option>
              <option value="all">所有</option>
              <option value="hexin">核心</option>
              <option value="kongzhi">控制</option>
              <!-- <option value="duixianfuzhu">对线辅助</option> -->
              <option value="xianshou">先手</option>
              <option value="daye">打野</option>
              <option value="fuzhu">辅助</option>
              <option value="naijiu">耐久</option>
              <option value="baofa">爆发</option>
              <option value="tuijin">推进</option>
              <option value="taosheng">逃生</option>
            </select>
            <!-- 攻击类型 -->
            <select @change="selectAttackType($event)" id="filterAttack" class="filterSelect" name="">
              <option value="" disabled>按攻击类型</option>
              <option value="all">所有</option>
              <option value="jinzhan">近战</option>
              <option value="yuancheng">远程</option>
            </select>
            <!-- 英雄名称 -->
            <select v-model="selectHeroid" id="filterName" class="filterSelect noCaps" name="">
              <option value="" disabled >英雄名称</option>
              <option value=0>所有</option>
              <option :value="tmp.hid" :name="tmp.hero_name" v-for="tmp of herolist">{{tmp.hero_cname}}</option>    
            </select>
          </div>
          <!-- 英雄过滤后显示出来 -->
          <div class="hero_show clear">
            <!-- 力量型英雄 -->
            <ul class="hero_list">
              <li class="hero_list_tit">
                <span class="hero_str">力量</span>
              </li>
              <li class="hero_show_list" v-for="tmp in theTianhuiPower" :key="tmp.hid" >
                <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"                   @mouseenter="changeBigPic(tmp.hid,$event)" 
                             @mouseleave="changeSmallPic(tmp.hid)"
                             :heroName="tmp.hero_cname"
                             :heroLocation="getTheheroLocation(tmp)"
                             :heroAttackType="tmp.attack_type"
                             :class="{isUnclick:fn(tmp.hid)}"
                             >
                  <!-- 大图 hide -->
                  <img v-if="isShowBig==tmp.hid"  :attr="isShowBigPic[tmp.hid]"  :src="tmp.sm_pic" class="hero_hover_lg">
                  <!-- 小图 show -->
                  <img   :src="tmp.xs_pic" class="hero_hover_sm" :attr="isShowBigPic[tmp.hid]" >
                </a>
              </li>
            </ul>
            <!-- 敏捷型英雄 -->
            <ul class="hero_list">
              <li class="hero_list_tit">
                <span class="hero_str">敏捷</span>
              </li>
              <li class="hero_show_list"  v-for="tmp in theTianhuiAgility" >
                <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"                    @mouseenter="changeBigPic(tmp.hid,$event)" 
                             @mouseleave="changeSmallPic(tmp.hid)"
                             :heroName="tmp.hero_cname"
                             :heroLocation="getTheheroLocation(tmp)"
                             :heroAttackType="tmp.attack_type"
                             :class="{isUnclick:fn(tmp.hid)}"
                             >
                  <!-- 大图 hide -->
                  <img v-if="isShowBig==tmp.hid" :src="tmp.sm_pic"  class="hero_hover_lg">
                  <!-- 小图 show -->
                  <img :src="tmp.xs_pic" class="hero_hover_sm">
                  
                </a>
              </li>
            </ul>
            <!-- 智力型英雄 -->
            <ul class="hero_list">
              <li class="hero_list_tit">
                <span class="hero_str">智力</span>
              </li>
              <li class="hero_show_list"  v-for="tmp in theTianhuiBrains">
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"  @mouseenter="changeBigPic(tmp.hid,$event)"
                               @mouseleave="changeSmallPic(tmp.hid)"
                               :heroName="tmp.hero_cname"
                               :heroLocation="getTheheroLocation(tmp)"
                               :heroAttackType="tmp.attack_type"
                               :class="{isUnclick:fn(tmp.hid)}"
                               >
                    <!-- 大图 hide -->
                    <img v-if="isShowBig==tmp.hid" :src="tmp.sm_pic"  class="hero_hover_lg">
                    <!-- 小图 show -->
                    <img :src="tmp.xs_pic" class="hero_hover_sm">
                  </a>
                </li>
            </ul>
            <!-- 力量型英雄   夜魇  -->
            <ul class="hero_list">
              <li class="hero_show_list" v-for="tmp in theYeyanPower" :key="tmp.hid">
                <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"   @mouseenter="changeBigPic(tmp.hid,$event)" 
                              @mouseleave="changeSmallPic(tmp.hid)"
                              :heroName="tmp.hero_cname"
                              :heroLocation="getTheheroLocation(tmp)"
                              :heroAttackType="tmp.attack_type"
                              :class="{isUnclick:fn(tmp.hid)}"
                              >
                  <!-- 大图 hide -->
                  <img v-if="isShowBig==tmp.hid"  :attr="isShowBigPic[tmp.hid]"  :src="tmp.sm_pic" class="hero_hover_lg">
                  <!-- 小图 show -->
                  <img   :src="tmp.xs_pic" class="hero_hover_sm" :attr="isShowBigPic[tmp.hid]" >
                </a>
              </li>
            </ul>
            <!-- 敏捷型英雄 夜宴-->
            <ul class="hero_list">
              <li class="hero_show_list"  v-for="tmp in theYeyanAgility">
                <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"  @mouseenter="changeBigPic(tmp.hid,$event)" 
                             @mouseleave="changeSmallPic(tmp.hid)"
                             :heroName="tmp.hero_cname"
                             :heroLocation="getTheheroLocation(tmp)"
                             :heroAttackType="tmp.attack_type"
                             :class="{isUnclick:fn(tmp.hid)}"
                             >
                  <!-- 大图 hide -->
                  <img v-if="isShowBig==tmp.hid" :src="tmp.sm_pic"  class="hero_hover_lg">
                  <!-- 小图 show -->
                  <img :src="tmp.xs_pic" class="hero_hover_sm">
                </a>
              </li>
            </ul>
            <!-- 智力型英雄 夜魇-->
            <ul class="hero_list">
              <li class="hero_show_list"  v-for="tmp in theYeyanBrains">
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid"  @mouseenter="changeBigPic(tmp.hid,$event)"
                               @mouseleave="changeSmallPic(tmp.hid)"
                               :heroName="tmp.hero_cname"
                               :heroLocation="getTheheroLocation(tmp)"
                               :heroAttackType="tmp.attack_type"
                               :class="{isUnclick:fn(tmp.hid)}"
                               >
                    <!-- 大图 hide -->
                    <img v-if="isShowBig==tmp.hid" :src="tmp.sm_pic"  class="hero_hover_lg">
                    <!-- 小图 show -->
                    <img :src="tmp.xs_pic" class="hero_hover_sm">
                  </a>
                </li>
            </ul>
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
        theAllHeroData:[],              //保存所有的英雄的数据
        theTianhuiPower:[],            //天辉力量英雄
        theTianhuiAgility:[],
        theTianhuiBrains:[],
        theYeyanPower:[],            //夜魇力量
        theYeyanAgility:[],           //夜宴敏捷
        theYeyanBrains:[],            //夜宴智力
        isShowBigPic:[],              //用一个数组来保存是否会显示大图
        isShowBig:false,
        heroName:"复仇之魂",           //用来保存 当前选中的英雄的名称
        location:"核心-辅助",          //用来保存当前选中英雄的 location  
        attackType:"近战",         //用来保存当期选中英雄的 主要属性的信息
        locationData:{},          //save hero de locationmsg
        showLocation:[],            //save now show hero of hid
        attacktype:{},             //save hero attacktype as hid
        attacktypeofid:[],             //保存当前被被选中的攻击类型的  的英雄的hid
        nowshowheroid:[],              //将两个数组进行整合 取出其中相同的元素 将其加入到这个数组中
        selectHeroid:0,                      // v-model 双向数据绑定的形式 绑定的是被选中的 英雄的hid
        herolist:[],                        //用来保存所有的英雄的 数组 {hid:1,hero_name:"",hero_cname:""}
        theConnectUrl2:'http://176.211.99.125:3000/',            //保存当前的node 的服务器的地址
        theConnectUrl1:'http://176.211.99.169:3000/',
        theConnectUrl3:'http://176.211.99.144:3000/',
        theConnectUrl4:'http://176.211.99.67:3000/',
        theConnectUrl5:'http://127.0.0.1:3000/',
        theConnectUrl6:'http://miko.applinzi.com/',
        theConnect:"http://176.211.99.67:3000/"
      }
    },
    methods:{
      changeBigPic(num,event){
        if(event.target.className==""){
          this.isShowBig=num;
        }
        // console.dir(event.target);
        // console.log(event.target.attributes.heroname.value);
        // console.log(event.target.attributes.herolocation.value);
        this.location = event.target.attributes.herolocation.value;
        this.heroName = event.target.attributes.heroname.value;
        this.attackType = event.target.attributes.heroAttackType.value;
      },
      changeSmallPic(num){
        this.isShowBig=null;
      },
      getNowPageData(){   //从服务器上得到英雄全部的数据
      // http://127.0.0.1:3000/hero/index
        this.$http.get(this.theConnect+"hero/index/").then((data)=>{
                console.log(data.body);
                this.theAllHeroData=data.body;
                this.theTianhuiPower=data.body[0].power;          //天辉力量英雄
                this.theTianhuiAgility=data.body[0].agility;
                this.theTianhuiBrains=data.body[0].brains;
                this.theYeyanPower=data.body[1].power;            //夜魇力量
                this.theYeyanAgility=data.body[1].agility;           //夜宴敏捷
                this.theYeyanBrains=data.body[1].brains;  
                console.log(this.theTianhuiAgility);
            })
      },
      getTheheroLocation(obj){     //得到每个英雄的定位信息
        let location = [];
        if((obj.hexin=="1"?"核心":"")!=""){
          location.push(obj.hexin=="1"?"核心":"");
        };
        if((obj.daye=="1"?"打野":"")!=""){
          location.push(obj.daye=="1"?"打野":"");
        };
        if((obj.duixianfuzhu=="1"?"对线辅助":"")!=""){
          location.push(obj.duixianfuzhu=="1"?"对线辅助":"");
        };
        if((obj.fuzhu=="1"?"辅助":"")!=""){
          location.push(obj.fuzhu=="1"?"辅助":"");
        };
        if((obj.kongzhi=="1"?"控制":"")!=""){
          location.push(obj.kongzhi=="1"?"控制":"");
        };
        if((obj.naijiu=="1"?"耐久":"")!=""){
          location.push(obj.naijiu=="1"?"耐久":"");
        };
        if((obj.tuijin=="1"?"推进":"")!=""){
          location.push(obj.tuijin=="1"?"推进":"");
        };
        if((obj.baofa=="1"?"爆发":"")!=""){
          location.push(obj.baofa=="1"?"爆发":"");
        };
        if((obj.xianshou=="1"?"先手":"")!=""){
          location.push(obj.xianshou=="1"?"先手":"");
        };
        if((obj.taosheng=="1"?"逃生":"")!=""){
          location.push(obj.baofa=="1"?"逃生":"");
        };
       let str = location.join(" -- ");
        return str;
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
      updateFilters(event){               // 这是选择 英雄定位的时候执行的函数 
        let myValue=event.target.value;
        if(myValue=="all") this.showLocation=[];
        else this.showLocation = this.locationData[myValue];
        this.nowshowheroid = this.arrayIntersection(this.attacktypeofid,this.showLocation);
      },
      selectAttackType(event){                //这是选择 英雄攻击类型的时候执行的函数
        let attacktype1 = event.target.value;
        if(attacktype1=="all") this.attacktypeofid=[];
        else this.attacktypeofid = this.attacktype[attacktype1];
        
        // console.dir(this.attacktype);
        // console.dir(attacktype1);
        // console.dir(this.attacktypeofid);
        
        this.nowshowheroid = this.arrayIntersection(this.attacktypeofid,this.showLocation);
      },
      arrayIntersection(a,b){
          if(a.length==0) return b;
          if(b.length==0) return a;
          var ai=0, bi=0;
          var result = new Array();
          while (ai<a.length && bi<b.length ){
              if(a[ai]<b[bi]){
                ai++;
              }else if(a[ai]>b[bi]){
                bi++;
              }else{
                result.push (a[ai]);
                ai++;
                bi++;
              }
          }
          return result;
      }
    },
    created:function(){
      this.theConnect = this.theConnectUrl6;
      this.getNowPageData();
    },
    mounted:function(){                      //在创建DOM的时候 执行的操作 
      let locationArr = ["kongzhi","duixianfuzhu","xianshou","daye","fuzhu","naijiu","baofa","tuijin","taosheng"];
      this.$http.get(this.theConnect+"hero/location/").then((data)=>{
        // console.log(data.body);
        this.locationData=data.body;         //   
        // console.log(this.locationData);
      })
      this.$http.get(this.theConnect+"hero/attacktype").then((data)=>{
        console.log(data.body);
        this.attacktype["yuancheng"]=data.body['yuancheng'];                 //将返回的结果保存在数据中
        this.attacktype["jinzhan"]=data.body['jinzhan'];
        console.log(this.attacktype);
      })
      this.$http.get(this.theConnect+"hero/herolist").then((data)=>{
        // console.log(data.body);
        this.herolist=data.body;
      })
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
#content .bg .hero_top .top_tab_ul>li>a:hover{
    background-position: 0 -42px ;
}
#content .bg .hero_top .top_tab_ul>li>a.present{
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
/* 所有英雄 */
#content .hero_cont{
    width: 982px;
    padding: 35px 0 50px;
    min-height: 300px;
    margin: 0 auto;
    background-color: #0f0f0f;
}
#content .hero_cont .hero_cont_info{
    padding: 0 22px;
}
#content .hero_cont .hero_cont_info .tit_box{
    background: #000;
    margin-bottom: 14px;
    padding: 14px 6px;
    border-radius: 5px;
}
#content .hero_cont .hero_cont_info .tit_box .hero_name{
    height: 40px;
    margin-top: 15px;
    text-align: center;
    font: bold 24px/40px "微软雅黑";
    color: #c0c0c0;
}
#content .hero_cont .hero_cont_info .tit_box .hero_roles{
    line-height: 18px;
    text-align: center;
    font-size: 14px;
    padding-top: 2px;
    color: #c4c0c0;
}
#content .hero_cont .hero_cont_info .tit_box .hero_roles .hero_attr{
    color:#fff;
    font:inherit;
}
#content .hero_cont .hero_cont_info .tit_box .hero_roles{
    color: #c4c0c0;
    font:inherit;
}
#content .hero_cont .hero_cont_info .hero_filters{
    text-align: center;
    padding-bottom: 10px;
    color: #999;
}
#content .hero_cont .hero_cont_info .hero_filters select{
    margin-left:40px;
    width: 150px;
    padding: 3px;
    font-size: 12px;
    background: #2a2c2d;
    border-top: 1px solid #363939;
    border-left: 1px solid #363939;
    border-right: 1px solid #1b1e1e;
    border-bottom: 1px solid #1b1e1e;
    color: #999;
    outline: medium;
}
#content .hero_cont .hero_cont_info .hero_show{
    width: 870px;
    margin: 0 auto;
    padding-top: 20px;
}
#content .hero_cont .hero_cont_info .hero_show ul.hero_list{
    width: 278px;
    padding: 0 6px;
    float: left;
    height:310px;
}
#content .hero_cont .hero_cont_info .hero_show ul.hero_list>li{
    width: 69px;
    height: 44px;
    float: left;
    position: relative;
}
#content .hero_cont .hero_cont_info .hero_show ul.hero_list>li>a{
    float: left;
    position: relative;
    display: block;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_list_tit{
    width: 278px;
    height: 42px;
    text-align: center;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_list_tit>span{
    padding-left: 40px;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    font-size: 16px;
    color: #616363;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_list_tit>span.hero_str{
    background: url(../../assets/img/heroes/overviewicon_str-w379.png) no-repeat 0 center;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_list_tit>span.hero_agi{
    background: url(../../assets/img/heroes/overviewicon_agi-w380.png) no-repeat 0 center;
}

#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_list_tit>span.hero_int{
    background: url(../../assets/img/heroes/overviewicon_int-w386.png) no-repeat 0 center;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_hover_lg{
    width: 127px;
    height: 71px;
    border: 4px solid #fff;
    border-radius: 3px;
    -webkit-box-shadow: 0px 0px 4px 4px #1C1E1E;
    -moz-box-shadow: 0px 0px 4px 4px #1c1e1e;
    -moz-border-radius: 3px;
    box-shadow: 0px 0px 4px 4px #1C1E1E;
    position: absolute;
    top: -19px;
    left: -34px;
    z-index: 3;
}
#content .hero_cont .hero_cont_info .hero_show .hero_list .hero_hover_sm{
    width: 59px;
    height: 33px;
    border: 4px solid #000;
    border-radius: 3px;
    box-sizing: content-box;
}
/*.hero_cont_info .hero_show .hero_list .hero_hover_sm:hover  .hero_hover_lg{*/
    /*display: inline-block;*/
/*}*/


  /*为不能点击 li 增加样式  */
.isUnclick{
    opacity: .1;
    background-color: #000000;
    cursor: default;
}



</style>
