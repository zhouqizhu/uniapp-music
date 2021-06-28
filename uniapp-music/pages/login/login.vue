<template>
	<view>
		<view style="text-align: center;font-size: 50rpx;margin: 30rpx auto;">账号密码登录</view>
		<view style="float: left;width: 25%;font-size: 40rpx;">手机号：</view>
		<input type="number" placeholder="请输入手机号" v-model="username" style="margin: 10rpx;float: left;width: 60%; border:3px solid #f5f5f5;"/>
		<view style="float: left;width: 25%;font-size: 40rpx;">密码：</view>
		<input class="" type="text" placeholder="请输入密码" v-model="password" style="margin: 10rpx;float: left;width: 60%; border:3px solid #f5f5f5;"/>
		<view  style="width: 160rpx;">忘记密码</view>
		<!-- 登录按钮 -->
		<view>
			<button class="text-white" type="primary" @click="submit" :loading="loading">{{loading?loading:'登录'}}
			</button>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				status:true,// 账号密码验证
				username:"",
				password:"",
				loading:false
			}
		},
		onLoad() {
			this.initForm()
		},
		// 在 computed 计算属性方法中使用  mapState 对全局变量进行监控，在 method中使用  mapMutations  进行全局方法监控
		computed:mapState(['forcedLogin','hasLogin']),
		methods: {
			// 初始化表单
			initForm(){
				this.username = ''
				this.password = ''
			},
			// 提交
			submit(){
				this.loading = '登录中...'
				let url = "http://localhost:3000/login/cellphone"
				let data = ""
				// 表单验证
				if(!this.status){
					if (!this.validate()) return;
				}
				if (this.status){
					// 账号密码登录
					url = '/user/login'
					data = {
						username:this.username,
						password:this.password
					}
				}
				// 提交后端
				uni.request({
					url:'http://localhost:3000/login/cellphone',
					data:{
						username:this.username,
						password:this.password
					},
					method:"POST",
					success: (res) => {
						this.$store.commit('login',res)
						uni.navigateBack({
							delta:1
						})
					}
				})
				// 登录成功处理
			}
		
		}
	}
</script>

<style>

</style>