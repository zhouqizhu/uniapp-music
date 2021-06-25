<template>
	<view class="rewardtoplist">
		<view class="rewardtop">
			赞赏榜
			<view class="rewardlists" v-for="(item,index) in rewardToplist" :keys='index'>
				<view class="rewardname">
					{{index+1}}.{{item.name}}
				</view>
			</view>
		</view>
		<image src="https://p2.music.126.net/oQAa0mlQw5LKA-Z54IOp3g==/19008357021060580.jpg" mode=""></image>
	</view>
</template>

<script>
	export default {
		name:"rewardToplist",
		props:['rewardToplist'],
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
	.rewardtoplist{
		background-color: #F3F3F3;
		border-radius: 10rpx;
		display: inline-block;
		width: 750rpx;
		margin: 3rpx 1rpx;
		height: 220rpx;
		.rewardtop{
			width: 55%;
			float: left;
			font-size: 50rpx;
			margin: 0rpx 20rpx;
			.rewardlists{
				margin: 0rpx 30rpx;
				font-size: 30rpx;
				// width: 375rpx;
				// height: 100rpx;
				.rewardname{
					font-size: 3rpx;
					// display: inline-block;
					// width: 375rpx;
					// height: 60rpx;
				}
			}
		}
		image{
			border-radius: 20rpx;
			margin: 10rpx 10rpx;
			float: right;
			width: 35%;
			height: 90%;
		}
	}
</style>
