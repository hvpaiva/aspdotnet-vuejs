import { DECREMENT_COUNTER, INCREMENT_COUNTER, RESET_COUNTER } from '../mutation-types';

export const COUNTER_OPERATIONS = {
	INCREMENT: 0,
	DECREMENT: 1,
	RESET: 2
};

const INITIAL_STATE = {
	counter: 0
};

const state = Object.assign({}, INITIAL_STATE);

const getters = {
	counter: state => state.counter
};

const mutations = {
	[INCREMENT_COUNTER]: state => state.counter++,

	[DECREMENT_COUNTER]: state => state.counter--,

	[RESET_COUNTER]: state => {
		state.counter = INITIAL_STATE.counter;
	}
};

const actions = {
	operation: ({ commit }, operation) => {
		switch (operation) {
		case COUNTER_OPERATIONS.INCREMENT:
			commit(INCREMENT_COUNTER);
			break;
		case COUNTER_OPERATIONS.DECREMENT:
			commit(DECREMENT_COUNTER);
			break;
		case COUNTER_OPERATIONS.RESET:
			commit(RESET_COUNTER);
			break;
		default:
			console.error('No operation defined.');
		}
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
