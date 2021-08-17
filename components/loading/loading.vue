<template>
	<view class="outWrapper flex align-center justify-center" :style="{ height: height }">
		<image src="/static/loading/loading.gif" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		name:"loading",
		props: {
			height: {
				type: String,
				default() {
					return '100vh';
				}
			}
		},
		data() {
			return {
				ifNeedLoadIng: false
			};
		}
	}
</script>

<style lang="scss" scoped>
	.outWrapper {
		background-color: #fff;
		position: absolute;
		width: 100vw;
		left: 0;
		bottom: 0;
		z-index: 9999999999999999;
	}

</style>
