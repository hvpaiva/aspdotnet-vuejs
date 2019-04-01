import Axios from 'axios';

const ForecastService = {

	fetch: async (to, from) => Axios.get(
		`/api/weather/forecasts?from=${from}&to=${to}`
	)
};

export default ForecastService;
