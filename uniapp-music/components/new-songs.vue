<template>
	<view>
		<view class="newSongs" v-for="(item,index) in newSongs" :keys="index">
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
			display: block;
			margin: 80rpx 220rpx;
		}
	}
</style>
