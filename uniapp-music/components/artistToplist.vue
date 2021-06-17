<template>
	<view class="rewardtoplist">
		<view class=" rewardlist" v-for="(item,index) in artistToplist" :keys='index'>
			<view class="">
				<ol>{{item.first}}</ol>
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
	.rewardtoplist{
		display: block;
		margin: 10rpx 10rpx;
	}
	.rewardlist{
		
	}
	image{
		
	}
</style>
