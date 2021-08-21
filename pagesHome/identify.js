export const __identify = {
	// 提交
	async submit() {
		let isComplete = [this.realName, this.phone, this.vailid, this.SID, this.schoolId].every(item => {
			if (item.trim().length === 0) {
				return false;
			}
			return true;
		});
		if (isComplete) {
			const data = await this.$http.request({
				url: '/umsConfirm/pushConfirm',
				method: 'POST',
				data: {
						schoolId: this.schoolId,
						realName: this.realName,
						studentCode: this.SID,
						phone: this.phone,
						verificationCode: this.vailid
				}
			});
			if (data.data.code === 200) {
				return uni.reLaunch({
					url: '/pages/home/home'
				});
			}
		} else {
			return uni.showToast({
				title: '请完善所有信息',
				icon: 'none'
			})
		}
	},
	// 学校更改
	schoolConfirm(e) {
		this.school = e[0].label;
		this.schoolId = e[0].value;
	},
	// 地区更改
	async areaConfirm(res) {
		this.area.province = res.province.label;
		this.area.city = res.city.label;
		const data = await this.$http.request({
			url: '/sysSchool/selectSchoolByPc',
			method: 'POST',
			data: {
				province: this.area.province,
				city: this.area.city
			}
		});
		const result = data.data.data;
		const list = result.map(({id, name}) => {
			return { value: id, label: name };
		});
		this.schoolList = list;
	},
	// 获取认证状态
	async getConfirmStatus() {
		const data = await this.$http.request({
			url: '/umsAccount/getUserInfo',
			method: 'GET'
		});
		const result = data.data.data;
		this.confirmStatus = result.confirmStatus;
		setTimeout(() => {
			this.ifLoaddingShow = false;
		}, 500);
	},
	// 发送验证码
	async sendVerificationCode() {
		if (this.vaildTimmer) {
			return;
		}
		// 验证规则
		if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phone))){ 
		  return uni.showToast({
		  	title: '请填写正确的手机号',
				icon: 'none'
		  }); 
		} 
		// 发送请求
		const data = await this.$http.request({
			url: '/umsConfirm/sendVerificationCode',
			method: 'POST',
			data: {
				phone: this.phone
			}
		});
		// 请求CD
		this.vaildTimmer = setInterval(() => {
			if (this.vaildTimeCount <= 1) {
				clearTimeout(this.vaildTimmer);
				this.vaildTimmer = null;
				this.vaildTimeCount = 120;
			}
			this.vaildTimeCount--;
		}, 1000);
	},
	//获取所有的学校
	async getAllSchool() {
		const data = await this.$http.request({
			url: '/sysSchool/selectSchools',
			method: 'GET'
		});
		const result = data.data.data;
		const list = result.map(({id, name}) => {
			return { value: id, label: name };
		});
		this.schoolList = list;
	}
}