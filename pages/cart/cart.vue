<template>
	<view v-if="cart.length !== 0" style="padding-bottom: 50px;">
		<!-- 收藏书本列表区 -->
		<uni-swipe-action>
			<block v-for="(book, i) in bookList" :key="i">
				<uni-swipe-action-item :right-options="options" @click="clickSwpie(book)">
					<book :book="book"></book>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
	
	<view v-else style="display: flex; flex-direction: column; align-items: center; padding-top:  150px;">
		<text style="font-size: 16px; color: gray; margin-top: 15px;">空空如也</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookList: [],
				options: [{
					text: '取消收藏',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			}
		},
		methods: {
			async getCollectedBooks () {
				const {
					data: res
				} = await uni.$http.get('/user/collectedBooks')
				if (res.code !== 0) return uni.$showMsg()
				this.bookList = res.data
			},
			async clickSwpie (book) {
				const {
					data: res
				} = await uni.$http.get('/user/cancelCollected', { bookId: book.bookId })
				if (res.code !== 0) return uni.$showMsg()
				
				await this.getCollectedBooks()
			}
		},
		onLoad() {
			this.getCollectedBooks()
		}
	}
</script>

<style>
</style>
