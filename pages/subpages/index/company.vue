<template>
	<view class="content">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft">
			<block slot="left"><uni-icon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">公司简介</view>
		</uni-nav-bar>
		<view class="page-content">
			<view class="rich">
			     <rich-text :nodes="companyInfo"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import { apiGetCompany } from '@/apis/api.js';
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				companyInfo:''
			}
		},
		onLoad() {
			this.onCompanyTap()

		},
		methods: {
			goLeft() {
				uni.navigateBack({
					delta: 1
				});
			},
			onCompanyTap(){
				apiGetCompany().then(res=>{
					if(res.code === 200){
						this.companyInfo = res.response[0].data
					}
				}).catch(err=>{
					console.log(err);
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
