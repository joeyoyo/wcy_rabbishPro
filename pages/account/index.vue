<template>
	<view>
		<view class="top-content">
			<view class="img-box">
				<image class="img" :src="imgUrl" mode="aspectFit"></image>
				<view class="txt" @tap="loginTap" v-if="!loginFlag">请登录</view>
			</view>
			<view class="userinfo" v-if="loginFlag">
				<view class="txt" @tap="loginTap">用户名:{{accountInfo.username}}</view>
				<view class="txt" @tap="loginTap">邮箱:{{accountInfo.email}}</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">回收流程</view>
				<text class='cuIcon-right'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">订单详情</view>
				<text class='cuIcon-right'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">联系我们</view>
				<text class='cuIcon-right'></text>
			</view>
			<view class="padding">
				<button class="cu-btn block bg-blue margin-tb-sm lg" v-if="loginFlag" @tap="logout">退出</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	import { apiGetUser } from '@/apis/api.js';
	export default {
		data() {
			return {
				accountInfo:{}
				
			};
		},
		onShow() {
			this.apiGetUser()
		},
		computed:{
			imgUrl(){
				//如果登录了
				if(JSON.stringify(this.accountInfo) !== '{}'){
				  return this.accountInfo['avtar'].indexOf('http') !== -1 ? this.accountInfo['avtar'] : ('http://127.0.0.1:3000' + this.accountInfo['avtar'])
				}else{ //未登录
					return '../../static/image/account/notLogin1.png'
				}
			},
			loginFlag(){
				//如果登录了
				if(JSON.stringify(this.accountInfo) !== '{}'){
					return true
				}else{ //未登录
					return false
				}
			}
		},
		methods: {
			...mapMutations(['SET_TOKEN']),
			loginTap() {
				uni.navigateTo({
					url: '../subpages/index/login',
				});
			},
			//请求用户信息
			apiGetUser() {
				apiGetUser().then(res=>{
					console.log(res);
					if(res.code === 200){
						this.accountInfo = res.response[0]
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
			//退出
			logout(){
				this.SET_TOKEN('') //把token清除
				this.accountInfo = {}
				uni.navigateTo({
					url: '../subpages/index/login',
				});
			}
			
		},
	}
</script>

<style lang="scss">
	.top-content{
		width: 100%;
		height: 400rpx;
		background: #39B54A;
		display: flex;
		justify-content: center;
		align-items: center;
		.img-box{
			width: 100rpx;
			height: 100rpx;
			border: 1px solid #DDDDDD;
			border-radius: 50%;
			.img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			
		}
		.txt{
			text-align: center;
			color: #FFFFFF;
		}
		.userinfo{
			margin-left: 100rpx;
			.txt{
				text-align: right;
			}
			
		}
	}

</style>
