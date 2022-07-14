<template>
	<view class="content">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft">
			<block slot="left"><uniIcon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">忘记密码</view>
		</uni-nav-bar>
		<!-- <view class="cu-form-group">
			<view class="title">账号</view>
			<input placeholder="请输入账号" v-model="username"></input>
		</view> -->
		<view class="cu-form-group">
			<view class="title">邮箱</view>
			<input placeholder="请输入邮箱" v-model="email"></input>
			
		</view>
		<view class="cu-form-group">
			<view class="title">验证码</view>
			<input placeholder="输入框验证码" v-model="code" name="input"></input>
			<button class='cu-btn bg-green shadow' v-if="!codeStatus" @tap="getCode">获取验证码</button>
		    <button class='cu-btn shadow' disabled v-if="codeStatus">已发送</button>
		</view>
		<view class="cu-form-group">
			<view class="title">新密码</view>
			<input class="input-row" placeholder="请输入密码" :type="eyeStatus?'password': 'text'" v-model="password"></input>
			<text class="cuIcon-attention" v-if="eyeStatus" @tap="eyeTap"></text>
			<text class="cuIcon-attentionfill" v-if="!eyeStatus" @tap="eyeTap"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">新密码</view>
			<input class="input-row" placeholder="请重新确认密码" :type="eyeStatus?'password': 'text'" v-model="password2"></input>
			<text class="cuIcon-attention" v-if="eyeStatus" @tap="eyeTap"></text>
			<text class="cuIcon-attentionfill" v-if="!eyeStatus" @tap="eyeTap"></text>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="apiSure">确认</button>
		</view>
		
	</view>
</template>

<script>
	import { apiSendcode,apiModifyPassword} from '@/apis/api.js';
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
				code:'',
				eyeStatus:false,
				codeStatus:false
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
			//获取验证码
			getCode(){
				let obj = {
					email:this.email
				}
				apiSendcode(obj).then(res=>{
					console.log(res);
					if(res.code === 200){
						uni.showToast({
							icon:'none',
							title:res.message
						})
						this.codeStatus = true
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
			eyeTap(){
				this.eyeStatus = !this.eyeStatus
			},
			//修改密码请求确认
			apiSure() {
				let obj = {
					// username:this.username,
					password:this.password,
					email:this.email,
					code:this.code
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
				apiModifyPassword(obj).then(res=>{
					console.log(res);
					if(res.code === 200){
						uni.showToast({
							title:res.message,
						})
						setTimeout(() =>{
							uni.navigateBack({
								delta: 1
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
