<template>
	<view>
		<view class="">
			<view class="songName">{{songName}}</view>
			<view class="author">{{author}}</view>
			<image :src="image"></image>
		<!-- 渲染出每句歌词 -->
			<view class="other-big" :style="{'top':top}">
				<view class="other" :style="{'color':index==nowlirics?'#EB4A38':'' , 'transform':'translateY('+ height+ 'rpx)'}"
				v-for="(item,index) in arr" :key="index" style="text-align: center;">
					{{item.words}}
				</view>
			</view>
					<!-- 播放、暂停按钮 -->
			<view class="other-flex">
				<view class="other-img">
					<image @tap="playsong" src="../../static/70BasicIcons-all-64.png" mode="" v-show="playbool"></image>
					<image @tap="playsong" src="../../static/bofang.png" mode="" v-show="!playbool"></image>
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
				top: '1rpx',
				height: "",
				id:'',
				playsongs:[],
				songName:'',
				author:'',
				image:'',
				musicUrl:'',
				playState:0,
			}
		},
		onLoad: function(id) {
		  const eventChannel = this.getOpenerEventChannel()
		  eventChannel.emit('acceptDataFromOpenedPage', {data: 'id'});
		  eventChannel.emit('someEvent', {data: 'id'});
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  eventChannel.on('acceptDataFromOpenerPage', function(data) {
			console.log(data)
			mydata = data.data
		  })
		  this.id = mydata
		  this.getsongsUrl()
		  this.getsonglyric()
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
							that.top = (newi*-30) + 250 +"rpx"
							var height = 25- newi * 30
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
	image{
		display: flex;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		margin: 20rpx auto;
	}
	.other-big{
		height: 700rpx;
		width: 750rpx;
		overflow: hidden;
		overflow-y: scroll;
		line-height: 90rpx;
	}
		.other-img {
			background-color: #DBF1E1;
			width: 50%;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			padding: 2%;
		}
		.other-flex {
			display: flex;
			justify-content: center;
		}
</style>
