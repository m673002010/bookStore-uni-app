<template>
	<view style="border-bottom: 2px solid #efefef;">
		<view v-if="JSON.stringify(address) === '{}'" style="height: 90px; display: flex; align-items: center; justify-content: center;">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址</button>
		</view>
		
		<view v-else @click="chooseAddress" style="font-size: 12px; height: 90px; display: flex; align-items: center; justify-content: space-between;">
			<view>
				<view>收货人:{{address.userName}}</view>
				<view>电话:{{address.telNumber}}</view>
				<view>收货地址:{{addStr}}</view>
			</view>
			<uni-icons type="arrowright" size="20"></uni-icons>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	
	export default {
		name:"userAddress",
		data() {
			return {
				// address: {}
			}
		},
		methods: {
			...mapMutations('mUser', ['updateAddress']),
			async chooseAddress () {
				// 调用小程序的方法chooseAddress获取地址
				const [ err, succ ] = await uni.chooseAddress().catch(err => err)
				if (!err && succ.errMsg === 'chooseAddress:ok') {
					// this.address = succ
					this.updateAddress(succ)
				}
			},
		},
		computed: {
			...mapState('mUser', ['address']),
			...mapGetters('mUser', ['addStr'])
			// addstr() {
			// 	if (!this.address.provinceName) return ''
			// 	return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			// }
		}
	}
</script>

<style lang="scss">
</style>
