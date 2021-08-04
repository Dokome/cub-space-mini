import {
	get
} from './cache.js';

const BASE_URL = {
	// 开发环境
	_DEV: 'https://cub.api.emily.red/api',
	// 生产环境
	_PRO: 'https://api.sapce.club/api',
	// 本地环境
	_LOC: 'http://localhost:9091/api'
}

const CUR_BASE_URL = BASE_URL._DEV;

// 请求相关
class Http {
	constructor() {

	}
	// 请求函数
	request(options) {
		return new Promise((resolve, reject) => {
			const token = get('token');
			// 请求在没有特殊声明或者未登录情况下直接跳转到可以登录的页面
			if (!token && !options.noToken) {
				return uni.reLaunch({
					url: '/pages/home/home'
				});
			}
			uni.request({
				url: CUR_BASE_URL + options.url,
				method: options.method || 'POST',
				data: options.data || {},
				header: {
					'content-type': 'application/json',
					'token': token
				},
				dataType: 'json',
				success: (res) => {
					if (res.data.code !== 200 && !options.skip) {
						return uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
					resolve(res)
				},
				fail: (err) => {
					uni.showToast({
						title: '请求接口失败',
						icon: "none"
					})
					reject(err)
				}
			})
		})
	}

	upLoadFile(filePath) {
		return new Promise((resolve, reject) => {
			const token = get('token');
			uni.uploadFile({
				url: BASE_URL + '/tencent/oss/uploadFiles',
				filePath: filePath,
				name: 'file',
				success: (res) => {
					let data = {
						msg: '文件大小不能超过70M!'
					};
					try {
						data = JSON.parse(res.data);
					} catch (e) {
						console.log(e);
					}
					if (data.code !== 200) {
						resolve(() => {
							uni.showToast({
								title: data.msg,
								icon: "none",
								duration: 3000
							})
						})
						return;
					}
					console.log(data.data[0]);
					resolve(data.data[0]);
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						title: '请求接口失败'
					})
					reject(err);
				}
			});
		})
	}
}

let http = new Http();
export {
	http
}