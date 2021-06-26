import Vue from 'vue'
import App from './App'
import {myRequest} from 'utils/api.js'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
