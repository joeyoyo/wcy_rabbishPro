<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面colorUI公共css */
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	
	@import './common/css/common.scss';
	@import './common/css/iconfont.css';
	@import './static/fonts/app_icon.css';
</style>
