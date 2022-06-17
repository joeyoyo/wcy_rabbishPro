import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store
Vue.config.productionTip = false

Vue.config.productionTip = false

App.mpType = 'app'

//挂在colorui的组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

const app = new Vue({
    ...App
})
app.$mount()
