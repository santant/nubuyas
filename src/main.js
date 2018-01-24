import Vue from 'vue'
import App from './App'

//引入ajax注入原型
import Axios from 'axios'
import VueAxios from 'vue-axios'

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//移动端tap事件
import vueTap from 'v-tap';
//引入vue指令暴露出去的全局指令
import {DomHeight} from './directive.js';

//引入路由
import router from '@/router'
//引入vuex
import store from '@/store'
//引入一个自定义的util函数，里面定义的是全局公用的方法
import utils from './components/component/util';

import loading from './components/component/edit'
import editimg from './components/component/editImg';
import MaxImg from './components/component/maxImg';

Vue.use(vueTap)
Vue.use(MintUI);
Vue.use(utils);
Vue.use(loading);
Vue.use(editimg);
Vue.use(MaxImg);
//引入ajax
Vue.use(VueAxios,Axios)
//线上环境的时候隐藏一些打印的东西
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
