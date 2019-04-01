<template lang="pug">
	#counter-display
		.display
			.title {{ title.toUpperCase() }}
			.counter {{ value }}

		.controls(v-if="hasControl")
			el-button(type="primary" icon="el-icon-minus" @click="decrementCounter()")
			el-button(type="secondary" icon="el-icon-delete" @click="resetCounter()")
			el-button(type="primary" icon="el-icon-plus" @click="incrementCounter()")

</template>

<script>
export default {
	name: 'CounterDisplay',

	props: {
		value: {
			type: Number,
			required: true
		},

		title: {
			type: String,
			required: true
		},

		hasControl: {
			type: Boolean,
			default: false
		}
	},

	methods: {

		decrementCounter() {
			this.$emit('on-decrement');
		},

		resetCounter() {
			this.$emit('on-reset');
		},

		incrementCounter() {
			this.$emit('on-increment');
		}
	}
};
</script>

<style lang="sass" scoped>
	@import '../../styles/tools/variables'

	#counter-display
		display: flex
		flex-direction: column
		align-items: center
		max-width: 340px
		background-color: $--border-color-extra-light
		padding: 20px 0
		margin-top: 20px
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

		.display
			background-color: $--color-white
			width: 300px
			border: 1px solid $--color-primary
			border-radius: $--border-radius-base
			padding: 10px
			display: flex
			justify-content: space-between
			align-items: center

			.title
				color: $--color-primary
				font-size: 13px

			.counter
				color: $--color-primary
				font-size: 20px
				font-weight: bold

		.controls
			margin-top: 20px


</style>
