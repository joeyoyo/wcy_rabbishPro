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
	</view>
</template>

<script>
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
					return 'http://127.0.0.1:3000' + this.accountInfo['avtar']
					
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
						setTimeout(()=>{
							uni.navigateTo({
								url: '../subpages/index/login',
							});
						}, 100);
					}
					
				}).catch(err=>{
					console.log(err);
				})
			},
			
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
