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
			style="display: flex; align-items: center; justify-content: center; border: 2px solid #3CB371; border-radius: 10px; margin-bottom: 20px;">
			<uni-icons type="star" size="30" color="green"></uni-icons>
			<text>收藏</text>
		</view>
		
		<!-- 商品导航组件 -->
		<view style="position: fixed; bottom: 0; left: 0; width: 100%;">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
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
				options: [
					{
						icon: 'shop',
						text: '店铺'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 0
					}
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			...mapMutations('mCart', ['addToCart']),
			async getBookDetail(bookId) {
				const {
					data: res
				} = await uni.$http.get('/book/bookDetail', {
					bookId
				})
				if (res.code !== 0) return uni.$showMsg()
				this.bookInfo = res.data
			},
			onClick(e) { // 导航栏左侧按钮的点击事件处理函数
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) { // 导航栏右侧按钮的点击事件处理函数
				if (e.content.text === '加入购物车') {
					// 书本信息对象
					const book = {
						bookId: this.bookInfo.bookId,
						name: this.bookInfo.name,
						price: this.bookInfo.price,
						author: this.bookInfo.author,
						publisher: this.bookInfo.publisher,
						publishDate: this.bookInfo.publishDate,
						count: 1,
						imageSrc: this.bookInfo.imageSrc,
						state: true // 书本勾选状态
					}
					
					// 调用映射的加入方法
					this.addToCart(book)
				}
			}
		},
		computed: {
			// 将mCart中的cart数组映射到当前页面中，作为计算属性来使用
			...mapState('mCart', ['cart']),
			// 映射统计购物车总数为计算属性
			...mapGetters('mCart', ['totalCount'])
		},
		watch: {
			// 监听totalCount值，通过第一个形参得到变化后的值
			// totalCount: function (newValue) {
			// 	const cart = this.options.find(item => item.text === '购物车')
			// 	if (cart) cart.info = newValue
			// }
			// 侦听器从函数改为指向对象
			totalCount: {
				handler(newValue) {
					const option = this.options.find(item => item.text === '购物车')
					if (option) option.info = newValue
				},
				// 页面初次加载完毕之后立即调用，避免购物车的已有数量无法显示
				immediate: true
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
</style>
