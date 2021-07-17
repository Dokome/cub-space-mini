<template>
	<view :style="[
		{ height: CustomBar - StatusBar + 'px' },
		{ display: ifNavDisplay }
	]">
		<view 
			class="flex justify-center align-center" 
			:style="[
				{ height: CustomBar - StatusBar + 'px' }, 
				{ marginTop: StatusBar + 'px' },
			]"
			>
			标题
		</view>		
	</view>
</template>

<script>
	export default {
		name:"navbar",
		props: {
			ifNavDisplay: {
				type: String,
				default: 'flex'
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		}
	}
</script>

<style lang="scss">

</style>
