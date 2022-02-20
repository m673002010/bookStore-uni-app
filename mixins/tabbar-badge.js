import { mapGetters } from 'vuex'

// 导出mixin对象
export default {
	methods: {
		setBadge() { // 设置右上角数字图标
			uni.setTabBarBadge({
				index: 2, // 购物车图标索引
				text: this.totalCount + ''
			})
		}
	},
	computed: {
		...mapGetters('mCart', ['totalCount'])
	},
	watch: {
		totalCount() { // 点击+增加书本，购物车数量值随之增加，
			this.setBadge()
		}
	},
	onShow() { // 页面刚展示时，设置数字徽标
		this.setBadge()
	}
}
