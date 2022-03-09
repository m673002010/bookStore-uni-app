<template>
	<view style="padding: 10px 10px 50px 10px; font-family: SimSun;" v-if="bookInfo.name">
		<view style="font-size: 20px; font-weight:bold; margin-bottom: 10px;">
			<text>{{bookInfo.name}}</text>
		</view>
		<view style="display: flex; margin-bottom: 20px;">
			<view style="height: 210px; width: 150px; margin-right: 10px;">
				<image :src="bookInfo.imageSrc" style="height: 100%; width: 100%;"></image>
			</view>

			<view>
				<view class="info"><text>作者:{{bookInfo.author}}</text></view>
				<view class="info"><text>出版社:{{bookInfo.publisher}}</text></view>
				<view class="info"><text>出版时间:{{bookInfo.publishDate}}</text></view>
				<view class="info"><text>定价:{{bookInfo.price || 0}}元</text></view>
				<view class="info"><text>页数:{{bookInfo.pageTotal || 0}}</text></view>
				<view class="info"><text>ISBN:{{bookInfo.isbn}}</text></view>
			</view>
		</view>

		<view
			@click="collectBook"
			style="display: flex; align-items: center; justify-content: center; border: 2px solid #3CB371; border-radius: 10px; margin-bottom: 20px;">
			<uni-icons :type="isfilled" size="30" color="green"></uni-icons>
			<text v-if="isCollected">已收藏</text>
			<text v-else>未收藏</text>
		</view>
		
		<view>
			<view><text>内容简介:</text></view>
			<view v-html="bookInfo.introduction" class="intro"></view>
		</view>
	</view>
</template>

<script>
	// 从vuex导出mapState、mapMutations方法
	import { mapState, mapMutations, mapGetters } from 'vuex'
		
	export default {
		data() {
			return {
				bookInfo: {},
				isCollected: false, // 该书本是否已收藏
			}
		},
		methods: {
			async getBookDetail(bookId) {
				const {
					data: res
				} = await uni.$http.get('/book/bookDetail', {
					bookId
				})
				if (res.code !== 0) return uni.$showMsg()
				this.bookInfo = res.data.bookInfo
				this.isCollected = res.data.isCollected
			},
			async collectBook() { // 收藏书籍，入库
				if (!this.token) return uni.$showMsg('收藏请先登录')
				const {
					data: res
				} = await uni.$http.post('/user/collectBook', {
					bookInfo: this.bookInfo,
					isCollected: !this.isCollected // 收藏或取消收藏
				})
				
				if (res.code !== 0) return uni.$showMsg()
				
				await this.getBookDetail(this.bookInfo.bookId)
			},
		},
		computed: {
			...mapState('mUser', ['token']),
			isfilled: function () {
				return this.isCollected ? 'star-filled' : 'star'
			}
		},
		onLoad(options) {
			const bookId = options.bookId
			this.getBookDetail(bookId)
		}
	}
</script>

<style lang="scss">
	.info {
		margin-bottom: 10px;
	}
	
	.intro {
		text-indent:2em;
	}
</style>
