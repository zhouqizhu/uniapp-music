<template>
	<view style="height: 150rpx;">
		<scroll-view class="recommedVideo" v-for="item in allMv" :keys="item.artistId" style="height: 200%;overflow:hidden;white-space:nowrap;">
			<image :src="item.cover"></image>
			<view class="recommedVideoName">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"MV",
		props:['allMv'],
		data() {
			return {
				
			};
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	scroll-view{
			height: 100%;
			white-space: nowrap;
		}
	.recommedVideo{
		margin: 15rpx 18rpx;
		width: 45%;
		height: 25%;
		display: inline-block;
		// flex-wrap: nowrap;
		// float: left;
		// justify-content: space-around;
		image{
			width: 95%;
			height: 75%;
		}
		.recommedVideoName{
			font-size: 35rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: center;
		}
	}
</style>
