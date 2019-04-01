import Vue from 'vue';
import Vuex from 'vuex';

import logger from '../utils/helpers/vuex-logger';
import counter from './modules/counter';
import weather from './modules/weather';

Vue.use(Vuex);

const debugMode = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	modules: {
		counter,
		weather
	},
	strict: debugMode,
	plugins: debugMode ? [logger()] : []
});
