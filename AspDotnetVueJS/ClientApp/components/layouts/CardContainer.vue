<template lang="pug">
	#card-container
		el-card
			h3.title {{ title }}
			slot

</template>

<script>
export default {
	name: 'CardContainer',

	props: {
		title: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="sass" scoped>
	@import "../../styles/tools/variables"

	#card-container
		.title
			color: $--color-text-secondary
			margin-bottom: 20px
</style>
