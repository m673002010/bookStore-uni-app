<template>
	<view class="settle">
		<!-- 全选 -->
		<label @click="changeAllState()">
			<radio :checked="isAllChecked" color="#3CB371"/><text>全选</text></radio>
		</label>
		
		<view>
			<text>合计: {{checkedAmount}}元</text>
		</view>
		
		<view @click="settlement">
			<text>结算({{checkedCount}})</text>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"settle",
		data() {
			return {
				seconds: 3,
				timer: null // 定时器
			}
		},
		methods: {
			...mapMutations('mCart', ['updateAllState']),
			...mapMutations('mUser', ['updateRedirectInfo']),
			changeAllState() { // 改变全选状态
				this.updateAllState(!this.isAllChecked)
			},
			settlement () { // 结算
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的书本')
				if (!this.addStr) return uni.$showMsg('请选择地址')
				// if (!this.token) return uni.$showMsg('请先登录')
				// 如果没有登录，进行倒计时跳转到登录页
				if (!this.token) return this.delayNavigate()
			},
			delayNavigate() { // 延时跳转登录页
				this.seconds = 3 // 重新赋值，避免多次触发跳转的bug
				
				// 展示消息
				this.showTips(this.seconds)
				
				// 创建定时器，倒计时，每隔1秒执行一次
				this.timer = setInterval(() => {
					this.seconds--
					
					// 秒数到达0，清除定时器，跳转登录页
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						
						uni.switchTab({
							url: '/pages/my/my',
							
							// 页面跳转成功回调
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab', // 跳转方式
									from: '/pages/cart/cart' // 跳转来源
								})
							}
						})
						
						return
					}
					
					this.showTips(this.seconds)
				}, 1000)
			},
			showTips(n) { // 展示倒计时消息
				uni.showToast({
					icon: 'none', // 无图标
					title: '请登录后再结算！' + n + '秒后自动跳转登录页',
					mask: true, // 添加透明遮罩，防止点击穿透，在倒计时没办法点击其他地方
					duration: 1500 // 1.5秒的展示时长，大于1秒
				})
			}
		},
		computed: {
			...mapGetters('mCart', ['checkedCount', 'totalCount', 'checkedAmount']),
			...mapGetters('mUser', ['addStr']),
			...mapState('mUser', ['token']),
			isAllChecked() { // 总数量是否等于已勾选数量
				return this.totalCount === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">
	.settle {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 14px;
		background-color: #efefef;
		z-index: 2;
	}
</style>
