const BASE_URL = 'http://localhost:3000'

export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.url || 'GET',
			data:options.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败！'
				})
				reject(err)
			}
		})
	})
}