<template>
	<view class="content">
		<view class="cu-form-group">
			<view class="title">账号</view>
			<input placeholder="请输入账号" v-model="username"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">密码</view>
			<input class="input-row" placeholder="请输入密码" :type="eyeStatus?'password': 'text'" v-model="password"></input>
			<text class="cuIcon-attention" v-if="eyeStatus" @tap="eyeTap"></text>
			<text class="cuIcon-attentionfill" v-if="!eyeStatus" @tap="eyeTap"></text>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="apiLogin">登录</button>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-green margin-tb-sm lg" @tap="apiRegister">注册</button>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	import { apiLogin} from '@/apis/api.js';
	export default {
		data() {
			return {
				username:'',
				password:'',
				eyeStatus:false
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['SET_TOKEN']),
			eyeTap(){
				this.eyeStatus = !this.eyeStatus
			},
			//请求登录
			apiLogin() {
				let obj = {
					username:this.username,
					password:this.password
				}
				apiLogin(obj).then(res=>{
					console.log(res);
					if(res.code === 200){
						//请求成功后，token 用于后面其他请求接口头部条件，
						this.SET_TOKEN(res.token) //把token存到vuex
						uni.switchTab({
							url: '../../account/index'
						});
					}else{
						uni.showToast({
							icon:'none',
							title: res.message
						});
					}
					
				}).catch(err=>{
					console.log(err);
				})
			},
			apiRegister(){
				uni.navigateTo({
					url: 'register',
				});
				
			}

		}
	}
</script>

<style lang="scss">
	.content {
		margin: 20rpx 0;
	}
	.cu-form-group{
		.input-row {
			flex: 1;
			height: 75rpx;
			font-size: 32rpx;
			line-height: 75rpx;
			border: none;
			color: $uni-text-color-deep;
			&::-webkit-input-placeholder {
				font-size: 30rpx;
			}
			&:focus {
				outline: none;
			}
		}
		
	}

	
</style>
