<template>
	<view class="rewardtoplist">
		<view class="">
			赞赏榜
		</view>
		<view class="" v-for="(item,index) in rewardToplist" :keys='index'>
			<view class="">
				{{item.name}}
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
		margin: 10rpx 10rpx;
		display: block;
	}
</style>
