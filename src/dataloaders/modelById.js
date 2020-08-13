import modelByField from './modelByField';

/**
 * Load the data of a single model by the ID field.
 *
 * @param {object} Model
 */
const modelById = (Model) => modelByField(Model, 'id');

export default modelById;
