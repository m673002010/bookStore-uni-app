
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// 引用网络请求包，定义请求拦截器
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'http://192.168.43.141:3000'

// 请求前的拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中......'
	})
	
	options.header = {
		Authorization: store.state.mUser.token || ''
	}
}

// 请求后拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 消息提示框
uni.$showMsg = function (title = '数据加载失败', duration = 1000) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
