import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import MuseUI from 'muse-ui';
import Loading from 'muse-ui-loading';  // muse-ui-load
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import 'muse-ui-message/dist/muse-ui-message.css'; // Message css
import Message from 'muse-ui-message'; // Message
import 'muse-ui/dist/muse-ui.css';
import Popup from './components/Popup.vue';  // 引入弹框组件
import Top from './components/Header.vue';  // 引入头部组件
// 引入ajax
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
Vue.use(WeVue);
Vue.use(MuseUI);
Vue.use(Loading);
Vue.use(Message);
Vue.config.productionTip = false

Vue.component('popup',Popup); // 注册弹框组件
// 注册头部组件
Vue.component('top',Top);

router.beforeEach((to,from,next)=>{
  to.meta.path = from.path
  next();
})

new Vue({
  methods: {
    open () {
      this.$alert('Hello world', 'Alert');
      this.$confirm('Hello world ?', 'Confirm');
      this.$prompt('Input Some I', 'Prompt');
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app') 

const loading = Loading({
  // ...options
});
setTimeout(() => {
  loading.close();
}, 500)