<template lang="pug">
	#data-table

		h3.title-section(v-if="title") {{ title }}

		el-table(
			ref="multipleTable"
			v-loading="loader"
			:data="data"
			:height="height"
			@select-all="handleSelectionChange"
			@select="handleSelectionChange",
		)
			.columns(v-for="(column, index) in columns" :key="index")
				el-table-column(
					:type="column.type"
					:label="column.label"
					:width="column.width"
					:property="column.property"
					:show-overflow-tooltip="column.showOverflowTooltip"
				)

		el-pagination.pagination( v-if="pagination"
			:total="totalInServer"
			:page-size="numDataPerPage"
			@current-change="updatePage"
			:current-page.sync="actualPage"
			:layout="paginationLayout"
			@prev-click="prevPage"
			@next-click="nextPage"
			@size-change="sizeChange"
		)
</template>

<script>
export default {

	name: 'DataTable',

	props: {

		title: {
			type: String,
			default: null
		},

		data: {
			type: Array,
			required: true
		},

		totalInServer: {
			type: Number,
			default: 0
		},

		columns: {
			type: Array,
			required: true
		},

		pagination: {
			type: Boolean,
			default: true
		},

		paginationLayout: {
			type: String,
			default: 'total, sizes, prev, pager, next'
		},

		height: {
			type: Number,
			default: null
		},

		currentPage: {
			type: Number,
			default: 1
		},

		loader: {
			type: Boolean,
			default: true
		},

		numPerPage: {
			type: Number,
			default: 10
		}

	},

	data() {
		return {
			dataToTable: [],
			numDataPerPage: this.numPerPage,
			numMaxPage: 0,
			selectedData: null,
			actualPage: 0
		};
	},

	created() {
		this.actualPage = this.currentPage;
	},

	methods: {

		handleSelectionChange(selected) {
			this.selectedData = selected;

			this.$emit('selected-fields', selected);
		},

		prevPage(page) {
			this.$emit('current-page', page);
		},

		nextPage(page) {
			this.$emit('current-page', page);
		},

		sizeChange(size) {
			this.$emit('size-table', size);
		},

		updatePage(page) {
			this.$emit('current-page', page);
		}

	}

};
</script>

<style lang="sass" scoped>
	@import "../../styles/tools/variables"

	#data-table
		position: relative
		padding: 20px
		border-radius: 4px

		.title-section
			margin-bottom: 20px

		.pagination
			margin-top: 20px

</style>
