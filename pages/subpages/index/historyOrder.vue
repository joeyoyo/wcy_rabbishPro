<template>
	<view class="box">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="backTap">
			<block slot="left"><uniIcon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">历史订单</view>
		</uni-nav-bar>
		<view class="page-content">
			<mescroll-uni ref="mescroll" :fixed="false" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback"
			 @up="upCallback">
				<view v-if="statusList.length">
					<view class="tit-bar">
						<picker class="switch-bar" @change="bindPickerChange" :value="index" :range="statusList">
							<view class="uni-input">{{ statusList[index] }}</view>
						</picker>
					</view>
				</view>
				<view class="site" v-for="(item,index) in detail" :key="index">
					<view class="site-info" @tap="listTap(item)">
						<view class="title">
							<text>{{item.goods_name}}</text>
							<text :class="['status',item.status === 0 ?'txt-wait':'',item.status === 1 ?'txt-ok':'',item.status === 2 ?'txt-finish':'',item.status === 3 ?'txt-close':'']">{{statusList[item.status + 1]}}</text>
						</view>
						<view class="location">
							<text>地址:{{ item.province}}{{item.city}}{{item.area}}{{item.address}}</text>
						</view>
						<view class="info">
							<text class="info-txt">
								联系人：
								<text class="num">{{item.name}}</text>
							</text>
							<text class="info-txt">
								时间：
								<text class="warning">{{item.time}}</text>
							</text>
						</view>
					</view>
				</view>
				<view class="empty" v-if="detail.length === 0">
					暂无数据
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		apiGetOrder
	} from '@/apis/api.js';
	export default {
		components: {
			MescrollUni,
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				statusList: ['全部', '待接单', '已接单', '已完成', '已关闭'],
				status: '',
				mescroll: null, // mescroll实例对象
				index: 0,
				detail: [],
				// 下拉刷新的常用配置
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 2 // 每页数据的数量,默认10
					}
				},
			};
		},
		onShow() {
			this.getDetail();
		},
		onHide() {},
		computed: {
		},
		methods: {
			backTap() {
				uni.navigateBack({
					delta: 1
				});
			},
			...mapMutations(['storeLoadFail']),
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value);
				this.index = e.detail.value;
				this.status = this.index - 1
				if(this.status === -1){
					this.status = ''
				}
				console.log(this.status);
				this.getDetail();
			},
			// 获取分頁數據
			getList(page,pageSize,status, successCallback, errorCallback) {
				const params = {
					page,
					pageSize,
					status
				};
				console.log(params);
				apiGetOrder(params).then(
					res => {
						//联网成功的回调
						successCallback && successCallback(res);
					},
					res => {
						//联网失败的回调
						errorCallback && errorCallback();
					}
				);
			},
			getDetail() {
				this.getList(1,2, this.status, res => {
					if(res.code === 200){
						this.detail = res.response;
					}
					console.log(res);
				});
				// this.downCallback(this.mescroll);
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getList(
					mescroll.num,
					mescroll.size,
					this.status,
					res => {
						console.log(mescroll.num);
						console.log(mescroll.size);
						mescroll.endSuccess(res.response.length);
						//设置列表数据
						if (mescroll.num == 1) {
							this.detail = []; //如果是第一页需手动置空列表
						}
						this.detail = this.detail.concat(res.response);
						// console.log(this.detail);
						// 后台接口有返回列表的总数据量 totalSize
						// mescroll.endBySize(10, res.data.total); //必传参数(当前页的数据个数, 总数据量)
						// mescroll.endSuccess();
					},
					() => {
						//联网失败的回调,隐藏下拉刷新的状态
						mescroll.endErr();
					}
				);
			},
			listTap(item) {
				console.log(item);
				if (item.status === 0) {
					uni.navigateTo({
						url: '/pages/subpages/account/edit-order?item=' + encodeURIComponent(JSON.stringify(item))
					});
				}
			},
		}
	};
</script>

<style lang="scss">
	page,
	.box {
		height: 100%;
	}

	.tit-bar {
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.empty {
		width: 100%;
		text-align: center;
		margin-top: 40px;
	}

	.search {
		flex: 1;
	}

	.search-form {
		border-radius: 10rpx;
		margin: 0;
	}

	.switch-bar {
		position: relative;
		width: 100%;
		height: 64rpx;
		background-color: #f4f5f7;
		line-height: 64rpx;
		border-radius: 10rpx;
		padding-left: 10rpx;

		&::after {
			content: '';
			position: absolute;
			top: 22rpx;
			right: 22rpx;
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 18rpx solid $uni-triangle-color;
		}
	}

	.btn {
		width: 15%;
		height: 64rpx;
		line-height: 64rpx;
		font-size: 24rpx;
		background-color: #f4f5f7;
		margin-left: 20rpx;
		border: none;
	}

	.site {
		display: flex;
		padding: 30rpx;
		line-height: 1.8;
		align-items: center;
		border-bottom: 1px solid $uni-border-color;

		&:last-child {
			border: none;
		}

		.img {
			width: 200rpx;
			height: 150rpx;
		}
	}

	.site-info {
		flex: 1;
		padding-left: 20rpx;

		.title {
			display: flex;
			align-items: center;
			font-size: 34rpx;
			font-weight: 500;
			color: $uni-text-color-deep;
			justify-content: space-between;

			.status {
				color: #666666;
				font-size: 28rpx;
			}

			.txt-wait {
				color: red;
			}

			.txt-ok {
				color: blue;
			}

			.txt-finish {
				color: yellow;
			}

			.txt-close {
				color: #666666;
			}

			image {
				width: 36rpx;
				height: 36rpx;
				margin-left: 10rpx;
			}
		}

		.location {
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 24rpx;
		}
	}
	.info{
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
	}

</style>
