<template>
	<view class="artisttoplist">
		<view class="artisttop">
			歌手榜
			<view class="artistlists" v-for="(item,index) in artistToplist" :keys='index'>
				<view class="">
					{{index+1}}.{{item.first}}
				</view>
			</view>
		</view>
		<image src="https://p1.music.126.net/MJdmNzZwTCz0b4IpHJV6Wg==/109951162865487429.jpg" mode=""></image>
	</view>
</template>

<script>
	export default {
		name:"artistToplist",
		props:['artistToplist'],
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
	.artisttoplist{
		background-color: #F3F3F3;
		border-radius: 10rpx;
		display: inline-block;
		margin: 3rpx 1rpx;
		width: 750rpx;
		height: 220rpx;
		.artisttop{
			width: 55%;
			float: left;
			font-size: 50rpx;
			margin: 0 20rpx;
		}
		.artistlists{
			font-size: 30rpx;
			margin: 0 30rpx;
		}
	}
	image{
		border-radius: 20rpx;
		margin: 10rpx 10rpx;
		float: right;
		width: 35%;
		height: 90%;
	}
</style>
