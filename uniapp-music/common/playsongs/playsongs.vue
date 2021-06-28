<template>
	<view>
		<view class="songName">{{songName}}</view>
		<view class="author">{{author}}</view>
		<image class="songPic" :src="image"></image>
		<!-- 渲染出每句歌词 -->
		<view class="other-big" :style="{'top':top}">
			<view class="other" :style="{'color':index==nowlirics?'#EB4A38':'' , 'transform':'translateY('+ 3*height+ 'rpx)','font-size':index==nowlirics?'50rpx':''}"
			v-for="(item,index) in arr" :key="index" style="text-align: center;">{{item.words}}</view>
		</view>
		<!-- 播放、暂停按钮 -->
		<view class="other-flex">
			<view class="other-img">
				<image src="../../static/10qiehuanqizuo.png" @tap="lastsong"></image>
				<image @tap="playsong" src="../../static/70BasicIcons-all-64.png" v-show="playbool"></image>
				<image @tap="playsong" src="../../static/bofang.png" v-show="!playbool"></image>
				<image src="../../static/9qiehuanqiyou.png" @tap="nextsong"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<view>
			<view style="font-size: 50rpx;margin: 20rpx 10rpx;">热门评论:</view>
			<view class="content" v-for="item in songComment" :keys="item.id">
				<image class="avatar" :src="item.user.avatarUrl" mode="avatar"></image>
				<view class="contentarea">
				<a class="nickName">{{item.user.nickname}}:</a>
				<text class="commentContent">{{item.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let mydata = ''
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				playbool:false,
				arr: "",
				nowtimes: 0,
				nowlirics: '',
				height: "",
				id:'',
				top:'',
				songName:'',
				author:'',
				image:'',
				playState:0,
				songComment:''
			}
		},
		onLoad: function(id) {
		  const eventChannel = this.getOpenerEventChannel()
		  eventChannel.emit('acceptDataFromOpenedPage', {data: 'id'});
		  eventChannel.emit('someEvent', {data: 'id'});
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  eventChannel.on('acceptDataFromOpenerPage', function(data) {
			mydata = data.data
		  })
		  this.id = mydata
		  this.getsongsUrl()
		  this.getsonglyric()
		  this.getSongComment()
		},
		destroyed: () => {
			const res = uni.navigateBack({
			})
			if(res){
				innerAudioContext.stop()
			}
		},
		methods: {
			async getsongsUrl(id){
				const res = await this.$myRequest({
					url:'/song/detail?ids='+this.id
				})
				this.songName = res.data.songs[0].name
				// this.author = res.data.songs[0].ar[0].name
				let authorarr = res.data.songs[0].ar[0]
				this.author = authorarr.name
				this.image = res.data.songs[0].al.picUrl
			},
			// 获取歌词
			async getsonglyric(id){
				var that = this
							var arr = []
				uni.request({
					url:'http://localhost:3000/lyric?id='+this.id,
					success: (tik) => {
						var left = tik.data.lrc.lyric.split("\n")
						that.lyric = tik.data.lrc.lyric

						left.forEach((val,i) => {
							var words = val.split("]") //分割歌词
							var time = words[0].slice(1,10) //选择从下标为1到下标为10的字符串
							// 向arr数组添加内容（时间和歌词）
							arr.push({
								// 歌词时间转换
								time: ((time.slice(0, 2) - 0) * 60) + (time.slice(3, 5) - 0) + ((time.slice(6, 9) - 0) / 1000), //歌词时间转换为秒
								words: words[1] ? words[1] : ""
							})
						})
						that.arr = arr
						// console.log(that.arr);
						that.maxTime = arr[arr.length - 2].time;
					}
				})
				const URL = await this.$myRequest({
					url:'/song/url?id='+this.id
				})
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true
				innerAudioContext.src = URL.data.data[0].url
				var that = this
				innerAudioContext.onTimeUpdate(function(){
					// console.log(innerAudioContext.duration,"总时间")
					// console.log(innerAudioContext.currentTime,"当前时间")
					that.nowtimes = Number(innerAudioContext.currentTime)
					var realtime =Number(innerAudioContext.currentTime)
					for(var i = 1;i<arr.length;i++){
						if(realtime < arr[i].time){
							var newi = i - 1
							that.nowlirics = newi
							that.top = (newi*-30)  +"rpx"
							var height = - newi * 30
							that.height = height
							break
						}
					}
				})
				innerAudioContext.onEnded(() => {
					innerAudioContext.play()
				})
				//监听事件
				innerAudioContext.onPlay(()=>{
					this.playState=1
				})
				innerAudioContext.onPause(()=>{
					this.playState=0
				})
				innerAudioContext.onTimeUpdate((e)=>{
					this.nowmiao = Math.floor(innerAudioContext.currentTime)
				})
				innerAudioContext.onEnded(()=>{
					innerAudioContext.onPlay()
				})
			},
			playsong(){
				if(this.playState){
					//暂停
					innerAudioContext.pause()
					this.playbool = true
				}else{
					//播放
					innerAudioContext.play()
					this.playbool = false
				}
			},
			lastsong(){},
			nextsong(){},
			async getSongComment(id){
				const res = await this.$myRequest({
					url:'/comment/hot?id='+this.id+'&type=0'
				})
				this.songComment = res.data.hotComments
				console.log(res.data.hotComments)
			}
		}
	}
</script>

<style lang="scss">
	.songName{
		display: block;
		text-align: center;
		font-weight: bolder;
		font-size: 50rpx;
	}
	.author{
		display: block;
		text-align: center;
		font-weight: bolder;
		font-size: 35rpx;
	}
	.songPic{
		display: flex;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		margin: 20rpx auto;
	}
	.other-big{
		height: 400rpx;
		width: 750rpx;
		overflow: hidden;
		overflow-y: scroll;
		line-height: 90rpx;
	}
	.other-img {
		margin: 30rpx 10rpx;
		background-color: #DBF1E1;
		width: 550rpx;
		height: 200rpx;
		border-radius: 60rpx;
		display: flex;
	}
	image{
		width: 200rpx;
		height: 200rpx;
	}
	.other-flex {
		display: flex;
		justify-content: center;
	}
	.content{
		width: 100%;
		height: 220rpx;
		border-top:1px dashed #000;
	}
	.avatar{
		float: left;
		height:80% ;
		width: 186rpx;
		margin: 22rpx 5rpx;
	}
	.contentarea{
		margin: 22rpx 5rpx;
		float: left;
		width: 73%;
		height: 80%;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.nickName{
		height: 100%;
		margin: 22rpx 10rpx;
		color:#5A73C6;
	}
	.commentContent{
	}
	a:link {color:#5A73C6;} /* 未访问的链接 */
	a:visited {color:#00FF00;} /* 已访问的链接 */
	a:hover {color:#FF00FF;} /* 鼠标划过链接 */
	a:active {color:#0000FF;} /* 已选中的链接 */
</style>
