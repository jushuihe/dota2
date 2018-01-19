<template>
  <div id="content">
    <div class="bg">
      <!-- top -->
      <div class="bar_top clear">
        <!-- 英雄名片 -->
        <div class="top_hero_card clear">
          <div class="lf inbl">
            <img :src="hero_pic.ss_pic" :alt="hero_data.hero_cname">
            <!-- 内联img 里面的src  需要加src这个文件夹 -->
          </div>
          <p class="lf">
            <span>{{this.hero_data.hero_cname}}</span>
            <br> {{this.hero_data.hero_name}}
          </p>
        </div>
        <!-- 新手推荐，热门英雄，美型英雄 -->
        <div class="top_hero_info">
          <ul>
            <li>
              <span>新手推荐</span>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/sniper/'">狙击手</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/dragon_knight/'">龙骑士</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/windranger/'">风行者</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/lich/'">巫妖</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/witch_doctor/'">巫医</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/viper/'">冥界亚龙</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/tidehunter/'">潮汐猎人</a>
            </li>
            <li>
              <span>热门英雄</span>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/pudge/'">帕吉</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/invoker/'">祈求者</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/venomancer/'">剧毒术士</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/mirana/'">米拉娜</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/riki/'">力丸</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/bloodseeker/'">血魔</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/axe/'">斧王</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/drow_ranger/'">卓尔游侠</a>
            </li>
            <li>
              <span>进阶英雄</span>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/crystal_maiden/'">水晶室女</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/lina/'">莉娜</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/enchantress/'">魅惑魔女</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/templar_assassin/'">圣堂刺客</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/queen_of_pain/'">痛苦女王</a>
              <a href="javascript:;" onclick="top.location.href='http://www.dota2.com.cn/hero/luna/'">露娜</a>
            </li>
          </ul>
        </div>
        <!-- 搜索，收藏 -->
        <div class="top_hero_search inbl">
          <a href="#"></a>
        </div>
      </div>
      <!-- top - end -->
      <!-- 英雄详细内容 -->
      <div class="hero_detail">
        <!-- 英雄详细 左 -->
        <div class="detail_left clear">
          <!-- 英雄资料 -->
          <div class="hero_info clear">
            <div class="hero_card">
              <img :src="hero_pic.mm_pic" :alt="hero_data.hero_cname" class="clear">
              <div class="hero_name">
                <img :src="hero_pic.touxiang_pic" alt="">{{hero_data.hero_cname}}
              </div>
              <!-- 1. 英雄定位类型等信息列表 -->
              <ul class="detail_list">
                <li class="clearfix">
                  <span class="info_t">攻击类型：</span>
                  <p class="info_p">
                    <span>{{hero_data.attack_type}}</span>
                  </p>
                </li>
                <li class="clearfix">
                  <span class="info_t">定位：</span>
                  <p class="info_p" id="lastEm">
                    <span class="_btn_type" v-if="hero_location.hexin=='1'" star="3" type="核心">核心-</span>
                    <span class="_btn_type" v-if="hero_location.daye=='1'" star="3" type="打野">打野-</span>
                    <span class="_btn_type" v-if="hero_location.duixianfuzhu=='1'" star="3" type="对线辅助">对线辅助-</span>
                    <span class="_btn_type" v-if="hero_location.fuzhu=='1'" star="3" type="辅助">辅助-</span>
                    <span class="_btn_type" v-if="hero_location.kongzhi=='1'" star="3" type="控制">控制-</span>
                    <span class="_btn_type" v-if="hero_location.naijiu=='1'" star="3" type="耐久">耐久-</span>
                    <span class="_btn_type" v-if="hero_location.tuijin=='1'" star="3" type="推进">推进-</span>
                    <span class="_btn_type" v-if="hero_location.baofa=='1'" star="3" type="爆发">爆发-</span>
                    <span class="_btn_type" v-if="hero_location.xianshou=='1'" star="3" type="先手">先手-</span>
                    <span class="_btn_type" v-if="hero_location.taosheng=='1'" star="1" type="逃生">逃生-</span>
                    
                  </p>
                </li>
                <li class="clearfix">
                  <span class="info_t" style="line-height:28px">阵营：</span>
                  <p class="info_p zhengying_p">
                    <img src="../../assets/img/base/radiant.jpg" v-if="hero_data.camp=='天辉'" alt="天辉">
                    <img src="../../assets/img/base/dire.jpg" v-if="hero_data.camp=='梦魇'" alt="梦魇"> 
                    <span>{{hero_data.camp}}</span>
                  </p>
                </li>
                <li class="clearfix">
                  <span class="info_t">其他简称：</span>
                  <p class="info_p">{{hero_data.other_name}}</p>
                </li>
              </ul>
            </div>
            <!-- 2. 英雄属性 -->
            <div class="hero_attr">
              <h2 class="til_name">英雄属性</h2>
              <!-- 英雄三围(bwh)成长 -->
              <ul class="bwh_box">
                <!-- 力量 属性 介绍 -->
                <li>
                  <div class="bwh_att bwh1" @mousemove.stop="addPowerDiv(0,$event)" @mouseout="removepop(0,$event)">
                    <!-- 力量 图标 背景 -->
                  </div>
                  <p>{{hero_property.power_initial}} + {{hero_property.power_grow}}</p>
                  <div class="pop_box">
                    <div class="pop_property_t">力量</div>
                    
                    <p class="pop_property_cont">
                      - 每点增加<span class="color_green">20点</span>生命值
                      <br>
                       - 每点增加<span class="color_green">0.7%</span>生命恢复增强
                      <br> 
                      - 英雄每升一级获得点数：<span class="color_green">1.3</span>
                    </p>
                  </div>
                </li>
                <!-- 敏捷 属性 介绍 -->
                <li>
                  <div class="bwh_att bwh2" @mousemove.stop="addPowerDiv(1,$event)" @mouseout="removepop(1,$event)">
                    <!-- 敏捷 图标 背景 -->
                  </div>
                  <p>{{hero_property.agility_initial}} + {{hero_property.agility_grow}}</p>
                  <div class="pop_box">
                    <div class="pop_property_t">敏捷：主要属性</div>
                    <p class="pop_property_cont">
                      - 每点增加
                      <span class="color_green">1点</span>攻击力
                      <br> - 每点增加
                      <span class="color_green">0.06%</span>移动速度
                      <br> - 每点增加
                      <span class="color_green">1/6点</span>护甲
                      <br> - 每点增加
                      <span class="color_green">1%</span>攻击速度
                      <br> - 英雄每升一级获得点数：
                      <span class="color_green">2.8</span>
                    </p>
                  </div>
                </li>
                <!-- 敏捷 属性 介绍 -->
                <li>
                  <div class="bwh_att bwh3" @mousemove.stop="addPowerDiv(2,$event)" @mouseout="removepop(2,$event)">
                    <!-- 敏捷 图标 背景 -->
                  </div>
                  <p>{{hero_property.brains_initial}} + {{hero_property.brains_grow}}</p>
                  <div class="pop_box">
                    <div class="pop_property_t">智力</div>
                    <p class="pop_property_cont">
                      - 每点增加
                      <span class="color_green">12点</span>魔法值
                      <br> - 每点增加
                      <span class="color_green">2.0%</span>魔法恢复增强
                      <br> - 每点增加
                      <span class="color_green">0.07%</span>技能增强
                      <br> - 英雄每升一级获得点数：
                      <span class="color_green">1.8</span>
                    </p>
                  </div>
                </li>
                <!-- 攻击力 属性 介绍 -->
                <li>
                  <div class="bwh4" @mousemove="addPowerDiv(3,$event)" @mouseout="removepop(3,$event)">
                    <!-- 攻击力 图标 背景 -->
                  </div>
                  <p>{{hero_property.attack_value}}</p>
                  <div class="pop_box" >
                    <div class="pop_property_t">攻击力</div>
                    <p class="pop_property_cont">
                      - 攻击速度：
                      <span class="color_green">{{hero_property.attack_speed}}</span>
                      <br> - 攻击伤害：
                      <span class="color_green">{{hero_property.attack_harm}}</span>
                      <br> - 攻击距离：
                      <span class="color_green">{{hero_property.attack_range}}</span>
                    </p>
                  </div>
                </li>
                <!-- 护甲 属性 介绍 -->
                <li>
                  <div class="bwh5" @mousemove="addPowerDiv(4,$event)" @mouseout="removepop(4,$event)">
                    <!-- 护甲 图标 背景 -->
                  </div>
                  <p>{{hero_property.armor}}</p>
                  <div class="pop_box">
                    <div class="pop_property_t">护甲</div>
                    <p class="pop_property_cont">
                      - 物理防御：
                      <span class="color_green">{{hero_property.armor}}</span>
                      <br> - 物理伤害抗性：
                      <span class="color_green">11%</span>
                      <br> - 魔法伤害抗性：
                      <span class="color_green">25%</span>
                    </p>
                  </div>
                </li>
                <!-- 移动速度 属性 介绍 -->
                <li>
                  <div class="bwh6">
                    <!-- 移动(鞋子) 图标 背景 -->
                  </div>
                  <p>{{hero_property.move_speed}}</p>
                </li>
              </ul>
            </div>
            <!-- 选择等级 -->
            <div class="hero_level">
              等级 :
              <select id="level_select">
                <option value="1">1级</option>
                <option value="15">15级</option>
                <option value="25" selected="">25级</option>
              </select>
            </div>
            <!-- 选择等级 对应显示 雷达图 -->
            <div id="radar_info" style="width:280px;height:280px">
              <!-- 显示canvas雷达图 -->
            </div>
            <!-- 视野，攻击范围，弹道速度 -->
            <div class="area_box">
              <p class="area_box_one">
                <span>
                  视野范围:
                  <span>1800/800</span>
                </span>
                <span>
                  攻击范围:
                  <span>{{hero_property.attack_range}}</span>
                </span>
              </p>
              <p class="area_box_two">
                弹道速度:
                <span>N/A</span>
              </p>
            </div>
            <!-- 英雄荣耀 -->
            <div class="hero_honor">
              <h2 class="til_name">英雄荣誉</h2>
              <p>
                <img src="../../assets/img/base/honor_icon.png">
                <span>初始攻击间隔最低的英雄(1.45)</span>
              </p>
            </div>
          </div>
        </div>

        <!-- 英雄详细 右 -->
        <div class="detail_right">
          <!-- 故事背景 -->
          <div class="storyBg ">
            <h2 class="right_h2">故事背景</h2>
            <div class="story_box list_box ">
              <a href="http://www.dota2.com.cn/images/others/antimage_big1.jpg">
              
                <img class="story_img_s" src="http://www.dota2.com.cn/images/others/antimage_big1.jpg" alt="">
                <img class="story_add" src="../../assets/img/base/fangda.png" alt="">
              </a>
              <span class="show_text">
                {{hero_intro.hero_story1}}
              </span>
            </div>
            <span class="show_more">[展开+]</span>
          </div>
          <!-- 视频攻略 -->
          <div class="hero_video list_box">
            <h2 class="right_h2">视频攻略</h2>
            <div class="video_tab_box">
              <div class="video_play">
                <span>新手教学</span>
                <div>
                  <!-- 播放视频 -->
                  <object type="application/x-shockwave-flash" name="v_src" data="http://www.wanmei.com/public/swf/player_v2.swf" width="370"
                    height="205" id="v_src" style="visibility: visible;" title="Adobe Flash Player">
                    <param name="allowfullscreen" value="true">
                    <param name="wmode" value="opaque">
                    <param name="allowscriptaccess" value="always">
                    <param name="bgcolor" value="0x000000">
                    <param name="flashvars" value="__objectID=v_src&amp;__url=http://www.dota2.com.cn/hero/anti_mage/&amp;source=http://dota2.dl.wanmei.com/dota2/patch/anti_mage_basic.flv&amp;autoPlay=false&amp;startImage=http://www.dota2.com.cn/event/201401/herodata/images/video_newer.jpg&amp;configPath=http://www.wanmei.com/public/swf/player_config.xml">
                  </object>
                </div>
              </div>
              <div class="hero_text">
                <p>攻略文章</p>
                <!-- 文章 1 -->
                <div class="gl_box">
                  <p>DOTA2老玩家原创攻略高阶敌法师的成长之旅</p>
                  <a href="http://www.dota2.com.cn/raiders/step/20131028/152352.shtml">
                    <img src="http://dota2.wanmei.com/resources/jpg/140126/10251390712855123.jpg" alt="">
                    <span>
                      DOTA2里面能够更好的理解敌法师这样一位强力的英雄。众所周知，十个敌法十个刷
                    </span>
                  </a>
                </div>
                <!-- 文章 2 -->
                <div class="gl_box">
                  <p>DOTA2老玩家原创攻略高阶敌法师的成长之旅</p>
                  <a href="http://www.dota2.com.cn/raiders/step/20131028/152352.shtml">
                    <img src="http://dota2.wanmei.com/resources/jpg/140126/10251390712855123.jpg" alt="">
                    <span>
                      DOTA2里面能够更好的理解敌法师这样一位强力的英雄。众所周知，十个敌法十个刷
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- 天赋树 -->
          <div class="talent_tree">
            <h2 class="right_h2">天赋树</h2>
            <div class="tree_box">
              <ul class="talent_ul">
                <li>
                  <div class="talent-explain">{{hero_dower.dower25_part1}}</div>
                  <div class="level-external">
                    <div class="level-interior">25</div>
                  </div>
                  <div class="talent-explain">{{hero_dower.dower25_part2}}</div>
                </li>
                <li>
                  <div class="talent-explain">{{hero_dower.dower20_part1}}</div>
                  <div class="level-external">
                    <div class="level-interior">20</div>
                  </div>
                  <div class="talent-explain">{{hero_dower.dower20_part2}}</div>
                </li>
                <li>
                  <div class="talent-explain">{{hero_dower.dower15_part1}}</div>
                  <div class="level-external">
                    <div class="level-interior">15</div>
                  </div>
                  <div class="talent-explain">{{hero_dower.dower15_part2}}</div>
                </li>
                <li>
                  <div class="talent-explain">{{hero_dower.dower10_part1}}</div>
                  <div class="level-external">
                    <div class="level-interior">10</div>
                  </div>
                  <div class="talent-explain">{{hero_dower.dower10_part2}}</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 技能介绍 -->
          <div class="skill">
            <h2 class="right_h2">技能介绍</h2>
            <div class="skill_box">
              <div class="skill_title clear">
                <!-- 选择技能进行查看详情 -->
                <a class="skill_changeLf skill_change" @click="handleClickskillAdd(false)">‹</a>
                <ul>
                  <li class="skill_list skill_first" @mouseenter="getTheSkillIntro(1)" :class="{'skillchoose':theChoose==1}">
                    <img :src="hero_punctuate.skill1_sm_pic" alt=""> {{hero_skill.skill1_title}}
                  </li>
                  <li class="skill_list skill_two" style="opcity:0.5;left:148px" @mouseenter="getTheSkillIntro(2)" :class="{'skillchoose':theChoose==2}">
                    <img :src="hero_punctuate.skill2_sm_pic" alt=""> {{hero_skill.skill2_title}}
                  </li>
                  <li class="skill_list skill_thr" style="opcity:0.5;left:296px" @mouseenter="getTheSkillIntro(3)" :class="{'skillchoose':theChoose==3}">
                    <img :src="hero_punctuate.skill3_sm_pic" alt=""> {{hero_skill.skill3_title}}
                  </li>
                  <li class="skill_list skill_last" style="opcity:0.5;left:440px" @mouseenter="getTheSkillIntro(4)" :class="{'skillchoose':theChoose==4}">
                    <img :src="hero_punctuate.skill4_sm_pic" alt=""> {{hero_skill.skill4_title}}
                  </li>
                </ul>
                <a  class="skill_changeRt skill_change" @click.prevent="handleClickskillAdd(true)">›</a>
              </div>
              <!-- 技能详情 -->
              <div class="skill_detail clear">
                <div class="skill_img">
                  <img :src="theSkillIntro.skill_pic" alt="">
                </div>
                <div class="skill_info">
                  <p class="skill_intro">
                    <span>{{theSkillIntro.skill_title}}</span>
                    <br>{{theSkillIntro.skill_intro1}} </p>
                  <p class="color_green">
                    法力损毁对技能免疫单位无效。
                    <br>受到吸血光环的效果就能根据该技能造成的伤害吸血。 </p>
                  <div class="xiaohao_wrap">
                    <div class="icon_xh icon_both">
                      {{theSkillIntro.skill_spell}}
                    </div>
                    <div class="icon_lq icon_both">
                      {{theSkillIntro.skill_cooling}}
                    </div>
                  </div>
                  <!-- 需要 转换数据格式之后再 添加数据 -->
                  <ul class="skill_detl_ul">
                    <li v-for="(tmp,index) in theSkillIntro.skill_effect">
                      <span class="color_white">{{tmp}}</span>
                    </li>
                  </ul>
                  <div class="skill_v">
                    <img class="btn_skill_v" src="../../assets/img/base/btn_skill_v.png" v-if="!isShowSkillVideo" @click="changeToshowSKillVideo()">
                    <video controls="controls" preload="auto"  id="heroSkillVideo" :src="theSkillIntro.skill_video" v-if="isShowSkillVideo">
                      Your browser does not support the video tag.
                    </video>
                    <div class="skill_v_box" v-if="isShowSkillVideo">
                      <div class="skill_v_bg" id="skill_v0"></div>
                      <span class="hide_v" @click="changeToshowSKillVideo()" style="color:'red'">[收起]</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="skill_bot">
                {{theSkillIntro.skill_supplement}}
              </div>
            </div>
          </div>
          <!-- 推荐加点 -->
          <!-- 推荐加点板块也需要处理数据之后再 渲染到页面 -->
          <div class="add_point">
            <h2 class="right_h2">推荐加点</h2>
            <!-- 第一个技能加点 -->
            <div class="point_detail" v-for="(tmp,index) of thePunctuate" :key="index" >
              <!-- 技能小图片 -->
              <span class="skill_s_img" @mousemove.stop="addSkillDiv(index,$event)" @mouseleave="removeskilldiv(index,$event)">
                <img :src="tmp.pic" alt="">
              </span>
              <div class="skill_pop_box" v-if="index!=4">
                <p class="skill_pop_box_title">{{hero_skill["skill"+(index+1)+"_title"]}}</p>
                <p class="skill_pop_box_intro">{{hero_skill["skill"+(index+1)+"_intro1"]}}</p>
                <p class="skill_pop_box_green">{{hero_skill["skill"+(index+1)+"_intro2"]}}</p>
                <p class="skill_pop_box_effect" v-for="(tmp1,index1) of skill_effect[index].skill_effect" :key="index1">{{tmp1}}</p>
                <div class="xiaohao_wrap_pop_box clear">
                  <div class="icon_xh">{{hero_skill["skill"+(index+1)+"_spell"]}}</div>
                  <div class="icon_lq">{{hero_skill["skill"+(index+1)+"_cooling"]}}</div>
                </div>
                <p class="skill_pop_punctuate">{{hero_skill["skill"+(index+1)+"_supplement"]}}</p>
              </div>
              <!-- 技能加点列表 -->
              <ul class="point_ul">
                <li  v-for="(tmp1,index1) of 25" :class="{hideNum:tmp.bianhao.indexOf(''+tmp1)==-1}" :key="index1">{{tmp1}}</li>
              </ul>
            </div>
          </div>
          <!-- 装备选择 -->
          <div class="equip">
            <h2 class="right_h2">装备选择</h2>
            <div class="equip_box">
              <p>出装建议</p>
              <div class="all_rcomd clear">
                <!-- 出门装备 -->
                <div class="equip_detail">
                  <span>出门装备</span>
                  <ul class="equip_ul">
                    <li v-for="(tmp,index) of hero_equipment.equipment1" :key="index">
                      <img :src="tmp.goods_pic" v-if="tmp!=null" :alt="tmp.dname" @mousemove="addGoodsDiv(tmp.did,$event)" @mouseout="removeGoodsDiv(tmp.did,$event)">
                      <gdetail  :goodsId="tmp.did" class="goods_detail_content" :data-did="tmp.did" ></gdetail>       
                    </li>
                  </ul>
                </div>
                <!-- 游戏初期 -->
                <div class="equip_detail">
                  <span>游戏初期</span>
                  <ul class="equip_ul">
                    <li v-for="(tmp,index) of hero_equipment.equipment2" :key="index">
                      <img :src="tmp.goods_pic" :alt="tmp.dname" @mousemove="addGoodsDiv(tmp.did,$event)" @mouseout="removeGoodsDiv(tmp.did,$event)">
                      <gdetail  :goodsId="tmp.did" class="goods_detail_content" :data-did="tmp.did" ></gdetail>       
                    </li>
                  </ul>
                </div>
                <!-- 核心装备 -->
                <div class="equip_detail">
                  <span>核心装备</span>
                  <ul class="equip_ul">
                    <li v-for="(tmp,index) of hero_equipment.equipment3" :key="index">
                      <img :src="tmp.goods_pic" :alt="tmp.dname"  @mousemove="addGoodsDiv(tmp.did,$event)" @mouseout="removeGoodsDiv(tmp.did,$event)">
                      <gdetail  :goodsId="tmp.did" class="goods_detail_content" :data-did="tmp.did" ></gdetail>       
                    </li>
                  </ul>
                </div>
                <!-- 后期神装 -->
                <div class="equip_detail">
                  <span>后期神装</span>
                  <ul class="equip_ul">
                    <li v-for="(tmp,index) of hero_equipment.equipment4" :key="index">
                      <img :src="tmp.goods_pic" :alt="tmp.dname" @mousemove="addGoodsDiv(tmp.did,$event)" @mouseout="removeGoodsDiv(tmp.did,$event)">
                      <gdetail  :goodsId="tmp.did" class="goods_detail_content" :data-did="tmp.did" ></gdetail>               
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 英雄适配 -->
          <div class="adaptive">
            <h2 class="right_h2">英雄适配</h2>
            <div class="adap_box">
              <p>适合一起组队的英雄</p>
              <ul class="adap_ul">
                <!-- 适合组队的队友的英雄 -->
                <li v-for="(tmp,index) of hero_match.fit_match" :key="index" >
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid" target="_blank" class="adap_img">
                    <img :src="tmp.ss_pic" :alt="tmp.hero_cname">
                  </a>
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid" class="adap_name">
                    {{tmp.hero_cname}}
                  </a >
                </li>
              </ul>
            </div>
            <div class="adap_box">
              <p>相同使用类型的英雄</p>
              <ul class="adap_ul">
                <li v-for="(tmp,index) of hero_match.same_type" :key="index" >
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid" target="_blank" class="adap_img">
                    <img :src="tmp.ss_pic" :alt="tmp.hero_cname">
                  </a>
                  <a :href="'http://127.0.0.1:8080/#/herodetail/'+tmp.hid" class="adap_name">
                    {{tmp.hero_cname}}
                  </a >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import gdetail from "@/components/hero/goodsdetailComponent"
  
  export default {
    props:["heroId"],
    components:{
      gdetail:gdetail,
    },
    data() {
      return {
        hid:1,                 //save the hero_id
        
        hero_dower:[],            //用来保存所有的数据
        hero_equipment:{},
        hero_intro:{},
        hero_location:{},
        hero_match:{},
        hero_pic:{},
        hero_property:{},
        hero_punctuate:{},
        hero_skill:{},
        hero_data:{},


        skill_effect:[],                 //用来保存 关于技能的 影响的处理后的数据 
        isShowSkillVideo:true,
        thePunctuate:[],                 // b保存推荐加点 的数据
        theChoose:1,                  //用于保存技能介绍模块  当前选中的是第几个技能
        theSkillIntro:{}, 
        theConnectUrl1:'http://176.211.99.67:3000/',
        theConnectUrl2:'http://176.211.99.144:3000/',
        theConnectUrl3:'http://176.211.99.125:3000/', 
        theConnectUrl5:'http://176.211.99.95:3000/', 
        theConnectUrl4:'http://127.0.0.1:3000/', 
        theConnect:"http://176.211.99.51:3000/"
      }
    },
    methods:{
      getThePunctuate:function(){         //这个函数是用来得到推荐加点 这个板块的具体的数据的
        // 当前数据的结构为
        // [{pic:"",bianhao:[1,23,5....]},{},{},{}]
        let punstr = this.hero_punctuate.punctuate;
        let punarr = punstr.split("@");
        punarr.pop();
        for(let i=0;i<5;i++){
          let obj = {};
          if(i==4){
            obj.pic="../../src/assets/img/base/tree.png";
          }else{
            obj.pic = this.hero_punctuate["skill"+(i+1)+"_sm_pic"];
          }
          obj.bianhao = punarr[i].split(",");
          this.thePunctuate.push(obj);
        };
      },
      getTheSkillIntro:function(num){           //获得当前选中的技能的详细信息，用来改变 theSkillIntro 的数据
        let obj = {};
        this.theChoose = num;
        obj.skill_cooling = this.hero_skill["skill"+num+"_cooling"];
        obj.skill_intro1 = this.hero_skill["skill"+num+"_intro1"];
        obj.skill_intro2 = this.hero_skill["skill"+num+"_intro2"];
        obj.skill_pic = this.hero_skill["skill"+num+"_pic"];
        obj.skill_spell = this.hero_skill["skill"+num+"_spell"];
        obj.skill_supplement = this.hero_skill["skill"+num+"_supplement"];
        obj.skill_title = this.hero_skill["skill"+num+"_title"];
        obj.skill_effect = this.hero_skill["skill"+num+"_effect"];
        obj.skill_video = this.hero_skill["skill"+num+"_video"];
        //对effect 的数据进行处理
        
        let str = obj.skill_effect;
        let effectArr = str.split("\n");
        obj.skill_effect = effectArr;
        this.theSkillIntro = Object.assign({},obj);
        this.isShowSkillVideo=false;
      },
      getSkillEffect:function(){               //这个函数用来处理 hero_skill.skill1.effect 里面的数据
        for(let i = 0;i<4;i++){
          let obj = {};
          obj.skill_effect = this.hero_skill["skill"+(i+1)+"_effect"];
          let str = obj.skill_effect;
          let effectArr = str.split("\n");
          obj.skill_effect = effectArr;
          this.skill_effect.push(obj);
        }
        console.log(this.skill_effect);
      },
      handleClickskillAdd:function(type){              //技能条框 点击上一个 和下一个
        if(type){
          this.theChoose = (this.theChoose+1)==5?1:(this.theChoose+1);
          this.getTheSkillIntro(this.theChoose);
        }else{
          this.theChoose = (this.theChoose-1)==0?4:(this.theChoose-1);
          this.getTheSkillIntro(this.theChoose);
        }
      },
      changeToshowSKillVideo:function(){                //点击切换是否显示技能video 是否显示
        if(this.isShowSkillVideo){
          this.isShowSkillVideo=false;
        }else{
          this.isShowSkillVideo=true;
        }
      },
      addPowerDiv:function(index,$event){
        let tar = event.target;
        let ele = document.getElementsByClassName("pop_box")[index];
        let eleX = tar.offsetLeft;
        let eleY = tar.offsetTop;
        // console.log(eleX);     //可以获得当前div 的定位
        // console.log(eleY);
        
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;

        ele.style.display="block";
        ele.style.left = x+2+"px";
        ele.style.top = y+2+"px";
      },
      removepop:function(index,$event){
        let ele = document.getElementsByClassName("pop_box")[index];
        ele.style.display="none";
      },
      addSkillDiv:function(index,$enevt){
        if(index==4) return;
        let ele = document.getElementsByClassName("skill_pop_box")[index];
        let tar = event.target.parentNode.parentNode.parentNode;
        // console.log(tar);
        let eleX = tar.offsetLeft;
        let eleY = tar.offsetTop;
        // console.log(eleX,eleY);
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;
        // console.log(x,y);
        ele.style.display="block";
        ele.style.left = x-eleX+"px";
        ele.style.top = y-eleY-50-(index)*50+"px";
      },
      removeskilldiv:function(index,$event){
        if(index==4) return;
        let ele = document.getElementsByClassName("skill_pop_box")[index];
        ele.style.display="none";
      },
      addGoodsDiv:function(index,$event){
        let ele = document.querySelectorAll("div[data-did='"+index+"']")[0]; //通过自定义属性取到 要出现的div
        let tar = event.target.parentNode;
        // console.log(tar);
        let eleX = tar.offsetLeft;
        let eleY = tar.offsetTop;
        // console.log(eleX,eleY);
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;
        ele.style.display="block";
        if(this.isShowSkillVideo){
          ele.style.left = (x-eleX)-1050+"px";
          ele.style.top  = y-eleY-2180+"px";
        }else{
          ele.style.left = (x-eleX)-1050+"px";
          ele.style.top  = y-eleY-1950+"px";
        }
        // console.log(x,eleX,y,eleY);
        // console.log(x-eleX);
      },
      removeGoodsDiv:function(index,$event){
        let ele = document.querySelectorAll("div[data-did='"+index+"']")[0];
        ele.style.display="none";
        // console.log("移除了")
      }
      
    },
    created:function(){
      this.theConnect = this.theConnectUrl4;
      this.hid = this.heroId;
      this.$http.get(this.theConnect+"hero/detail/"+this.hid).then((data)=>{
        console.log(data.body);
        this.hero_data = Object.assign({},data.body.heroes_data[0]);
        this.hero_dower = Object.assign({},data.body.hero_dower[0]);
        this.hero_intro = Object.assign({},data.body.hero_intro[0]);
        this.hero_location = Object.assign({},data.body.hero_location[0]);
        this.hero_pic = Object.assign({},data.body.hero_pic[0]);
        this.hero_property = Object.assign({},data.body.hero_property[0]);
        this.hero_punctuate = Object.assign({},data.body.hero_punctuate[0]);
        this.hero_skill = Object.assign({},data.body.hero_skill[0]);
        this.hero_match = Object.assign({},data.body.hero_match);
        this.hero_equipment = Object.assign({},data.body.hero_equipment);
        // console.log(this.hero_equipment.equipment1);
        this.getThePunctuate();
        this.getTheSkillIntro(1);
        this.getSkillEffect();
      })
    }
  }

</script>

<style>
  #content .bg {
    background-color: #121315;
  }
  #content .bg:before{
    content:"";
    display:table;
  }

  /* 英雄顶部信息 */

  #content .bg .bar_top {
    width: 1000px;
    /* height: 60px; */
    padding: 0 10px;
    margin: 20px auto 5px;
    overflow: hidden;
  }
  /* 英雄名片 */

  #content .bg .bar_top .top_hero_card {
    float: left;
    width: 252px;
    overflow: hidden;
    margin-left:40px;
  }

  #content .bg .bar_top .top_hero_card>div.lf {
    float: left;
    width: 98px;
    height: 54px;
    padding: 3px;
    overflow: hidden;
  }

  #content .bg .bar_top .top_hero_card>div.lf>img {
    display: inline-block;
    width: 98px;
    height: 54px;
    cursor: pointer;
  }

  #content .bg .bar_top .top_hero_card>p.lf {
    float: left;
    width: 134px;
    padding: 6px 0 0 10px;
    font: normal 14px Arial;
    color: #444445;
  }
  /* 新手推荐，热门英雄，美型英雄 */

  #content .bg .bar_top .top_hero_info {
    float: left;
    padding-left: 15px;
    border: 3px solid #27282A;
    margin-left:50px;
  }

  #content .bg .bar_top .top_hero_info>ul>li {
    display: list-item;
    height: 20px;
    line-height: 20px;
    text-align: -webkit-match-parent;
  }

  #content .bg .bar_top .top_hero_info>ul>li>span {
    color: #c0c0c0;
    font-weight: bold;
    line-height: 20px;
    font-size: 14px;
  }

  #content .bg .bar_top .top_hero_info>ul>li>a {
    line-height: 20px;
    outline: none;
    cursor: pointer;
    color: #6e6e6e;
    font-size: 12px;
    text-decoration: none;
  }
  #content .bg .bar_top .top_hero_info>ul>li>a:hover{
    color:#c0c0c0;

  }
  /* 右边搜索/收藏等 标签 */

  #content .bg .bar_top .top_hero_search {
    overflow: hidden;
    float: right;
    padding-top: 10px;
    margin-right:20px;
  }

  #content .bg .bar_top .top_hero_search>a {
    text-decoration: none;
    outline: none;
    color: inherit;
    height: 23px;
    line-height: 23px;
    border: 3px solid #27292b;
    cursor: pointer;
    width: 115px;
    text-align: center;
    overflow: hidden;
    display:inline-block;
    background:url(../../assets/img/base/btn_shoucang.png)
  }
  #content .bg .bar_top .top_hero_search>a:hover{
    border-color:#501e19;
  }
  /* 英雄详情 */

  #content .hero_detail {
    width: 982px;
    margin: 0px auto 0;
    padding: 0 10px 50px;
    overflow: hidden;
  }
  /* 英雄详情左边 */

  #content .hero_detail .detail_left {
    float: left;
    width: 298px;
  }
  /* 英雄资料 */

  #content .hero_detail .detail_left .hero_info {
    width: 100%;
  }
  /* 1、英雄名片 */

  #content .hero_detail .detail_left .hero_info .hero_card {
    width: 298px;
    padding: 20px 0;
    background: url('../../assets/img/base/info_bg.png') center top no-repeat #501e19;
  }

  #content .hero_detail .detail_left .hero_info .hero_card>img {
    display: block;
    width: 235px;
    height: 272px;
    margin: 0 auto;
    padding: 5px;
    border: 1px solid #2b100d;
  }

  #content .hero_detail .detail_left .hero_info .hero_name {
    text-align: center;
    height: 40px;
    margin-top: 15px;
    font: bold 24px/40px "微软雅黑";
    color: #c0c0c0;
    background-color: #501E19;
  }
  #content .hero_detail .detail_left .hero_info .hero_name>img{
    position: relative;
    top:7px;
    left:-7px;
  }
  #content .hero_detail .detail_left .hero_info ul.detail_list {
    width: 258px;
    margin: 0 auto;
    padding-top: 15px;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li {
    width: 218px;
    padding: 8px 20px;
    margin-top: 2px;
    display: inline-block;
    background-color: #280f0c;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li>span {
    float: left;
    width: 90px;
    line-height: 18px;
    color: #c0c0c0;
    text-align: right;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li>p {
    float: left;
    width: 120px;
    line-height: 18px;
    color: #c7c7c7;
    font-size: 12px;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li>p.zhengying_p {
    padding-top: 7px;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li>p>span {
    margin: 0;
    padding: 0;
    color: #6E6E6E;
    line-height: 18px;
  }

  #content .hero_detail .detail_left .hero_info ul.detail_list>li>p>img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  /* 2、英雄属性 */

  #content .hero_detail .detail_left .hero_info .hero_attr {
    width: 298px;
    padding-bottom: 15px;
    background-color: #0f0f0f;
  }

  h2.til_name {
    text-align: center;
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box {
    width: 270px;
    height: 165px;
    margin: 0 auto;
    padding-top: 15px;
    background-color: #141516;
    border: 1px solid #1b1d1e;
  }
  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box .pop_box{
    position: absolute;
    width: 250px;
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
  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box .pop_box .pop_property_t{
    font-size:20px;
    font-weight:bold;
    line-height: 40px;
    border-bottom:1px solid #888;
  }
  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box .pop_box .pop_property_cont{
    margin-top:10px;
  }
  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box .pop_box .pop_property_cont span{
    color:#6fe771;
  }
  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li {
    float: left;
    width: 90px;
    height: 85px;
    text-align: center;
    font: bold 12px/22px "宋体";
    color: #6e6e6e;
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh_att {
    width: 44px;
    height: 44px;
    margin: 0 auto;
    background-image: url(../../assets/img/base/pro.png);
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh2 {
    background-position: -44px -44px;
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh3 {
    background-position: 0px -88px;
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh4,
  .bwh5,
  .bwh6 {
    width: 54px;
    height: 39px;
    margin: 0 auto;
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh4 {
    background: url("../../assets/img/base/bwh4.png")
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh5 {
    background: url("../../assets/img/base/bwh5.png")
  }

  #content .hero_detail .detail_left .hero_info .hero_attr .bwh_box>li>.bwh6 {
    background: url("../../assets/img/base/bwh6.png")
  }
  /* 3、英雄等级 */

  #content .hero_detail .detail_left .hero_info .hero_level {
    width: 100%;
  }

  #content .hero_detail .detail_left .hero_info .area_box {
    width: 232px;
    margin: 20px auto 0;
    padding: 5px 20px 10px;
    background-color: #141516;
    font-size: 12px;
  }

  #content .hero_detail .detail_left .hero_info .area_box p.area_box_one>span {
    color: #6e6e6e;
  }

  #content .hero_detail .detail_left .hero_info .area_box p.area_box_one>span>span {
    color: #ab4d3a;
  }

  #content .hero_detail .detail_left .hero_info .area_box p.area_box_two>span {
    color: #ab4d3a;
  }
  /* 英雄荣耀 */

  #content .hero_detail .detail_left .hero_info .hero_honor {
    width: 298px;
    margin-top: 15px;
    padding-bottom: 7px;
    background-color: #0f0f0f;
  }

  #content .hero_detail .detail_left .hero_info .hero_honor>p {
    margin: 10px 0;
    display: block;
  }

  #content .hero_detail .detail_left .hero_info .hero_honor>p>img {
    width: 30px;
    height: 23px;
  }

  #content .hero_detail .detail_left .hero_info .hero_honor>p>span {
    line-height: 18px;
    vertical-align: top;
  }
  /* 英雄详情右边 */

  #content .hero_detail .detail_right {
    float: right;
    width: 660px;
  }

  h2.right_h2 {
    width: 664px;
    height: 45px;
    margin-top: 25px;
    font: bold 24px/45px "微软雅黑";
    color: #c0c0c0;
    background-color: #0a0a0a;
    border-bottom: 5px solid #451d19;
    text-indent: 10px;
  }
  /* 英雄背景 */

  #content .hero_detail .detail_right .storyBg {
    width: 100%;
    height: 150px;
  }

  #content .hero_detail .detail_right .storyBg .story_box {
    height: 120px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .storyBg .story_box>a {
    position: relative;
    float: left;
    width: 180px;
    height: 104px;
    padding: 3px;
    margin: 0 10px 5px 0;
    background-color: #1f1f1f;
    border: 1px solid #000000;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .storyBg .story_box>a>.story_img_s {
    width: 180px;
    height: 104px
  }

  #content .hero_detail .detail_right .storyBg .story_box>a>.story_add {
    position: absolute;
    width: 15px;
    height: 16px;
    right: 5px;
    bottom: 5px;
  }

  #content .hero_detail .detail_right .storyBg .show_text {
    overflow: hidden;
    height: 110px;
    width: 450px;
    display: inline-block;
    float: right;
    color:#6e6e6e;
  }

  #content .hero_detail .detail_right .storyBg .show_more {
    color: #83351D;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    right: 0px;
    text-align: right;
    left: 620px;
  }
  /* 视频教学 */

  #content .hero_detail .detail_right .hero_video {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box {
    width: 664px;
    margin-top: 20px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .video_play {
    float: left;
    width: 378px;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .video_play>span {
    float: left;
    width: 100px;
    height: 30px;
    background-color: #1f2021;
    border: 1px solid #141516;
    border-bottom: 1px solid #0e0f0f;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color:#9a8d8c;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text {
    width: 270px;
    float: right;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text>p {
    height: 31px;
    text-indent: 10px;
    color: #8b3425;
    font: normal 14px/31px "微软雅黑";
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text .gl_box {
    width: 241px;
    height: 77px;
    padding: 10px;
    margin-bottom: 2px;
    border: 4px solid #0c0c0c;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text .gl_box>p {
    width: 241px;
    height: 18px;
    font: bold 12px/18px "宋体";
    color: #c0c0c0;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text .gl_box>a {
    width: 241px;
    padding-top: 5px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .hero_video .video_tab_box .hero_text .gl_box>a>span {
    float: right;
    width: 140px;
    height: 54px;
    line-height: 18px;
    overflow: hidden;
    color:#6e6e6e;
  }
  /* 天赋树 */

  #content .hero_detail .detail_right .talent_tree {
    width: 665px;
    height: 300px;
  }

  #content .hero_detail .detail_right .talent_tree .tree_box {
    padding: 10px 13px 10px;
  }

  #content .hero_detail .detail_right .talent_tree .tree_box ul.talent_ul {
    padding: 10px 13px 10px;
  }

  #content .hero_detail .detail_right .talent_tree .tree_box ul.talent_ul>li {
    float: left;
    display: inline;
    width: 624px;
    margin: 0 0 10px 5px;
    height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, .5);
  }

  #content .hero_detail .detail_right .talent_tree .tree_box ul.talent_ul>li>.talent-explain {
    color: #c0c0c0;
    font-size: 14px;
    font-family: "微软雅黑", "宋体", Arial, Helvetica, sans-serif;
    width: 282px;
    height: 48px;
    float: left;
    line-height: 48px;
  }

  #content .hero_detail .detail_right .talent_tree .tree_box ul.talent_ul>li>.level-external {
    width: 46px;
    height: 46px;
    border-radius: 24px;
    border: 2px solid #000;
    float: left;
  }

  #content .hero_detail .detail_right .talent_tree .tree_box ul.talent_ul>li>.level-external>.level-interior {
    width: 42px;
    height: 42px;
    border-radius: 22px;
    line-height: 44px;
    background-color: #000;
    color: #e7d291;
    font-size: 18px;
    text-shadow: 0 0 5px #fd6a29, 0 0 5px #fd6a29;
    border: 2px solid #2c2f33;
    font-family: helvetica, arial, sans-serif;
  }
  /* 技能介绍 */

  #content .hero_detail .detail_right .skill {
    width: 644px;
    padding: 10px;
    background-color: #0f0f0f;
  }

  #content .hero_detail .detail_right .skill .skill_box {
    width: 100%;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title {
    position: relative;
    width: 644px;
    height: 36px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>a.skill_change {
    position: absolute;
    width: 23px;
    height: 36px;
    top: 0;
    cursor: pointer;
    color: #5B5C5C;
    font-size: 29px;
    background: #141516;
    text-align: center;
    line-height: 36px;
    border: 1px solid #202122;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>a.skill_changeLf {
    left: 0;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>a.skill_changeRt {
    right: 0;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul {
    width: 592px;
    position: absolute;
    height: 36px;
    left: 28px;
    top: 0;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul>li.skill_list {
    position: absolute;
    width: 146px;
    height: 30px;
    padding: 2px 0;
    top: 0;
    font: normal 14px/30px "微软雅黑";
    cursor: pointer;
    color: #6e6e6e;
    background-color: #141516;
    border: 1px solid #202122;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul>li{
    color: #c0c0c0;
    opacity: 0.9;
    left: 0px;
  }
  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul>li.skillchoose{
    background-color: #501e19;
    border: 1px solid #60241e;
  }
  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul>li:hover {
    /* 鼠标移入技能列表时 改变样式 */
    color: #c0c0c0;
    background-color: #501e19;
    border: 1px solid #60241e;
    opacity: 0.9;
    left: 0px;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_title>ul>li.skill_list>img {
    float: left;
    width: 28px;
    height: 28px;
    margin: 0 10px;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail {
    /* 技能详情 */
    width: 600px;
    padding-bottom: 35px;
    overflow: hidden;
    color:#6e6e6e;
    margin-top:15px;
    margin-left:30px;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_img {
    float: left;
    display: inline-block;
    width: 90px;
    height: 90px;
  }
  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_img>img{
    width:100%;
    height:100%;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info {
    float: right;
    width: 492px;
    display: inline-block;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_intro {
    padding-bottom: 10px;
    line-height: 20px;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_intro>span {
    font: bold 20px/36px "微软雅黑";
    color: #c0c0c0;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .color_green {
    color: #6fe771;
    font-weight: bold;
    line-height: 20px;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .xiaohao_wrap {
    height: 24px;
    padding: 15px 0;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .xiaohao_wrap>.icon_xh {
    background: url('../../assets/img/base/icon_xiaohao.png') no-repeat;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .xiaohao_wrap>.icon_lq {
    background: url('../../assets/img/base/icon_lengque.png') no-repeat;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .xiaohao_wrap>.icon_both {
    float: left;
    width: 210px;
    height: 24px;
    padding-left: 30px;
    line-height: 24px;
    display: inline-block;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_detl_ul {
    width: 492px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_detl_ul>li {
    float: left;
    width: 245px;
    height: 20px;
    font-size: 12px;
    overflow:hidden;        
		text-overflow:ellipsis;  
		white-space:nowrap;  
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_detl_ul>li>.color_white {
    color: #c0c0c0;
  }

  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_v {
    margin: 5px 0;
  }
  #content .hero_detail .detail_right .skill .skill_box .skill_detail .skill_info .skill_v #heroSkillVideo{
    width:454px;
    height:256px;
  }
  #content .hero_detail .detail_right .skill .skill_box .skill_bot {
    height: 32px;
    line-height: 32px;
    background-color: #1a1b1c;
    text-align: center;
    overflow: hidden;
    color:#6e6e6e;
  }
  /* 推荐加点 */

  #content .hero_detail .detail_right .add_point {
    position: relative;
    width: 638px;
    padding: 10px 13px 30px;
    background-color: #0f0f0f;
  }

  #content .hero_detail .detail_right .add_point .point_detail {
    width: 644px;
    height: 38px;
    margin-top: 5px;
    position: relative;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box{
    position: absolute;
    width:380px;
    padding: 10px 15px 20px;
    background-color: #1e1e1d;
    border: 3px solid #000000;
    box-shadow: 3px 3px 3px #666;
    color: #c0c0c0;
    overflow: hidden;
    z-index: 2;
    left:10px;
    right:10px;
    text-align: left;
    display: none;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .skill_pop_box_title{
    font-size:20px;
    font-weight:700;
    line-height:40px;
    border-bottom: 1px solid #666;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box p{
    font-size:14px;
    line-height:24px;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .skill_pop_box_intro{
    font-weight:900;

  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .skill_pop_box_green{
    color:#6fe771;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .skill_pop_box_effect{
    color:#7a7a7a;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .xiaohao_wrap_pop_box .icon_xh{
    height:30px;
    background: url('../../assets/img/base/icon_xiaohao.png') no-repeat;
    padding-left:30px;
    line-height: 30px;
    font-size:12px;
    float:left;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .xiaohao_wrap_pop_box .icon_lq{
    height:30px;
    background: url('../../assets/img/base/icon_lengque.png') no-repeat;
    padding-left:30px;
    line-height: 30px;
    font-size:12px;
    float:left;
    margin-left:50px;
  }
  #content .hero_detail .detail_right .add_point .point_detail .skill_pop_box .skill_pop_punctuate{
    margin-top:10px;
    color:#c0c0c0;
  }

  #content .hero_detail .detail_right .add_point .point_detail span.skill_s_img {
    float: left;
    width: 38px;
    height: 38px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .add_point .point_detail span.skill_s_img>img {
    width: 100%;
    height: 100%;
  }
  #content .hero_detail .detail_right .add_point .point_detail:last-child span.skill_s_img>img{
    width:100%;
    height:200%;
  }
  #content .hero_detail .detail_right .add_point .point_detail:last-child span.skill_s_img>img:hover{
    position: relative;
    top:-100%;
  }
  #content .hero_detail .detail_right .add_point .point_detail ul.point_ul {
    float: left;
    width: 600px;
    height: 32px;
    padding: 4px 0 0 6px;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .add_point .point_detail ul.point_ul>li {
    border: 1px solid #451E19;
    float: left;
    display: inline;
    width: 21px;
    height: 30px;
    margin-right: 1px;
    text-align: center;
    line-height: 30px;
    color: #A7A8AA;
  }
  #content .hero_detail .detail_right .add_point .point_detail ul.point_ul>li.hideNum{
    opacity: 0;
  }
  /* 装备选择 */

  #content .hero_detail .detail_right .equip {
    width: 638px;
    padding: 10px 13px 30px;
    background-color: #0f0f0f;
  }

  #content .hero_detail .detail_right .equip .equip_box {
    width: 100%;
    position: relative;
  }

  #content .hero_detail .detail_right .equip .equip_box>p {
    height: 26px;
    color: #8b3425;
    text-indent: 10px;
    display: inline-block;
    font: normal 14px/26px "微软雅黑";
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd {
    width: 634px;
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd>.equip_detail {
    float:left;
    display:inline-block;
    width: 305px;
    height: 87px;
    margin: 10px 5px 0;
    background-color: #141516;
    border: 1px solid #1b1d1e;
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd>.equip_detail>span {
    float: left;
    width: 100px;
    height: 87px;
    font: bold 14px/86px "微软雅黑";
    background-color: #0a0a0b;
    text-align: center;
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd>.equip_detail>ul.equip_ul {
    float: left;
    width: 195px;
    height: 77px;
    padding: 5px;
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd>.equip_detail>ul.equip_ul>li {
    float: left;
    display: inline;
    width: 43px;
    height: 32px;
    margin: 5px 2px 0;
    position:relative;
  }

  #content .hero_detail .detail_right .equip .equip_box>.all_rcomd>.equip_detail>ul.equip_ul>li>img {
    display: block;
    width: 43px;
    height: 32px;
  }
  /* 英雄适配 */

  #content .hero_detail .detail_right .adaptive {
    width: 638px;
    padding: 10px 13px 30px;
    background-color: #0f0f0f;
  }

  #content .hero_detail .detail_right .adaptive .adap_box {
    width: 100%;
    position: relative;
  }

  #content .hero_detail .detail_right .adaptive .adap_box>p {
    height: 26px;
    color: #8b3425;
    text-indent: 10px;
    font: normal 14px/26px "微软雅黑";
  }

  #content .hero_detail .detail_right .adaptive .adap_box>ul.adap_ul {
    width: 608px;
    margin: 10px auto 0;
    padding: 25px 10px 5px;
    background-color: #141516;
    border: 1px solid #1b1d1e;
    overflow: hidden;
  }

  #content .hero_detail .detail_right .adaptive .adap_box>ul.adap_ul>li {
    float: left;
    display: inline;
    width: 133px;
    margin: 0 9px;
    height: 116px;
    text-align: center;
  }

  #content .hero_detail .detail_right .adaptive .adap_box>ul.adap_ul>li>a.adap_img {
    display: block;
    width: 127px;
    height: 71px;
  }

  #content .hero_detail .detail_right .adaptive .adap_box>ul.adap_ul>li>a.adap_img>img {
    width: 100%;
    height: 100%;
  }

  #content .hero_detail .detail_right .adaptive .adap_box>ul.adap_ul>li>a.adap_name {
    color: #6e6e6e;
    font-size: 12px;
  }
  .hide_v{
    color:red;
    cursor: pointer;
  }

</style>
