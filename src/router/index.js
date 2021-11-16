import Vue from 'vue'
import Router from 'vue-router'
import Cal from '@/components/front/cal'
import Login from '@/components/back/login'
import dashboard from '@/components/back/dashboard'
import Product from '@/components/back/pages/products'
import Order from '@/components/back/pages/orders'
import Coupon from '@/components/back/pages/coupon'
import Menu from '@/components/front/menu'
import Productpage from '@/components/front/productpage'
import Cart from '@/components/front/cart'
import Shopping from '@/components/front/shopping'
Vue.use(Router)

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
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping,
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
        },
      ]
    },
  ]
})
