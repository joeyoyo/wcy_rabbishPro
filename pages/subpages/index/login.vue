<template>
	<view class="content">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft">
			<block slot="left"><uniIcon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">登陆页</view>
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
		<view class="padding">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="apiLogin">登录</button>
		</view>
		<view class="padding">
			<button class="cu-btn block bg-green margin-tb-sm lg" @tap="apiRegister">注册</button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="wx">
				<view class="wx-title">
					<text>——</text>
					<text class="txt">第三方账号登录</text>
					<text>——</text>
				</view>
				<button @tap="getUserProfile" class="btn">
					<view class="wx-img"><image src="/static/image/login/weixin.png" class="img" mode="aspectFit"></image></view>
				</button>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import { mapMutations } from 'vuex';
	import { apiLogin,apiWxLogin} from '@/apis/api.js';
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
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
			goLeft() {
				uni.navigateBack({
					delta: 1
				});
			},
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
							url: '../../account/index',
						});
						
					}else{
						//登录失败统一操作
						uni.showToast({
							icon:'none',
							title: res.message
						});
						//清空操作
						this.username = ''
						this.password = ''
					}
					
				}).catch(err=>{
					console.log(err);
				})
			},
			apiRegister(){
				uni.navigateTo({
					url: 'register',
				});
				
			},
			//微信登录
			getUserProfile () {
			    var p1 = new Promise((resolve, reject) => {
				  //使用wx.login拿到code
			      wx.login({
			        success: res => {
			          // 这里也可以选择性返回需要的字段
			          resolve(res)
			        }
			      })
			    })
				//使用 wx.getUserProfile拿到用户信息
			    var p2 = new Promise((resolve, reject) => {
			      wx.getUserProfile({
			        desc: '用于完善会员资料',
			        success: res => {
			          // 这里也可以选择性返回需要的字段
			          resolve(res)
			        }
			      })
			    })
			    // 同时执行p1和p2，并在它们都完成后执行then
			    Promise.all([p1, p2]).then((results) => {
				  console.log('results',results);
			      // results是一个长度为2的数组，放置着p1、p2的resolve
			      this.handleUserInfo({
			      	  // 这里也可以选择性返回需要的字段
			          ...results[0],
			          ...results[1]
			      })
			    })
			  },
			  // 组织好后端需要的字段，并调用接口
			  handleUserInfo (data) {
				console.log(data);
			  	const { code, encryptedData, userInfo, iv, rawData, signature, cloudID } = data
			  	const params = {
			  	  userInfo,
				  code
			  	}
				// 535489341e74341871b6647ffd488162
			  	// 调用接口维护本地登录态
				console.log(params);
				this.apiWxLogin(params)
			  },
			  //微信授权登录
			  apiWxLogin(params) {
			  	apiWxLogin(params).then(res=>{
			  		if(res.code === 200){
			  			//请求成功后，token 用于后面其他请求接口头部条件，
			  			this.SET_TOKEN(res.token) //把token存到vuex
			  			uni.switchTab({
			  				url: '../../account/index',
			  			});
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
	.wx {
		width: 100%;
		text-align: center;
		margin-top: 50rpx;
		.wx-title {
			color: #dddddd;
			.txt {
				padding: 0 20rpx;
			}
		}
		.btn{
			width: 200rpx;
			border: none;
			background:#FFFFFF;
			box-shadow: none;
		}
		.wx-img {
			.img {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}

	
</style>
