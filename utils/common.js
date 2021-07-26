// 图片类
class ImgHandle {
	constructor(arg) {
	    
	}
	//多图模式
	multiImgShow() {
		let singleImg = '';
		//单图特殊格式
		if (this.imgList.length === 1) {
			//定义宽高
			let [width, height] = [this.imgList[0].width, this.imgList[0].height];
			//比例系数
			let scale = width / height;
			if (scale >= 1) {
				// 宽图
				if (scale >= 3) {
					singleImg = `height: 120rpx; width: 360rpx `;
				} else {
					// 正常范围
					singleImg = `height: ${ 360 * scale }rpx; width: 360rpx `;
				}
			} else {
				// 高图
				if (scale <= 0.3) {
					singleImg = `height: 360rpx; width: 120rpx `;
				} else {
					// 正常范围
					singleImg =  `height: 360rpx; width: ${ 360 * scale }rpx `;
				}
			}
		}
		//返回对应css类
		return singleImg || `img_${ this.imgList.length }`;
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