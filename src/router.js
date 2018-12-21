import Vue from 'vue'
import Router from 'vue-router'
import Top from './components/Header.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      // 测试
      path: '/test',
      name: 'test',
      component: () => import('./views/Test.vue')
    },
    {
      // 欢迎页
      path: '/welcome',
      name: 'welcome',
      component: () => import('./views/Welcome.vue')
    },
    {
      // 注册
      path: '/register',
      name: 'register',
      meta:{
        test:'注册'
      },
      component: () => import('./views/Register.vue')
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      meta:{
        test:'ads'
      },
      component: () => import('./views/Login.vue')
    },
    {
      // 主页
      path: '/',
      meta:{
        test:'index',
      },
      component: () => import('./views/Index.vue'),
      children:[
        // 子首页
        {
          path:'',
          name:'index',
          component: () => import('./views/Index/Index.vue')
        },
        // 历史记录
        {
          path: 'history',
          name: 'history',
          component: () => import('./views/Index/History.vue')
        },
        // 离线缓存
        {
          path: 'download',
          name: 'download',
          component: () => import('./views/Index/Download.vue')
        },
        // 我的收藏
        {
          path: 'collection',
          name: 'collection',
          component: () => import('./views/Index/Collection.vue')
        },
        // 直播
        {
          path: 'lb',
          name: 'live_broadcast',
          component: () => import('./views/Index/Lb.vue')
        }
      ]
    },
    {
      // 搜索页
      path: '/search/:content',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      // 个人信息页
      path: '/personal',
      name: 'personal',
      meta: {
        path:'',
      },
      component: () => import('./views/Personal.vue')
    },
    {
      // 设置
      path: '/setting',
      name: 'setting',
      meta:{
        name : '设置',
      },
      component: () => import('./views/Setting.vue')
    },  
    {
      // 二维码页
      path: '/qrcode',
      name: 'qrcode',
      component: () => import('./views/UserData/QrCode.vue')
    },
    {
      // 账号资料
      path: '/userdata',
      name: 'userdata',
      component: () => import('./views/UserData.vue'),
    },
    {
      // 修改昵称
      path: '/changename',
      name: 'changename',
      component: () => import('./views/UserData/ChangeName.vue'),
    },
    {
      // 修改个性签名
      path: '/autograph',
      name: 'autograph',
      meta: {
        title: '修改个性签名',
      },
      component: () => import('./views/UserData/Autograph.vue')
    }
  ]
})
