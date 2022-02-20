<template>
	<view class="userBox">
		<view class="userInfo">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<view class="nickName">{{userInfo.nickName}}</view>
		</view>
		
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="item">
						<text>16</text>
						<text>收藏的商品</text>
					</view>
					<view class="item">
						<text>24</text>
						<text>关注的商品</text>
					</view>
					<view class="item">
						<text>32</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				
				<view class="panel-body">
					<view class="item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		name:"userInfo",
		data() {
			return {}
		},
		methods: {
			async logout () { // 退出登录
				const [ err, succ ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				// 确认清空用户信息
				if (succ && succ.confirm) {
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			},
			...mapMutations('mUser', ['updateAddress', 'updateUserInfo', 'updateToken'])
		},
		computed: {
			...mapState('mUser', ['userInfo', 'token'])
		}
	}
</script>

<style lang="scss">
	.userBox {
		height: 100%;
		
		.userInfo {
			height: 200px;
			background-color: #3CB371;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.avatar {
				width: 90px;
				height: 90px;
				border: 2px solid #FFFFFF;
				border-radius: 100%;
				box-shadow: 0 1px 5px black;
			}
			
			.nickName {
				font-size: 16px;
				color: #FFF;
				margin-top: 10px;
			}
		}
		
		.panel-list {
			padding: 0 10px;
			position: relative;
			top: -10px;
			
			.panel {
				background-color: white;
				border-radius: 5px;
				margin-bottom: 10px;
				
				.panel-title {
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 1px solid #F4F4F4;
				}
				
				.panel-body {
					display: flex;
					justify-content: space-around;
					
					.item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						padding: 10px 0;
						font-size: 13px;
						
						.icon {
							height: 35px;
							width: 35px;
						}
					}
				}
				
				.panel-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 15px;
					padding: 0 10px;
					line-height: 45px;
				}
			}
		}
	}
</style>
