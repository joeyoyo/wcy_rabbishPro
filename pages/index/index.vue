<template>
	<view>
		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="url + item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { apiGetSwiper } from '@/apis/api.js';
	export default {
		data() {
			return {
				swiperList: [],
				url:'http://localhost:3000/'
			};
		},
		onLoad() {
			this.apiGetSwiper()
		},
		methods: {
			makeImgUrl(path){
				return 'http://localhost:3000/' + path
			},
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
			
		}
	}
</script>

<style>
</style>
