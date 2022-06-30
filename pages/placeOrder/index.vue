<template>
	<view>
		<uni-nav-bar fixed :status-bar="true">
			<view class="tac">一键下单</view>
		</uni-nav-bar>
		<view class="page-content">
			<form class="form">
				<view class="cu-form-group margin-top">
					<view class="title">产品类别</view>
					<picker @change="PickerChange1" :value="index1" :range="picker1" class="picker" range-key="name">
						<view class="picker">
							{{index1>-1?picker1[index1].name:"请选择"}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">废弃城市/区域</view>
					<view @click="showMulLinkageThreePicker" style="padding: 20rpx 8rpx;">
						{{pickerText}}
					</view>
				</view>

				<view class="cu-form-group">
					<view class="title">详细地址:</view>
					<input name="input" v-model="orderList.address"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">预估质量(kg):</view>
					<input name="input" v-model="orderList.weight"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系人:</view>
					<input name="input" v-model="orderList.name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系方式:</view>
					<input name="input" v-model="orderList.phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title setting" @tap="onClear"><text class="cuIcon-roundclose"></text>清空当前信息</view>
				</view>
			</form>
			<view class="padding flex flex-direction">
				<button class="cu-btn btn lg" @tap="oorderTap">一键下单</button>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</view>
	</view>
</template>
<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/js/city.data.js';
	import {
		apiGetGoods,apiAddOrder
	} from '@/apis/api.js';
	export default {
		components: {
			uniNavBar,
			mpvueCityPicker,
			mpvuePicker
		},
		data() {
			return {
				index1: -1,
				picker1: [],
				orderList: {
					goods_id: '',
					name: '',
					phone: '',
					province: '',
					city: '',
					area: '',
					address: '',
					weight: ''
				},
				pickerText: '请选择',
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',

			};
		},
		onLoad(options) {
		},
		onShow() {
			this.getGoods();
		},
		computed: {
		},
		watch: {
			
		},
		methods: {
			//清空信息
			onClear() {
				Object.keys(this.orderList).forEach(key => {
					this.orderList[key] = '';
				})
				this.pickerText = '请选择';
				this.index1 = -1;
			},
			onCancel(e) {
				console.log(e)
			},
			onConfirm(e) {
				this.pickerText = e.label;
				console.log(e.label);
				let arr = this.pickerText.split('-');
				console.log(arr);
				this.orderList.province = arr[0];
				this.orderList.city = arr[1];
				this.orderList.area = arr[2];
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			//获取产品列表
			getGoods() {
				apiGetGoods().then(res => {
					if(res.code === 200){
						this.picker1 = res.response;
					}
				}).catch(err => {
					console.log(err);
				});

			},
			oorderTap() {
				let flag = true
				Object.keys(this.orderList).forEach(key => {
					if (this.orderList[key] === '') {
						uni.showToast({
							icon: 'none',
							title: "请完成所有必填项"
						});
						flag = false
						return false
					}
				})
				if (flag) {
					setTimeout(() => {
						uni.showModal({
							title: '确定是否下单？',
							content: ' ',
							cancelColor: '#007aff',
							success: res => {
								if (res.confirm) {
									this.addOrder();
								} else if (res.cancel) {}
							}
						});
					}, 1000)
				}

			},
			addOrder() {
				uni.showLoading({
					title: '加载中'
				});
				apiAddOrder(this.orderList).then(res => {
					console.log(res);
					uni.hideLoading();
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '下单成功'
						});
						// setTimeout(function() {
						// 	uni.switchTab({
						// 		url: '/pages/order/index'
						// 	});
						// }, 300);
					}
				}).catch(err => {
					uni.hideLoading();
					console.log(err);
				});

			},
			//产品选择
			PickerChange1(e) {
				this.index1 = e.detail.value;
				this.orderList.goods_id = this.picker1[this.index1]._id;
				console.log( e.detail.value,this.orderList.goods_id);
			}

		}
	};
</script>

<style lang="scss">
	page {
		font-size: 28rpx;
		background: $uni-bg-color-grey;
	}

	.page-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 64rpx;
		top: 100rpx;
	}

	.form {
		width: 92%;
		margin: 80rpx auto 0 auto;

		.cu-form-group {
			&:first-child {
				border-radius: 15rpx 15rpx 0 0;
			}

			&:last-child {
				border-radius: 0 0 15rpx 15rpx;
			}

		}
	}

	.btn {
		background: #6AC039 !important;
		color: #FFFFFF;
		border: 1px solid #6AC039;
		margin-top: 20rpx;

	}
</style>
