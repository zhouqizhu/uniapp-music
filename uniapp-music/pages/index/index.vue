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
			<view class="playliststitle">热门歌单</view>
			<view class="moreplaylists">更多>></view>
			<hot-playlists :playLists="playLists"></hot-playlists>
		</view>
		<!-- 每日推荐歌曲 -->
		<view class="">
			<view class="recommedSongs">
				每日推荐歌曲
			</view>
			<new-songs :newSongs='newSongs'></new-songs>
		</view>
		<!-- 各类榜单 -->
		<view class="toplist">
			<view class="toplisttitle">
				各类榜单
			</view>
			<artist-toplist :artistToplist='artistToplist'></artist-toplist>
			<reward-toplist :rewardToplist='rewardToplist'></reward-toplist>
		</view>
	</view>
</template>

<script>
	import hotplaylists from '../../components/hot-playlists'
	import newSongs from '../../components/new-songs.vue'
	import artistToplist from '../../components/artistToplist.vue'
	import rewardToplist from '../../components/rewardToplist.vue'
	export default {
		data() {
			return {
				playLists:[],
				newSongs:[],
				artistToplist:[],
				rewardToplist:[]
			}
		},
		components:{
			"hot-playlists":hotplaylists,
			"new-songs":newSongs,
			"artist-toplist":artistToplist,
			"reward-toplist":rewardToplist
			},
		onLoad(){
			this.getHotPlayLists()
			this.getNewSongs()
			this.toplists()
		},
		methods:{
			async getHotPlayLists(){
				const res = await this.$myRequest({
					url:'/top/playlist/highquality?limit=8'
				})
				this.playLists = res.data.playlists
				console.log(this.playLists)
			},
			async getNewSongs(){
				const res = await this.$myRequest({
					url:'/personalized/newsong?limit=5'
				})
				this.newSongs = res.data.result
				console.log(res.data.result)
			},
			tosearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			async toplists(){
				const res = await this.$myRequest({
					url:'/toplist/detail'
				})
				this.artistToplist = res.data.artistToplist.artists
				this.rewardToplist = res.data.rewardToplist.songs
				console.log(res.data)
			}
		}
	}
</script>

<style>
	.playliststitle{
		font-weight: bolder;
		float: left;
		margin: 20rpx 10rpx;
		width: 150rpx;
	}
	.moreplaylists{
		font-weight: bolder;
		float: right;
		margin: 20rpx 10rpx;
		width: 120rpx;
	}
	.title{
		font-weight: bolder;
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
		border-radius: 60rpx;
		}
	.search-input-box{
		width: 100%;
		text-align: center;
	}
	.recommedSongs{
		margin: 15rpx 10rpx;
		font-weight: bolder;
	}
	.toplist{
	}
	.toplisttitle{
		font-weight: bolder;
	}
</style>
