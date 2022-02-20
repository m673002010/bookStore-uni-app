<template>
	<view class="book-item">
		<!-- 左侧图片区 -->
		<view class="book-left">
			<radio :checked="book.state" color="#3CB371" v-if="showRadio" @click="radioChange"></radio>
			<image :src="book.imageSrc" class="pic"></image>
		</view>
		<!-- 右侧信息区 -->
		<view class="book-right">
			<view class="book-name">
				<text>《{{book.name}}》</text>
			</view>
			<view class="book-info">
				<text>{{book.author}}/</text> 
				<text>{{book.publisher}}/</text>
				<text>{{book.publishDate}}/</text> 
				<text>{{book.price | tofixed}}</text>
				<uni-number-box v-if="showCount" :min="1" :value="book.count" @change="countChange"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"book",
		props: { // 父组件传入book对象值
			book: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showCount: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {}
		},
		methods: {
			radioChange() {
				// 触发父组件的radio-change事件
				this.$emit('radio-change', {
					bookId: this.book.bookId,
					state: !this.book.state
				})
			}, 
			countChange(value) {
				// 触发父组件的count-change事件
				this.$emit('count-change', {
					bookId: this.book.bookId,
					count: +value // 书本最新数量
				})
			}
		},
		filters: { // 过滤器处理价格
			tofixed (num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.book-item {
		display: flex;
		padding: 10px 10px;
		border-bottom: 5px solid #efefef;
		
		.book-left {
			display: flex;
			justify-content:space-between;
			align-items:center;
			margin-right: 10px;
			
			.pic {
				height: 70px;
				width: 50px;
				display: block;
			}
		}
		
		.book-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.book-name {
				font-size: 12px;
			}
			
			.book-info {
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}

	}
</style>
