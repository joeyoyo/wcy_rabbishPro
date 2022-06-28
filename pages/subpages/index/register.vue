<template>
	<view class="content">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft">
			<block slot="left"><uniIcon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">注册页</view>
		</uni-nav-bar>
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
		<view class="cu-form-group">
			<view class="title">密码</view>
			<input class="input-row" placeholder="请重新确认密码" :type="eyeStatus?'password': 'text'" v-model="password2"></input>
			<text class="cuIcon-attention" v-if="eyeStatus" @tap="eyeTap"></text>
			<text class="cuIcon-attentionfill" v-if="!eyeStatus" @tap="eyeTap"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">邮箱</view>
			<input placeholder="请输入邮箱" v-model="email"></input>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="apiSure">确认</button>
		</view>
		
	</view>
</template>

<script>
	import { apiRegister} from '@/apis/api.js';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				username:'',
				password:'',
				password2:'',
				email:'',
				eyeStatus:false
			}
		},
		onLoad() {

		},
		methods: {
			goLeft() {
				uni.navigateBack({
					delta: 1
				});
			},
			eyeTap(){
				this.eyeStatus = !this.eyeStatus
			},
			//请求确认
			apiSure() {
				let obj = {
					username:this.username,
					password:this.password,
					email:this.email,
				}
				
				Object.keys(obj).forEach((key)=>{
					if(!obj[key]){
						uni.showToast({
							icon:'none',
							title:key + '不能为空'
						})
						return false
					}
				})
				apiRegister(obj).then(res=>{
					console.log(res);
					if(res.code === 200){
						uni.showToast({
							title:res.message,
						})
						setTimeout(() =>{
							uni.navigateTo({
								url: 'login',
							});
						}, 1000);
					}else{
						uni.showToast({
							icon:'none',
							title:res.message
						})
					}
				}).catch(err=>{
					console.log(err);
				})
			},

		}
	}
</script>

<style lang="scss">
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
