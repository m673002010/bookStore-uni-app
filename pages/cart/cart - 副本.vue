<template>
	<view v-if="cart.length !== 0" style="padding-bottom: 50px;">
		<view>
			<userAddress></userAddress>
		</view>
		
		<view
			style="height: 40px; display: flex; align-items: center; padding: 10px; border-bottom: 2px solid #efefef;">
			<uni-icons type="shop" size="18"></uni-icons>
			<text style="font-size: 14px; margin-left: 10px;">购物车</text>
		</view>

		<!-- 商品列表区 -->
		<uni-swipe-action>
			<block v-for="(book, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="clickSwpie(book)">
					<book :book="book" :showRadio="true" :showCount="true" @radio-change="radioChange"
						@count-change="countChange"></book>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 结算组件 -->
		<settle></settle>
	</view>
	
	<view v-else style="display: flex; flex-direction: column; align-items: center; padding-top:  150px;">
		<image style="width: 90px; height: 90px" src="/static/cart_empty@2x.png"></image>
		<text style="font-size: 12px; color: gray; margin-top: 15px;">空空如也</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import badgeMix from '../../mixins/tabbar-badge.js'

	export default {
		// 导入封装的mixin
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			}
		},
		methods: {
			radioChange(e) {
				this.updateBookState(e)
			},
			countChange(e) {
				this.updateBookCount(e)
			},
			clickSwpie(book) {
				this.removeBookById(book.bookId)
			},
			...mapMutations('mCart', ['updateBookState']),
			...mapMutations('mCart', ['updateBookCount']),
			...mapMutations('mCart', ['removeBookById'])
		},
		computed: {
			...mapState('mCart', ['cart'])
		}
	}
</script>

<style>
</style>
