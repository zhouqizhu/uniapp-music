<template>
	<view>
		<!-- 题目 -->
		<view class="title">
			<view :class="{'active':isActive==1?'active':''}" class="recommed" @click="checked(1)">
				推荐
			</view>
			<view :class="{'active':isActive==2?'active':''}" class="mv" @click="checked(2)">
				MV
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="" v-if="isActive==1">
				<recommed-video :recommedvideo="recommedvideo"></recommed-video>
			</view>
			<view class="" v-if="isActive==2">
				<hot-mv :allMv="allMv"></hot-mv>
			</view>
		</view>
	</view>
</template>

<script>
	import recommedvideo from '../../components/recommed-video.vue'
	import hotmv from '../../components/MV.vue'
	export default {
		data() {
			return {
				isActive:1,
				recommedvideo:[],
				allMv:[]
			}
		},
		components:{
			"recommed-video":recommedvideo,
			"hot-mv":hotmv
		},
		onLoad() {
			this.getvideo()
			this.getAllMv()
		},
		methods: {
			checked(type){
				this.isActive = type
			},
			async getvideo(){
				const res = await this.$myRequest({
					url:'/top/mv?limit=8'
				})
				this.recommedvideo = res.data.data
				console.log(res.data.data)
			},
			async getAllMv(){
				const res = await this.$myRequest({
					url:'/mv/all'
				})
				this.allMv = res.data.data
				console.log(res.data.data)
			}
		}
		
	}
</script>

<style lang="scss">
	.title{
		display: inline-block;
	}
	.recommed{
		margin: 10px 10px;
		float: left;
		
	}
	.mv{
		margin: 10px 10px;
		float: left;
	}
	.active{
		border-bottom: 5px groove #22BE78;text-decoration:line
	}
</style>
