export class Notification {
	/**
	 * Show success notification
	 *
	 * @param {Object} vueInstance - Vue instance
	 * @param {String} message - Message which to display on Notification
	 */
	static success(vueInstance, message) {
		vueInstance.$notify({
			type: 'success',
			title: 'Success',
			message,
			duration: 3500
		});
	}

	/**
	 * Show error notification
	 *
	 * @param {Object} vueInstance - Vue instance
	 * @param {String} message - Message which to display on Notification
	 */
	static error(vueInstance, message) {
		vueInstance.$notify({
			type: 'error',
			title: 'Something went wrong',
			message,
			duration: 5000
		});
	}

	/**
	 * Show warn notification
	 *
	 * @param {Object} vueInstance - Vue instance
	 * @param {String} message - Message which to display on Notification
	 */
	static warning(vueInstance, message) {
		vueInstance.$notify({
			type: 'warning',
			title: 'Something went wrong',
			message,
			duration: 5000
		});
	}

	/**
	 * Show info notification
	 *
	 * @param {Object} vueInstance - Vue instance
	 * @param {String} message - Message which to display on Notification
	 */
	static info(vueInstance, message) {
		vueInstance.$notify({
			type: 'info',
			title: 'Info',
			message,
			duration: 5000
		});
	}
}
