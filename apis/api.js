import request from '@/utils/request/index.js'
/* 
 * 用途：用户模块
 * hideLoading : true的话，可以在vue里自己定义loading样式。否则统一为显示加载中样式
 * restful ：true表示则是在路径末尾上加上传参的值，否则为一般的get传参
 * restfulB ：true表示则是在路径末尾上加上&传参的值 ，否则为一般的get传参
 * restfulC ：true表示则是在路径末尾上加上传参的值，否则为一般的POST传参
 */

// const baseUrl = "/api/user/" //基础模块名

// // 注册
// export function apiRegister(data) {
// 	return request.request({
// 		url: baseUrl + 'registe',
// 		method: 'POST',
// 		data,
// 		hideLoading: true

// 	})
// }
// // 验证手机号是否存在
// export function apiIsPhone(data) {
// 	return request.request({
// 		url: baseUrl + 'is-name-exist',
// 		method: 'GET',
// 		data,
// 		hideLoading: true,
// 	})
// }
// // 验证邮箱是否存在
// export function apiIsEmail(data) {
// 	return request.request({
// 		url: baseUrl + 'is-email-exist',
// 		method: 'GET',
// 		data,
// 		hideLoading: true
// 	})
// }
// // 验证用户名是否存在
// export function apiIsName(data) {
// 	return request.request({
// 		url: baseUrl + 'is-name-exist',
// 		method: 'GET',
// 		data,
// 		hideLoading: true,
// 		restful: true
// 	})
// }

//登录接口
export function apiLogin(data) {
	return request.request({
		url:'/login',
		method: 'POST',
		data,
		hideLoading: true
	})
}
//注册接口
export function apiRegister(data) {
	return request.request({
		url:'/register',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//获取轮播图
export function apiGetSwiper(data) {
	return request.request({
		url: '/slide',
		method: 'GET',
		data,
		hideLoading: true
	})
}

//获取产品列表
export function apiGetGoods(data) {
	return request.request({
		url: '/goods',
		method: 'GET',
		data,
		hideLoading: true
	})
}

//获取公司简介信息
export function apiGetCompany(data) {
	return request.request({
		url: '/company',
		method: 'GET',
		data,
		hideLoading: true
	})
}

//获取用户信息
export function apiGetUser(data) {
	return request.request({
		url: '/user',
		method: 'GET',
		data,
		hideLoading: true
	})
}

//微信授权登录
export function apiWxLogin(data) {
	return request.request({
		url: '/wxLogin',
		method: 'POST',
		data,
		hideLoading: true
	})
}


//下单
export function apiAddOrder(data) {
	return request.request({
		url: '/addOrder',
		method: 'POST',
		data,
		hideLoading: true
	})
}
//历史订单
export function apiGetOrder(data) {
	return request.request({
		url: '/order',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//修改密码发送验证码
export function apiSendcode(data) {
	return request.request({
		url: '/sendCode',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//修改密码
export function apiModifyPassword(data) {
	return request.request({
		url: '/modifyPassword',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//绑定邮箱发送验证码
export function apiBindEmailCode(data) {
	return request.request({
		url: '/bindEmailCode',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//绑定邮箱
export function apiBindEmail(data) {
	return request.request({
		url: '/bindEmail',
		method: 'POST',
		data,
		hideLoading: true
	})
}

//联系我们
export function apiGetContactus(data) {
	return request.request({
		url: '/contactUs',
		method: 'GET',
		data,
		hideLoading: true
	})
}



