<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			};
		},
		onLoad(data) {
			this.src = data.src;
		}
	}
</script>

<style lang="scss">

</style>
