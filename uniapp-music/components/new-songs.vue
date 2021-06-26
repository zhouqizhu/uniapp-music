<template>
	<view>
		<view class="newSongs" v-for="(item,index) in newSongs" :keys="index" @click="playsong(item.id)">
			<image class="songPic" :src="item.picUrl"></image>
			<view class="songName">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"new-songs",
		props:['newSongs'],
		data() {
			return {
			};
		},
		methods:{
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
	.newSongs{
		display: inline-block;
		margin: 15rpx 15rpx;
		width: 750rpx;
		height: 200rpx;
		.songPic{
			float: left;
			width: 200rpx;
			height: 200rpx;
		}
		.songName{
			float: left;
			margin: -100rpx 250rpx;
			width: 300rpx;
			height: 200rpx;
		}
	}
</style>
