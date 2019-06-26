import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'
import { format } from 'url';
Vue.use(Router)
const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   // 在整个项目中,模块路径中的@表示的是src目录
    //   // 无论你当前模块在哪里,@都可以直接定位到src
    //   // 加载一个目录可以默认加载它的index.js index.vue index.json
    //   component: () => import('@/views/home')
    // },
    {
      // layout 显示到App根组件的路由出口
      // name: 'layout',//使用javascript命名路由导航不会渲染默认子路由
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由： https://router.vuejs.org/zh/guide/eddentials/nested-routes.html
      // 所有children 路由都显示到父路由的 router-view 中
      childern: [
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
// 全局前置守卫
// 当你访问路由界面的时候,会先进入这里
// to要去哪里的相关数据
// from来自哪里的相关数据
// next 允许通过的方法
router.beforeEach((to, from, next) => {
  // 路由导航前开启滚动条
  nprogress.start()
  // cons.t userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 非登录页面
    // 没有登录,跳转到登录页面
    if (!userInfo) {
      // 如果来自登录页的页面,是不会重新进行页面导航的,也就不会触发后面的afterEach钩子
      // 所以在这里手动结束动画,防止出现在登录页访问其他页面顶部一直loading的问题
      if (from.path === '/login') {
        nprogress.done()
      }
      next({ name: 'login' })
    } else {
      // 登录了,允许通过
      next()
    }
  } else {
    // 登录页面
    // 没有登录,允许通过
    if (!userInfo) {
      next()
    } else {
      // 登陆了,不允许通过
      // next(false) //中断当前导航
      // next（）
      // next ({ name: 'home' })
      // window.location.href = '/#/'
      next({ name: 'home' })
      window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  // 路由导航完成,结束进度条
  nprogress.done()
})

export default router
