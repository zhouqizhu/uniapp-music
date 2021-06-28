<script>
	import {mapMutations} from 'vuex'
	export default {
		methods:{
			// 对全局方法login进行监控
			...mapMutations(['login'])
		},
		onLaunch: function() {
			// 获取同步获取当前storage的相关信息
			let userInfo = uni.getStorageInfoSync('userInfo')||''
			if(userInfo.id){
				// 更新登陆状态
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.login(res.data)
					}
				})
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
