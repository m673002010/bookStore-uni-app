<template>
	<view>
		<view style="position: sticky; top: 0; z-index: 999; background-color: #3CB371;">
			<uni-search-bar @input="typeInput" :focus="true" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<view class="suggest-list" v-if="searchList.length !== 0">
<!-- 			<view class="suggest-item" v-for="(item, i) in searchList" :key="i" @click="gotoBookDetail(item)">
				<view class="desc">
					{{item.name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view> -->
			<view v-for="(item, i) in searchList" :key="i" @click="gotoBookDetail(item)">
				<book :book="item"></book>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			
			<view class="history-list">
				<uni-tag inverted="true" :text="item" v-for="(item, i) in histories" :key="i" @click="gotoBookList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器，防抖动
				timer: null,
				keyword: '',
				searchList: [],
				historyList: []
			}
		},
		methods: {
			typeInput (e) {
				// 清除延时器
				clearTimeout(this.timer)
				
				// 1000毫秒后才处理用户输入内容
				this.timer = setTimeout(() => {
					this.keyword = e.valueOf()
					this.getSearchList()
				}, 1000)
			},
			async getSearchList () {
				// 搜索框清空
				if (this.keyword.trim() === '') {
					this.searchList = []
					return
				}
				
				// 获取搜索结果
				const { data: res } = await uni.$http.get('/search', { keyword: this.keyword })
				if (res.code !== 0) return uni.$showMsg()
				this.searchList = res.data.bookList
				
				this.saveSearchHistory(this.keyword)
			},
			gotoBookDetail (item) {
				uni.navigateTo({
					url: '/subpkg/bookDetail/bookDetail?bookId=' + item.bookId
				})
			},
			gotoBookList (item) {
				uni.navigateTo({
					url: '/subpkg/bookList/bookList?keyword=' + item
				})
			},
			saveSearchHistory (keyword) { // 保存关键词
				// this.historyList.push(keyword)
				
				// 将array转为set
				const historySet = new Set(this.historyList)
				// 移除对应的元素
				historySet.delete(keyword)
				// 添加对应元素，保证最新搜索词条最前面
				historySet.add(keyword)
				// set转为array
				this.historyList = Array.from(historySet)
				// 将搜索记录持久化存储到本地
				uni.setStorageSync('keyword', JSON.stringify(this.historyList))
			},
			cleanHistory () {
				this.historyList = []
				// uni.setStorageSync('keyword', '[]')
				uni.removeStorageSync('keyword')
			}
		},
		computed: {
			histories () {
				// 基于历史记录，创建新的内存无关的列表
				return [...this.historyList].reverse()
			} 
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('keyword') || [])
		}
	}
</script>

<style lang="scss" scoped>
	.suggest-list {
		padding: 0 5px;
		
		// .suggest-item {
		// 	font-size: 12px;
		// 	padding: 13px 0;
		// 	border-bottom: 2px solid #efefef;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: space-between;
			
		// 	.desc {
		// 		white-space: nowrap;
		// 		overflow: hidden;
		// 		text-overflow: ellipsis;
		// 	}
		// }
	}
	
	.history-box {
		padding: 0 5px;
		
		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 12px;
			border-bottom: 2px solid #efefef;
		}
		
		.history-item {
			// display: flex;
			// flex-warp: wrap;
		}
		
		uni-tag {
			margin-top: 5px;
			margin-right: 10px;
		}
	}
</style>
