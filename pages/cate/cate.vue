<template>
	<view>
		<searchFrame :bgcolor="'#3CB371'" :radius="100" @mySearchClick='gotoSearch'></searchFrame>
		<view style="display: flex;">
			<scroll-view scroll-y="true" :style="{ 'height': windowHeight + 'px', 'width': '120px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="[ 'lef-scroll-item', i === active ? 'active' : '' ]" @click="activeChange(i)">
						<text>{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{ height: windowHeight + 'px' }" :scroll-top="scrollTop">
				<view style="display: flex; flex-wrap: wrap;">
					<view class="cateLv2" v-for="(item, i) in cateLevel2" :key="i" @click="gotoBookList(item)">
						<text style="color: #007AFF;">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用的高度
				windowHeight: 0,
				scrollTop: 0,
				cateList: [],
				active: 0,
				// 二级分类的列表
				cateLevel2: []
			}
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/cate/cateList')
				if (res.code !== 0) return uni.$showMsg()
				this.cateList = res.data
				
				// 为二级分类赋值
				this.cateLevel2 = this.cateList[0].children
			},
			activeChange(i) {
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
				this.active = i
				this.cateLevel2 = this.cateList[i].children ? this.cateList[i].children : []
			},
			gotoBookList(item) {
				uni.navigateTo({
					url: '/subpkg/bookList/bookList?cateId=' + item.cateId
				})
			},
			gotoSearch () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.windowHeight = sysInfo.windowHeight
			
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.lef-scroll-item {
		background-color: #F7F7F7;
		line-height: 80px;
		text-align: center; 
		font-size: 14px;
		font-family: SimSun;
		font-weight: 800;
		
		&.active {
			background-color: #FFFFFF;
			position: relative;
			
			&::before {
				content: ' ';
				display: block;
				width: 5px;
				height: 40px;
				background-color: #3CB371;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
	
	.cateLv2 {
		display: flex;
		height: 80px;
		width: 33.33%;
		justify-content: center;
		align-items: center;
		
		font-size: 12px;
		font-family: SimSun;
	}
	

</style>
