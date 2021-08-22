import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import { get, remove, set } from 'utils/cache.js';


function GetTimRef(params = {}) {
	// 创建TIM对象
	let appId = params.appId;
	let options = {
	  SDKAppID: appId // 接入时需要将0替换为您的即时通信应用的 SDKAppID
	};
	let tim = TIM.create(options);
	tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
	// tim.setLogLevel(0);
	let onMessageReceived = (event) => {
	  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
	  // event.name - TIM.EVENT.MESSAGE_RECEIVED
	  // event.data - 存储 Message 对象的数组 - [Message]
		uni.$emit("reciveChatMsg", event.data);
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