<template lang="pug">
	#counter

		card-container(title="Counter")

			el-row(:gutter="20")
				el-col(:span="24")

					p This is a simple example of a Vue.js component & Vuex

			el-row(:gutter="20")
				el-col(:span="12")

					counter-display(
						:value="counter"
						:has-control="true"
						title="Current count (Vuex)"
						@on-increment="incrementCounter"
						@on-reset="resetCounter"
						@on-decrement="decrementCounter"
					)

				el-col(:span="12")

					counter-display(:value="autoCount" title="Auto count")

</template>

<script>
import { mapGetters } from 'vuex';
import CounterDisplay from '../elements/CounterDisplay';
import CardContainer from '../layouts/CardContainer';
import { COUNTER_OPERATIONS } from '../../store/modules/counter';

export default {

	name: 'Counter',
	components: { CardContainer, CounterDisplay },
	data() {
		return {
			autoCount: 0
		};
	},

	computed: {
		...mapGetters([
			'counter'
		])
	},

	created() {
		setInterval(() => {
			this.autoCount++;
		}, 1000);
	},

	methods: {

		incrementCounter() {
			this.$store.dispatch('operation', COUNTER_OPERATIONS.INCREMENT);
		},

		resetCounter() {
			this.$store.dispatch('operation', COUNTER_OPERATIONS.RESET);
		},

		decrementCounter() {
			this.$store.dispatch('operation', COUNTER_OPERATIONS.DECREMENT);
		}
	}
};
</script>

<style lang="sass" scoped>
	#counter

		p
			margin: 0
</style>
