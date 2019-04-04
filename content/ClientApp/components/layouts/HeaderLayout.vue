<template lang="pug">
	#header-layout
		h2.title {{ title }}
		el-menu(mode="horizontal" :default-active='activeRouter' :router="true")
			el-menu-item(
				v-for="(route, index) in displayedRoutes"
				:key="index"
				:index="route.name"
				:route="route"
			)
				icon.menu-icon(:icon="route.icon")
				| {{ route.display }}
</template>

<script>
import routes from '../../router/routes';

export default {

	name: 'HeaderLayout',

	props: {
		title: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			routes
		};
	},

	computed: {
		activeRouter() {
			return this.$route.name;
		},

		displayedRoutes() {
			return this.routes.filter(r => r.display);
		}
	}
};
</script>

<style lang="sass" scoped>
	#header-layout
		display: flex
		justify-content: space-around
		align-items: center
		background-color: white
		border-bottom: 1px solid #e6e6e6

		.title
			margin: 0

		.menu-icon
			margin-right: .5rem
</style>
