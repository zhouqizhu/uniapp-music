<template>
	<view>
		<scroll-view class="recommedVideo" v-for="item in recommedvideo" :keys="item.artistId" >
			<image :src="item.cover" @click="toplay(item.id)"></image>
			<view class="recommedVideoName">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"recommed-video",
		props:['recommedvideo'],
		data() {
			return {
				
			};
		},
		methods:{
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
	.recommedVideo{
		margin: 1rpx 15rpx;
		width: 345rpx;
		height: 300rpx;
		display: inline-block;
		// flex-wrap: nowrap;
		// float: left;
		// justify-content: space-around;
		image{
			width: 300rpx;
			height:235rpx;
		}
		.recommedVideoName{
			height: 27rpx;
			font-size: 25rpx;
			// white-space: wrap;
			// // text-overflow: ellipsis;
			text-align: center;
		}
	}
</style>
