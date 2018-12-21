import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: {
        type:'done',
        color: '#f06292', // 弹框颜色
        message: '登录成功', //  弹框消息
        open: false,    // 是否弹出
        timeout: 2500 // 弹出时间
    },
  },
  mutations: {

  },
  actions: {

  }
})
