<template lang="pug">
	#app
		el-container

			el-header
				header-layout(title="ASP.NET & Vue Template")

			el-main
				view-layout
					router-view

</template>

<script>
import HeaderLayout from 'components/layouts/HeaderLayout';
import ViewLayout from 'components/layouts/ViewLayout';

export default {

	name: 'App',

	components: {
		ViewLayout,
		HeaderLayout
	}
};
</script>

<style lang="sass">
	@import "../styles/tools/variables"

	#app
		background-color: $--border-color-extra-light
		width: 100%
		min-height: 100vh
		padding-bottom: 40px

		.el-container
			justify-content: center

			.el-header
				padding: 0

			.el-main
				display: flex
				justify-content: center
</style>
