<template>
	<view class="page-box">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft">
			<block slot="left"><uni-icon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">联系我们</view>
		</uni-nav-bar>
		<view class="page-content">
			<view class="rich">
			     <rich-text :nodes="strings"></rich-text>
			</view>
		</view>
	</view>
</template>
<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import { apiGetContactus} from '@/apis/api.js';
export default {
	components: {
		uniNavBar,
		uniIcon
	},
	data() {
		return {
			strings:''
		
		};
	},
	onLoad(options) {
		this.GetContactus()
	},
	methods: {
		goLeft() {
			uni.navigateBack({
				delta: 1
			});
		},
		GetContactus(){
			apiGetContactus().then(res => {
				uni.showLoading({
				    title: '加载中'
				});
				console.log(res);
				if(res.code === 200){
					let str = res.response[0].data
					str = str.replace(/(\\)/g, ""); // 去掉\
					this.strings = str
				}
				uni.hideLoading();
			}).catch(err =>{
				console.log(err);
				uni.hideLoading();
			});
			
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
}
.rich{
	width: 92%;
	margin: 55rpx auto 0 auto;
}
img{
	width: 40rpx !important;
}

</style>
