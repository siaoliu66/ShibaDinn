// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap"
import './bus'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading',Loading)



//vue-json-excel
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import currencyFilter from './filters/currency'
Vue.filter('currency', currencyFilter )

import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


//驗證
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
//自訂規則 
extend('cellphone', value => {
  var regex = /^09\d{8}$/
  if (regex.test(value)) {
    return true;
  }
  return  '手機格式不正確!!'
});
extend('date', value => {
  var regex = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/
  if (regex.test(value)) {
    return true;
  }
  return  '日期格式不正確!!'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          next()
        }else{
          next({path:'/login'});
        }
    })
  }else{
    next()
  }
})

//alert套件
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);