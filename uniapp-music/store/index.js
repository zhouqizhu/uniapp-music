import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		loginStatus:false,
		user:{
		}

	},
	mutations:{
		// 登录
		login(state,user){
			// 更改state中的变量要在这里更改。
			state.loginStatus = true
			state.user = user
			// 永久存储
			uni.setStorageSync('user',JSON.stringify(user));
		},
		
		// 初始化用户登录状态
		initUser(state){
			let user = uni.getStorageSync('user');
			if (user){
				state.user = JSON.parse(user)
				state.loginStatus = true
			}
		}	
	}
})