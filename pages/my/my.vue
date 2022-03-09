<template>
	<view class="myContainer">
		<userLogin v-if="!token"></userLogin>

		<userInfo v-else></userInfo>
	</view>
</template>

<script>
	// import badgeMix from '../../mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	
	export default {
		// mixins: [badgeMix],
		data() {
			return {}
		},
		methods: {
			
		},
		computed: {
			...mapState('mUser', ['token'])
		}
	}
</script>

<style lang="scss">
	page, .myContainer {
		height: 100%;
	}
</style>
