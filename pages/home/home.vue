<template>
	<view>
		<view style="position: sticky; top: 0; z-index: 999;">
			<searchFrame :bgcolor="'#3CB371'" :radius="100" @mySearchClick='gotoSearch'></searchFrame>
		</view>

		<swiper style="height: 360rpx;" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000"
			:circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<view
					style="height: 240rpx; margin: 30rpx; padding: 10rpx; border-radius: 20rpx; background: #E2D0D0; box-shadow: 10rpx 10rpx 10rpx #cdcfcf;">
					<text style="font-family: SimSun; font-weight: 800;">{{item}}</text>
				</view>
			</swiper-item>
		</swiper>
		
		<view v-for="(item, i) in floorList" :key="i">
			<view style="margin: 60rpx 0rpx 10rpx 30rpx;">
				<text style="font-family: Microsoft YaHei; font-weight: 900;">{{item.name}}</text>
				<text style="font-family: Microsoft YaHei; font-weight: 900; color: #3CB371; margin-left: 400rpx;" @click="moreClick(item)">更多书籍>></text>
			</view>
			<scroll-view scroll-x style="height: 360rpx; width: 100%; white-space: nowrap;">
				<view v-for="(item, j) in newBookList" :key="j"
					style="display: inline-block; height: 320rpx; width: 200rpx; margin: 20rpx;">
					<image :src="item.imageSrc" style="height: 280rpx; width: 200rpx; border-radius: 20rpx" @click="picClick(item)"></image>
					<view style="text-align: center; width: 200rpx; overflow:hidden; text-overflow:ellipsis">
						<text style="font-family: Microsoft YaHei; font-weight: 500; font-size: 24rpx;">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				floorList: [
					{ name:'店主推荐', keyword: 'recommend'},
					{ name:'畅销经典', keyword: 'classical'},
					{ name:'新书速递', keyword: 'new'}
				],
				newBookList: []
			}
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/book/swiperList')
				if (res.code !== 0) return uni.$showMsg()
				this.swiperList = res.data
			},
			async getNewBooks() {
				const {
					data: res
				} = await uni.$http.get('/book/bookList')
				if (res.code !== 0) return uni.$showMsg()
				this.newBookList = res.data.bookList
			},
			picClick(item) {
				uni.navigateTo({
					url: '/subpkg/bookDetail/bookDetail?isbn=' + item.isbn
				})
			},
			moreClick(item) {
				uni.navigateTo({
					url: '/subpkg/bookList/bookList?keyword=' + item.keyword
				})
			},
			navClick(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotoSearch () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNewBooks()
		}
	}
</script>

<style lang="scss">
</style>
