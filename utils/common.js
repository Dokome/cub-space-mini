// 图片类
class ImgHandle {
	constructor(arg) {
	    
	}
	//多图模式
	multiImgShow(imgList = [], options = {}) {
		let singleImg = '';
		let BASE = options.isComment ? 300 : 540;
		//单图特殊格式
		if (imgList.length === 1) {
			//定义宽高
			let [width, height] = [imgList[0].width || BASE, imgList[0].height || BASE];
			//比例系数
			let scale = width / height;
			if (scale >= 1) {
				// 宽图
				if (scale >= 3) {
					singleImg = `height: ${BASE / 3}rpx; width: ${BASE}rpx `;
				} else {
					// 正常范围
					singleImg = `height: ${ BASE / scale }rpx; width: ${BASE}rpx `;
				}
			} else {
				// 高图
				if (scale <= 0.3) {
					singleImg = `height: ${BASE}rpx; width: ${BASE / 3}rpx `;
				} else {
					// 正常范围
					singleImg =  `height: ${BASE}rpx; width: ${ BASE * scale }rpx `;
				}
			}
		}
		//返回对应css类
		return singleImg || `img_${ imgList.length }`;
	}
	// 图片选择
	imgSelector(options = {}) {
		let count = 9 - this.imgList.length;
		uni.chooseImage({
			count: count,
			sizeType: "compressed",
			success: (res) => {
				let tempImgList = res.tempFilePaths;
				for (let i = 0; i < res.tempFilePaths.length; i++) {
					uni.getImageInfo({
						src: tempImgList[i],
						success: (res) => {
							tempImgList[i] = {
								url: tempImgList[i],
								width: res.width,
								height: res.height
							}
						}
					});
				}
				setTimeout(() => {
					this.imgList = this.imgList.concat(tempImgList);
				}, 500)
			}
		});
	}
	// 移除点击的图片
	removeCurrentImg(index) {
		this.imgList.splice(index, 1);
	}
	// 预览图片
	imgPreview(url, urls) {
		uni.previewImage({
			current: url,
				urls: urls
		});
	}
}
	
class RouterHandle {
	constructor(arg) {
	    
	}
	// 跳转到页面
	goto(url, data) {
		uni.navigateTo({
			url,
			success: function(res) {
			  // 通过eventChannel向被打开页面传送数据
			  res.eventChannel.emit('acceptDataFromOpenerPage', {data: data})
			}
		})
	}
	// 返回页面
	goback() {
		uni.navigateBack({
			delta: 1
		})
	}
}

class Interactive {
	constructor(arg) {
	    
	}
	// 页面分享
	async newsShareHandle(id) {
		const data = await this.$http.request({
			url: '/dynamicLikeForward/addLikeOrForward',
			method: 'POST',
			data: {
				bizId: id,
				bizType: 1,
				type: 2
			}
		});
	}
	// 页面分享监听
	onShareFunc(res) {
		if (res && res.from === 'button') {// 来自页面内分享按钮
			let info = res.target.dataset.info || {};
			return {
				title: (info && info.content && info.content.slice(0, 8) + '...') || '遇见有趣的',
				path: (info && info.id && `/pagesInteractive/newsdetail?id=${info.id}`) || '',
				imageUrl: (info && info.images[0] && info.images[0].url) || 'https://cub.image.emily.red/operation/logo.png'
			}
		} 
		return {
			title: '遇见有趣的',
			imageUrl: 'https://cub.image.emily.red/operation/logo.png'
		}
	}
	// 点赞
	async likeHandle(data, type) {
		this.likeNumCount = this.likeNumCount + (this.likeStatus ? -1 : 1);
		this.likeStatusCount = this.likeStatusCount ? 0 : 1;
		const result = await this.$http.request({
			url: '/dynamicLikeForward/addLikeOrForward',
			method: 'POST',
			data: {
				bizType: type,
				bizId: data.id,
				type: 1
			}
		});
	}
	
}

class TimeHandle {
	constructor() {
		
	}
	
	chatMessage(timestamp) {
		const ZERO = new Date().setHours(0, 0, 0, 0);
		//发布时间差大于0说明是今天发的, 否则为历史消息
		const timeDiff = parseInt((timestamp -  ZERO / 1000)) ;
		if (timeDiff > 0) {
			let minute = parseInt(timeDiff / 60 % 60);
			minute = minute < 10 ? '0' + minute : minute;
			let hour = parseInt(timeDiff / 3600);
			hour = hour < 10 ? '0' + hour : hour;
			return `${hour}:${minute}`;
		} else {
			const pastYear = new Date(+new Date()).getFullYear();
			const msgDate = new Date(timestamp * 1000);
			const month = msgDate.getMonth() + 1;
			const day = msgDate.getDate();
			const year = msgDate.getFullYear();
			return `${year === pastYear ? '' : year + '/'}${month}/${day}`;
		}
	}
}
// 生成实例
let imgHandle = new ImgHandle();
let routerHandle = new RouterHandle();
let interactive = new Interactive();
let timeHandle = new TimeHandle();

export {
	imgHandle, routerHandle, interactive, timeHandle
}