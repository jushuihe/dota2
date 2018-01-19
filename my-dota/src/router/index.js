import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Heroes from '@/components/hero/heroes'
import NewsDetail from '@/components/news/newsDetail'
import News from '@/components/news/newsIndex'
import heroesComponent1 from '@/components/hero/heroesComponent.vue'
import heroesComponent2 from '@/components/hero/heroesComponent2.vue'
import heroesComponent3 from '@/components/hero/heroesComponent3.vue'

import HeroDetail from '@/components/hero/herodetail'
import Main from '@/components/main/main'
import Login from '@/components/login'
import Register from '@/components/register'
import Index from '@/components/index'
import CallCenter from '@/components/callCenter/callCenter'
// import UserCenter from '@/components/userCenter/userCenter'
import NotFound from '@/components/utility/notFound'
import Service from "@/components/service/serviceMain"

//金金的任务  新手向导 和 个人中心
import Guide from "@/components/guide/guide-content"
import PersonalMain from '@/components/personal/personal-main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/heroes',
      component: Heroes,
      children:[
        {path:'/heroes/all',component:heroesComponent1},
        {path:'/heroes/rank',component:heroesComponent2},
        {path:'/heroes/battle',component:heroesComponent3},
      ]
    },
    {
      path: '/herodetail/',
      component: HeroDetail
    },
    {
      path: '/herodetail/:heroId',
      component: HeroDetail
    },
    {
      path: '/news',
      component: News,
    },
    {
      path : '/news/detail/:newsId',
      component: NewsDetail
    },
    {
      path: '/news/:style/:pno',
      component:News
    },
    {
      path: '/main',
      component: Main
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/register',
      component: Register
    },
    {
      path:'/callcenter',
      component: CallCenter
    },
    {
      path:'/personal',
      component:PersonalMain,
    },
    {
      path:'/guide',
      component:Guide
    },
    {
      path:'/service',
      component:Service
    },
    {
      path:'*',
      component: NotFound
    }

  ]
})
