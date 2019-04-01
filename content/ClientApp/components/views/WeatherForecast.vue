<template lang="pug">
	#weather-forecast

		card-container(title="Weather forecast")

			el-row(:gutter="20")
				el-col(:span="24")

					p This component demonstrates fetching data from the server.

			el-row(:gutter="20")
				el-col(:span="24")

					data-table(
						:data="forecasts",
						:total-in-server="tableOptions.totalInServer"
						:columns="columns"
						:current-page="tableOptions.currentPage"
						:numPerPage="tableOptions.pageSize"
						:loader="loader"
						@current-page="loadPage"
						@size-table="size"
					)

</template>

<script>
import { mapGetters } from 'vuex';
import CardContainer from '../layouts/CardContainer';
import DataTable from '../elements/DataTable';
import TableColumnComposer from '../../utils/helpers/table-column-composer';
import { Notification } from '../../utils/helpers/notification';
import WeatherForecast from '../../models/WeatherForecast';

export default {

	name: 'WeatherForecast',

	components: { DataTable, CardContainer },

	data() {
		return {
			columns: TableColumnComposer.compose(WeatherForecast),
			loader: false
		};
	},

	computed: {
		...mapGetters([
			'forecasts',
			'hasForecasts',
			'tableOptions'
		])
	},

	created() {
		if (!this.hasForecasts) this.loadPage(this.tableOptions.currentPage);
	},

	methods: {
		async loadPage(page) {
			this.loader = true;

			this.$store.dispatch('fetchForecasts', page)
				.then(() => {
					Notification.success(this, 'Forecasts fetched successfully.');
				})
				.catch(() => {
					Notification.error(this, 'Error fetching forecasts.');
				})
				.finally(() => {
					this.loader = false;
				});
		},

		async size(sizeTable) {
			this.$store.dispatch('changePageSize', sizeTable)
				.finally(() => this.loadPage(this.tableOptions.currentPage));
		}
	}
};
</script>

<style>
</style>
