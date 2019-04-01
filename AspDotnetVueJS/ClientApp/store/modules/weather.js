import {
	SET_CURRENT_PAGE,
	SET_FORECASTS, SET_PAGE_SIZE,
	SET_TOTAL_IN_SERVER
} from '../mutation-types';
import ForecastService from '../../services/forecast-service';

const from = () => (state.tableOptions.currentPage - 1) * state.tableOptions.pageSize;

const to = () => from() + state.tableOptions.pageSize;

const INITIAL_STATE = {
	forecasts: [],
	tableOptions: {
		currentPage: 1,
		totalInServer: 0,
		pageSize: 10
	}
};

const state = Object.assign({}, INITIAL_STATE);

const getters = {
	forecasts: state => state.forecasts,

	hasForecasts: state => state.forecasts.length !== 0,

	tableOptions: state => state.tableOptions
};

const mutations = {
	[SET_FORECASTS]: (state, forecasts) => {
		state.forecasts = forecasts;
	},

	[SET_TOTAL_IN_SERVER]: (state, totalInServer) => {
		state.tableOptions.totalInServer = totalInServer;
	},

	[SET_PAGE_SIZE]: (state, pageSize) => {
		state.tableOptions.pageSize = pageSize;
	},

	[SET_CURRENT_PAGE]: (state, currentPage) => {
		state.tableOptions.currentPage = currentPage;
	}
};

const actions = {
	fetchForecasts: async ({ commit }, page) => {
		commit(SET_CURRENT_PAGE, page);

		const response = await ForecastService.fetch(to(), from());
		commit(SET_FORECASTS, response.data.forecasts);
		commit(SET_TOTAL_IN_SERVER, response.data.total);
	},

	changePageSize: ({ commit }, pageSize) => {
		commit(SET_PAGE_SIZE, pageSize);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
