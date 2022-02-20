<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		
		<!-- <button type="default" class="loginButton" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
		<button type="default" class="loginButton" @click="getUserInfo">一键登录</button>
		
		<view class="tips">登陆后可使用更多功能</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"userLogin",
		data() {
			return {}
		},
		methods: {
			// getUserInfo(e) {
			// 	if (e.detail.errMsg === 'getUserInfo:fail auth deny'){
			// 		return uni.$showMsg('您取消了登录授权')
			// 	}
			// 	this.updateUserInfo(e.detail.userInfo)
			// },
			getUserInfo() {
				uni.getUserProfile({
					desc: 'Weixin',
					success: res => {
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
					}, 
					fail: res => uni.$showMsg('您取消了登录授权')
				})
			},
			async getToken(info) {
				// 调用微信登录接口
				const [ err, res ] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				
				// 获取小程序的appid，
				const appInfo = uni.getAccountInfoSync()
				
				// 请求登录接口的参数
				const query = {
					code: res.code,
					appId: appInfo.miniProgram.appId,
					appSecret: '867b580ebbaf31f9740820080e3f7fd7',
					grant_type: 'authorization_code',
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				
				// 获取token
				const { data: result } = await uni.$http.post('/login', query)
				if (result.code !== 0) return uni.$showMsg('登录失败')
				this.updateToken(result.data.token)
				uni.$showMsg('登录成功')
				
				// 登录成功重新跳回来源页面 
				this.navigateBack()
				
				return
			},
			navigateBack () { // 重新跳回来源页面 
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						// 导航跳转完成后，重置redirectInfo
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				} 
			},
			...mapMutations('mUser', ['updateUserInfo', 'updateToken', 'updateRedirectInfo'])
		},
		computed: {
			...mapState('mUser', ['redirectInfo'])
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 375px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// position: relative;
		// overflow: hidden;
		
		// 弧形底部样式
		// &::after { 
		// 	content: '';
		// 	display: block;
		// 	width: 100%;
		// 	height: 40px;
		// 	background-color: white;
		// 	position: absolute;
		// 	bottom: 0;
		// 	left: 0;
		// 	border-radius: 100%;
		// 	transform: translateY(50%);
		// }
		
		.loginButton {
			width: 60%;
			border-radius: 100px;
			background-color: #3CB371;
			margin: 15px 0;
		}
		
		.tips {
			font-size: 12px;
			color: gray;
		}
	}
</style>
