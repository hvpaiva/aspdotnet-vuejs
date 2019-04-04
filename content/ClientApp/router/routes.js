import Home from '../components/views/Home';
import NotFound from '../components/views/NotFound';

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
	},
	{ name: '404', path: '/404', component: NotFound },
	{ name: 'catchAll', path: '*', redirect: '/404' }
];

export default routes;
