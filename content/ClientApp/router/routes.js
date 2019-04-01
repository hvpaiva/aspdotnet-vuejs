import Home from '../components/views/Home';

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home,
		display: 'Home',
		icon: 'home'
	},
	{
		name: 'counter',
		path: '/counter',
		component: () => import('../components/views/Counter'),
		display: 'Counter',
		icon: 'graduation-cap'
	},
	{
		name: 'weather',
		path: '/weather',
		component: () => import('../components/views/WeatherForecast'),
		display: 'Weather forecast',
		icon: 'list'
	}
];

export default routes;
