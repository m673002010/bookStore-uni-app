export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的state数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功后获取token
		token: uni.getStorageSync('token'),
		// 用户基本信息
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		// 重定向的object对象 { openType, from }
		redirectInfo: null
	}),
	
	// 模块的mutations方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) { 
			state.address = address
			this.commit('mUser/saveAddressToStorage')
		},
		// 持久化存储收货地址
		saveAddressToStorage(state) { 
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户信息
		updateUserInfo (state, userInfo) { 
			state.userInfo = userInfo
			this.commit('mUser/saveUserInfoToStorage')
		},
		// 持久化存储用户信息
		saveUserInfoToStorage(state) { 
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('mUser/saveTokenToStorage')
		},
		// 持久化存储token
		saveTokenToStorage(state) { 
			uni.setStorageSync('token', state.token)
		},
		// 更新重定向对象
		updateRedirectInfo (state, info) {
			state.redirectInfo = info
		}
	},
	
	// 模块的getters属性
	getters: {
		addStr (state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}
