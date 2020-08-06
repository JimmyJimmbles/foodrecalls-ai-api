import modelByField from './modelByField';

const modelById = (Model) => modelByField(Model, 'id');

export default modelById;
