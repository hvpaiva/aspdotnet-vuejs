// Core imports
import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import router from './router/index';
import store from './store';
import App from './components/App';
import { FontAwesomeIcon } from './icons';

// 3th imports
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

// CSS imports
import './styles/main.sass';

// Configurations
Vue.use(ElementUI, { locale });
Vue.component('icon', FontAwesomeIcon);
Vue.prototype.$http = axios;
sync(store, router);

// Mode details on: https://vuejs.org/v2/guide/components-registration.html
const requireComponent = require.context(
	// The relative path of the components folder
	'./components',
	// Whether or not to look in subfolders
	true,
	// The regular expression used to match base component filenames
	/base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName);

	// Get PascalCase name of component
	const componentName = upperFirst(
		camelCase(
			// Strip the leading `./` and extension from the filename
			fileName.replace(/base/, '').replace(/^\.\/(.*)\.\w+$/, '$1')
		)
	);

	// Register component globally
	Vue.component(
		componentName,
		// Look for the component options on `.default`, which will
		// exist if the component was exported with `export default`,
		// otherwise fall back to module's root.
		componentConfig.default || componentConfig
	);
});

new Vue({ // eslint-disable-line
	el: '#app',
	store,
	router,
	...App
});
