import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    },
    {
    path: '/',
    component: () => import('@/views/layout/'),
    children:[
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),

      },
      {
        path:'/channel',
        name:'channel',
        component: () => import('@/views/follow/'),

      },
      {
        path:'/information',
        name:'information',
        component: () => import('@/views/information/'),
      },
    ],

    },
    {
    path: '/forum/:forumId',
    name: 'forum',
    component: () => import('@/views/forum/'),
    props: true,
    },
    {
    path: '/detail/:detailId',
    name: 'detail',
    component: () => import('@/views/detail/'),
    props:true,
    },
    {
    path: '/search/',
    name: 'search',
    component: () => import('@/views/search/'),
    },
    {
    path: '/detail/:detailId/comment/:commentId',
    name: 'comment',
    component: () => import('@/views/comment/'),
    props: true,
    },
    {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/user/'),
    props: true,
    },

]


const router = new VueRouter({
  routes,
   mode: 'hash'
  // mode: 'history'
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    if (typeof to.query._t !== "undefined") {
        next();
    } else {
        to.query._t = new Date().getTime().toString();
        next(to);
    }
});

export default router
