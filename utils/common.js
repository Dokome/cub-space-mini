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
	goto(url) {
		uni.navigateTo({
			url,
		})
	}
	// 返回页面
	goback() {
		uni.navigateBack({
			delta: 1
		})
	}
}

// 生成实例
let imgHandle = new ImgHandle();
let routerHandle = new RouterHandle();

export {
	imgHandle, routerHandle
}