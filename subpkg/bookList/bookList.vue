<template>
	<view>
		<view class="book-list">
			<view v-for="(item, i) in bookList" :key="i" @click="gotoDetail(item)">
				<book :book="item"></book>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: {
					keyword: '',
					cateId: '',
					pageNum: 1,
					pageSize: 10,
				},
				bookList: [],
				total: 0,
				isLoading: false // 节流阀
			}
		},
		methods: {
			async getBookList(callback) {
				this.isLoading = true // 打开节流阀
				
				const { data: res } = await uni.$http.get('/search', this.query)
				
				this.isLoading = false // 关闭节流阀
				
				callback && callback() // 执行回调函数
				
				if (res.code !== 0) return uni.$showMsg()
				this.bookList = [...this.bookList, ...res.data.bookList] // 拼接新旧数据
				this.total = res.data.total

			},
			onReachBottom () { // 下拉触底获取新数据
				// 没有更多的数据不请求
				if (this.query.pageNum * this.query.pageSize >= this.total) {
					return uni.$showMsg('数据已全部加载')
				}
				
				// 正在加载不请求
				if (this.isLoading) return
				
				this.query.pageNum++
				this.getBookList()
			},
			onPullDownRefresh() { // 上拉加载
				// 重置
				this.query.pageNum = 1
				this.total = 0
				this.isLoading = false
				this.bookList = []
				
				// 重新发起请求，传入回调函数
				this.getBookList(() => uni.stopPullDownRefresh())
			},
			gotoDetail (item) {
				uni.navigateTo({
					url: '/subpkg/bookDetail/bookDetail?bookId=' + item.bookId
				})
			}
		},
		onLoad(options) {
			this.query.keyword = options.keyword || ''
			this.query.cateId = options.cateId || 0

			this.getBookList()
		}
	}
</script>

<style lang="scss">
</style>
