<template>
	<view>
		<view class="title">歌名</view>
		<view class="title">歌手</view>
		<view class="songMsg" v-for="item in songlists" :keys="item.id" @click="playsong(item.id)">
			<view class="songName">{{item.name}}</view>
			<view class="songAr">{{item.ar[0].name}}</view>
		</view>
	</view>
</template>

<script>
	let mydata = ''
	export default {
		data() {
			return {
				songlists:''
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
		  this.getresult()
		},
		methods: {
			async getresult(id){
				const res = await this.$myRequest({
					url:'/cloudsearch?keywords='+this.id
				})
				this.songlists = res.data.result.songs
			},
			// 跳转到播放页
			playsong(id){
				uni.navigateTo({
					url:'../../common/playsongs/playsongs',
					success:function(res){
						res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
					},
					fail() {
						console.log("跳转失败")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.title{
		float: left;
		margin: 20rpx 0rpx;
		width: 50%;
		background-color: #999;
		font-size: 50rpx;
		text-align: center;
	}
	.songMsg{
		width: 100%;
		height: 50rpx;
		margin: 10rpx auto;
		float: left;
		background-color: #f5f5f5;
	}
	.songName{
		float: left;
		margin: 10rpx 5rpx;
		width: 55%;
		font-weight: bolder;
		font-size: 10%;

	}
	.songAr{
		float: right;
		width: 40%;
		margin: 10rpx 5rpx;
		word-wrap:break-word;
		text-align: center;
	}
</style>
