<template>
	<view>
		<view class="videoplay">
			<video :src="videoUrl" class="videocontent" autoplay></video>
			<view class="videomsg">{{vidoeMsg.name}}</view>
			<view class="videomsgname">作者：{{vidoeMsg.artistName}}</view>
			<view>
				<view style="margin-left: 10rpx;">
					相似视频
				</view>
				<view class="simisong" v-for="item in simimv" :key="item.id" @click="toplay(item.id)">
					<image :src="item.cover" class="simicover"></image>
					<view class="" class="simibriefDesc">{{item.briefDesc}}</view>
					<view class="" class="siminame">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let mydata = ''
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				id:'',
				videoUrl:'',
				vidoeMsg:'',
				simimv:''
			}
		},
		onLoad: function(id) {
		  const eventChannel = this.getOpenerEventChannel()
		  eventChannel.emit('acceptDataFromOpenedPage', {data: 'id'});
		  eventChannel.emit('someEvent', {data: 'id'});
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  eventChannel.on('acceptDataFromOpenerPage', function(data) {
			mydata = data.data
		  })
		  this.id = mydata
		  this.getvideourl()
		  this.getvideomsg()
		  this.relatedvideo()
		},
		methods: {
			// 获取视频播放地址
			async getvideourl(id){
				const res = await this.$myRequest({
					url:'/mv/url?id='+this.id
				})
				this.videoUrl = res.data.data.url
			},
			// 获取视频信息
			async getvideomsg(id){
				const res = await this.$myRequest({
					url:'/mv/detail?mvid='+this.id
				})
				this.vidoeMsg = res.data.data
			},
			// 相关视频
			async relatedvideo(id){
				const res = await this.$myRequest({
					url:'/simi/mv?mvid=' + this.id
				})
				this.simimv = res.data.mvs
			},
			toplay(id){
				uni.navigateTo({
					url:'../../common/recommedVideo/recommedVideo',
					success: (res) => {
						res.eventChannel.emit('acceptDataFromOpenerPage',{ data:id })
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.videocontent{
		width: 95%;
		display: block;
		margin: 10rpx auto;
	}
	.videomsg{
		display: block;
		margin: 10rpx 10rpx;
	}
	.videomsgname{
		float: left;
		width: 95%;
		margin: 10rpx 10rpx;
		font-size: 8rpx;
	}
	.simisong{
		float: left;
		width: 100%;
		height: 250rpx;
		background-color: #f5f5f5;
		margin: 10rpx 0;
	}
	.simicover{
		float: left;
		width: 250rpx;
		height: 230rpx;
		margin: 10rpx 0rpx;
	}
	.simibriefDesc{
		float: left;
		text-align: center;
		width: 300rpx;
		height: 70rpx;
		margin: 10rpx auto;
		font-weight: bolder;
	}
	.siminame{
		float: left;
		height: 80rpx;
		width: 300rpx;
		text-align: center;
		margin: 0rpx auto;
		font-size: 30rpx;
	}
</style>
