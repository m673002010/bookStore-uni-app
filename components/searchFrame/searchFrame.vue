<template>
	<view>
		<view class="search-container" :style="{ 'background-color': bgcolor }" @click="search()">
			<!-- 使用view组件模拟input输入框 -->
			<view class="search-box" :style="{ 'border-radius': radius + 'px' }">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="phaceholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 背景颜色
			bgcolor: {
				type: String,
				default: '#3CB371'
			},
			// 圆角尺寸
			radius: {
				type: Number,
				default: 18
			}
		},
		name:"searchFrame",
		data() {
			return {
				
			}
		},
		methods: {
			search () {
				this.$emit('mySearchClick')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		// background-color: #3CB371;
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		
		.search-box {
			height: 36px;
			background-color: #FFFFFF;
			// border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.phaceholder {
				font-size: 12px;
				margin: 5px;
			}
		}
	}
	
	
</style>
