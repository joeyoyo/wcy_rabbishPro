<template>
	<view>
		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="url + item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<uni-notice-bar :show-icon="true" :scrollable="true" :single="true" text="uni-app 1.6版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
	    <form class="form">
	    	<view class="subTitle">
	    		<text class="txt">产品类别</text>
	    		<text class="txt-right" @tap="onLawTap">《危险废物法律法规》</text>
	    		</view>
	    	<view class="info">
	    		<view class="item-info" v-for="(item,index) in goodsList" :key="index" >
	    			
	    			<image class="item-info-img" :src="url + item.image" mode="aspectFit"></image>
	    		</view>
	    	</view>
	    	<view class="subTitle">
	    		<text class="txt">公司简介</text>
	    	     <text class="txt-right" @tap="onDoRubbish">《如何正确处理危废》</text>
	    	</view>
	    	<view class="introduction" @tap="onCompanyTap">
	    		<image class="introduction-img" src="../../static/image/company.jpg" mode="scaleToFill"></image>
	    		<text class="txt">闽ICP备2021013336号</text>
	    	</view>
	    </form>
	</view>
</template>

<script>
	import { apiGetSwiper,apiGetGoods,apiGetCompany } from '@/apis/api.js';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				swiperList: [],
				url:'http://localhost:3000/',
				goodsList:[],
				companyInfo:''
			};
		},
		onShow() {
			this.apiGetSwiper()
			this.apiGetGoods()
		},
		methods: {
			makeImgUrl(path){
				return 'http://localhost:3000/' + path
			},
			//请求轮播图
			apiGetSwiper() {
				apiGetSwiper().then(res=>{
					console.log(res);
					if(res.code === 200){
						this.swiperList = res.response
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//请求产品列表
			apiGetGoods() {
				apiGetGoods().then(res=>{
					if(res.code === 200){
						this.goodsList = res.response
					}else{
						uni.showToast({
							icon:'none',
							title:res.message + ',请重新登录'
						})
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			//点击公司简介
			onCompanyTap(){
				uni.navigateTo({
					url: '/pages/subpages/index/company'
				});
			}
			// mbqgfdebpxfxbfhd   po3
			
			// ukebvzseowesbecc   imap
			
		}
	}
</script>

<style lang="scss">
	
	.form {
		.subTitle {
			padding: 20rpx;
			font-size: 32rpx;
			font-weight: 700;
			display: flex;
			justify-content: space-between;
			.txt {
				position: relative;
				padding-left: 20rpx;
				padding-left: 20rpx;
				&:before {
					content: '';
					width: 10rpx;
					height: 30rpx;
					background-color: #028f4b;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					margin: auto;
				}
			}
		}
		.info {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.item-info {
				width: 40%;
				height: 200rpx;
				// background: #ffffff;
				border-radius: 30rpx;
				margin: 30rpx;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				.item-info-img{
					border-radius: 30rpx;
					height: 100%;
				}
				.txt {
					// display: block;
					// margin: 10rpx 0;
					color: red;
					position: absolute;
					right: 30rpx;
					bottom: 8rpx;
				}
			}
		}
		.introduction {
			width: 90%;
			height: 300rpx;
			// background: #ffffff;
			border-radius: 30rpx;
			margin: 20rpx auto 140rpx auto;
			text-align: center;
			.introduction-img {
				// width: 300rpx;
				height: 300rpx;
				border-radius: 30rpx;
			}
			.txt{
				display: block;
			}
		}
	}
</style>
