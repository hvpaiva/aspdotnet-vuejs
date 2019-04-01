// This is a helper to compose columns to the el-table dynamically

const unCamelCase = str => str
	.replace(/([a-z])([A-Z])/g, '$1 $2')
	.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
	.replace(/^./, str => str.toUpperCase());

const createLabels = (property) => unCamelCase(property);

/**
 * This is necessary because the table component of element-ui, when in a v-for, sets the
 * first column to the end. So, here, we put the real last option to start.
 * @param columns - The columns of the table
 */
const resolveOrder = (columns) => {
	const lastOption = columns[columns.length - 1];

	const oldOptions = columns.filter(op => op !== lastOption);
	const newOptions = [];

	newOptions.push(lastOption);
	newOptions.push(...oldOptions);

	return newOptions;
};

class TableColumnComposer {
	/**
	 * Compose the column array by receiving the column objects.
	 * @param columns - The array of columns.
	 * @returns {Array} - The reordered array of columns.
	 */
	static composeColumns(columns) {
		return resolveOrder(columns);
	}

	/**
	 * Compose the array of columns for some object.
	 * @param model - The object showed in the table. CANNOT have inner objects.
	 * @param options - Object with another options for the columns.
	 *                  Each option is an array for each model attribute.
	 * @returns {Array} - The reordered array of columns.
	 */
	static compose(model, options) {
		const columns = [];

		const modelAsArray = Object.entries(model).map(o => o[0]);

		modelAsArray.forEach(property => {
			columns.push(this.newColumn(
				options && options.labels && options.labels.length === modelAsArray.length
					? options.labels[modelAsArray.indexOf(property)]
					: createLabels(property),
				property,
				options
					? options[modelAsArray.indexOf(property)]
					: null
			));
		});

		return resolveOrder(columns);
	}

	/**
	 * Creates an column.
	 * @param label - The label of the column.
	 * @param property - The property, i.e, the attribute name of the object showed.
	 * @param options - Object with additional options for the
	 *                  column, as 'width', 'type' and 'showOverflowTooltip'.
	 * @returns {{property, label, type, showOverflowTooltip}} - A column.
	 */
	static newColumn(label, property, options) {
		return {
			label,
			property,
			type: options && options.type || 'name',
			showOverflowTooltip: options && options.showOverflowTooltip || false
		};
	}
}

export default TableColumnComposer;
