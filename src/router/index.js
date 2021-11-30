import Vue from 'vue'
import Router from 'vue-router'
import Cal from '@/components/front/cal'
import Login from '@/components/back/login'
import dashboard from '@/components/back/dashboard'
import Editor from '@/components/back/pages/editor'
import Product from '@/components/back/pages/products'
import Order from '@/components/back/pages/orders'
import Coupon from '@/components/back/pages/coupon'
import Menu from '@/components/front/menu'
import Productpage from '@/components/front/productpage'
import Cart from '@/components/front/cart'
import Checkout from '@/components/front/checkout'
import Shopping from '@/components/front/shopping'
import SerachOrder from '@/components/front/serachOrder'
Vue.use(Router)


// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
  routes: [
    {
      path: '*',
      redirect:{
        path: '/menu',
      }
    },
    {
      path: '/cal',
      name: 'Cal',
      component: Cal,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {//產品內頁
      path: '/productpage/:product_id',
      name: 'Productpage',
      component: Productpage,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },{
      path: '/checkout/:order_id',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping,
    },    
    {
      path: '/serachOrder',
      name: 'SerachOrder',
      component: SerachOrder,
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Product,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Order,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },{
          path: 'editor/:product_id',
          name: 'Editor',
          component: Editor,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
})
