<template>
	<view>
		<view class="playLists" v-for="item in playLists" :key="item.id">
			<view>
				<image :src="item.coverImgUrl"></image>
			</view>
			<view class="playListsName">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-playlists",
		props:['playLists'],
		data() {
			return {
			};
		},

	}
</script>

<style lang="scss">
.playLists{
	margin: 15px 10px;
	width: 345rpx;
	height: 306rpx;
	overflow: hidden;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	image{
		width: 330px;
		height: 250px;
	}
	.playListsName{
		width: 50%;
	}
}
</style>
