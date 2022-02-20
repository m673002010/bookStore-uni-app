export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的state数据
	state: () => ({
		// 存放每个书本的信息对象：id，名称，价格，图片，数量，选中状态
		// cart: []
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	// 模块的mutations方法
	mutations: {
		addToCart(state, book) { // 添加购物车
			// 根据提交的书本id，查询购物车是否存在这件书本
			const hasBook = state.cart.find(item => item.bookId === book.bookId)
			
			// 不存在就增加商品，存在增加数量
			if (!hasBook) state.cart.push(book)
			else hasBook.count++
			
			this.commit('mCart/saveToStorage')
		},
		saveToStorage(state) { // 持久化存储购物车
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateBookState(state, book) { // 更新勾选状态
			const hasBook = state.cart.find(item => item.bookId === book.bookId)
			
			if (hasBook) {
				hasBook.state = book.state
				this.commit('mCart/saveToStorage')
			}
		},
		updateBookCount(state, book) { // 更新数量
			const hasBook = state.cart.find(item => item.bookId === book.bookId)
			
			if (hasBook) {
				hasBook.count = book.count
				this.commit('mCart/saveToStorage')
			}
		},
		removeBookById (state, bookId) { // 删除
			state.cart = state.cart.filter(item => item.bookId !== bookId)
			this.commit('mCart/saveToStorage')
		},
		updateAllState(state, newState) { // 一次更新所有书本勾选状态
			// 遍历更新勾选状态
			state.cart.forEach(item => item.state = newState)
			this.commit('mCart/saveToStorage')
		}
	},
	
	// 模块的getters属性
	getters: {
		// 统计购物车中书本的数量
		totalCount(state) {
			// let count = 0
			// state.cart.forEach(item => count += item.count)
			// return count
			return state.cart.reduce((total, item) => total += item.count, 0)
		},
		// 统计结算勾选的数量
		checkedCount(state) {
			// 先使用filter筛选出state为true的书本
			// 再使用reduce统计总数
			return state.cart.filter(item => item.state).reduce((total, item) => {
				return total += item.count 
			}, 0)
		},
		// 统计结算勾选的价格
		checkedAmount(state) {
			return state.cart.filter(item => item.state)
			.reduce((totalAmount, item) => {
				return totalAmount += item.count * item.price
			}, 0)
			.toFixed(2)
		}
	}
}
