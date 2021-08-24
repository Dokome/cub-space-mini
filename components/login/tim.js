import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import { get, remove, set } from 'utils/cache.js';


function GetTimRef(params = {}) {
	// 创建TIM对象
	let appId = params.appId;
	if (!appId) return; //当没登录且缓存不存在的时候直接退出
	let options = {
	  SDKAppID: appId // 接入时需要将0替换为您的即时通信应用的 SDKAppID
	};
	let tim = TIM.create(options);
	if (!tim) return; //当没登录且缓存不存在的时候直接退出
	tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
	let onMessageReceived = (event) => {
		uni.$emit("reciveChatMsg", event.data);
		uni.$emit("chatListUpdate", '');
	};
	tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
	 
	// 登录
	let promise = tim.login({userID: params.userId, userSig: params.userSig});
	promise.then((imResponse) => {
	  console.log('TIM登录成功'); // 登录成功
	  if (imResponse.data.repeatLogin === true) {
	    // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
	    console.log('TIM重复登录');
	  }
	}).catch((imError) => {
	  console.warn('login error:', imError); // 登录失败的相关信息
	});
	if (!get('TIM')) {
		console.log('old cache TIM：' + get('TIM'));
		remove('TIM');
	}
	set('TIM', TIM, params.expires);
	uni.$emit('timCreateSuccess', tim);
}

export default GetTimRef;