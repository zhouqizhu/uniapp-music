<template>
	<view style="height: 440rpx;">
		<scroll-view scroll-x="true" @scroll="scroll" style="width: 200%;overflow:hidden;white-space:nowrap;">
			<scroll-view class="playLists" v-for="item in playLists" :key="item.id" @click="toliatsdetail(item.id)">
				<image :src="item.coverImgUrl"></image>
				<view class="playListsName">{{item.name}}</view>
			</scroll-view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"hot-playlists",
		props:['playLists'],
		data() {
			return {
				scrollTop: 0,
				old: {
				    scrollTop: 0
				}
			};
		},
		methods:{
			scroll:function(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			toliatsdetail(id){
				uni.navigateTo({
					url:'../../common/listdetail/listdetail',
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
	scroll-view{
			width: 100%;
			height: 350rpx;
			white-space: nowrap;
		}
	.playLists{
		margin: 15rpx 10rpx;
		width: 20%;
		height: 100%;
		display: inline-block;
		// flex-wrap: nowrap;
		// float: left;
		// justify-content: space-around;
		image{
			width: 95%;
			height: 85%;
		}
		.playListsName{
			font-size: 6px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

</style>
