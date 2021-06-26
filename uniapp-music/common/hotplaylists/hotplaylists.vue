<template>
	<view>
		<view class="playlists" v-for="item in playLists" :key="item.id">
			<image :src="item.coverImgUrl"></image>
			<view class="playListsName">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playLists:[]
			}
		},
		onLoad() {
			this.getPlayLists()
		},
		methods: {
			async getPlayLists(){
				const res = await this.$myRequest({
					url:'/top/playlist/highquality'
				})
				this.playLists = res.data.playlists
			},
		}
	}
</script>

<style lang="scss">
	.playlists{
		display: inline-block;
		width: 355rpx;
		height: 380rpx;
		margin: 10rpx 10rpx;
	}
	image{
		width: 345rpx;
		height: 350rpx;
	}
	.playListsName{
		width: 355rpx;
		height: 30rpx;
		text-align: center;
	}
</style>
