import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../components/Home')
const Message = () => import('../components/message')
const News = () => import('../components/news')
const About = () => import('../components/About')
const Profile = () => import('../components/profile')

// 1.注入插件
Vue.use(VueRouter)

// 2.定义路由
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'message',
        component: Message
      },
      {
        path: 'news',
        component: News
      },
      {
        path: '',
        redirect: 'message'
      }
    ],
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    }
  },
  {
    path: '/profile/:id',
    component: Profile,
    meta: {
      title: '档案'
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]

// 3.创建router实例
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

// 4.导出router实例
export default router


