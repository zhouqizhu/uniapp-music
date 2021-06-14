<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			音乐
		</view>
		<!-- 搜索框 -->
		<view class="search-box">
			<input class="search-input-box" value="搜索歌曲" type="text" confirm-type="search" @focus="tosearch"/>
		</view>
		<!-- 热门歌单推荐 -->
		<view>
			<view class="">热门歌单</view>
			<view class="">更多>></view>
			<hot-playlists :playLists="playLists"  class="hotPlayList"></hot-playlists>
		</view>
		<!-- 热门歌曲推荐 -->
		<view class="">
			
		</view>
		<!-- 各类榜单 -->
		<view class="">
			
		</view>
	</view>
</template>

<script>
	import hotplaylists from '../../components/hot-playlists'
	export default {
		data() {
			return {
				playLists:[]
			}
		},
		components:{
			"hot-playlists":hotplaylists
			},
		onLoad(){
			this.getHotPlayLists()
		},
		methods:{
			async getHotPlayLists(){
				const res = await this.$myRequest({
					url:'/top/playlist/highquality'
				})
				this.playLists = res.data.playlists
				console.log(this.playLists)
			},
			tosearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			}
		}
	}
</script>

<style>
	.title{
		text-align: center;
		font-size: 45rpx;
		margin: 15px 10px;
		letter-spacing: 20px;
		font-family: "Copperplate", "Courier New", Fantasy;
	}
	.search-box {
		width:90%;
		margin: 0 0 0 2%;
		background-color:rgb(242,242,242);
		padding:15upx 2.5%;display:flex;
		position:sticky;
		top: 0;
		justify-content: center;
		border-radius: 60rpx;
		}
	.search-input-box{
		width: 100%;
		text-align: center;
	}
	.hotPlayList{
		float: left;
		height: 125px;
	}
</style>
