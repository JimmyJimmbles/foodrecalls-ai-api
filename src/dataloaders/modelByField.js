import Dataloader from 'dataloader';

const modelByField = (Model, field) => {
  return new Dataloader(async (inputs) => {
    // Type cast id to number
    const values =
      field === 'id' ? inputs.map((input) => Number(input)) : inputs;

    const models = await Model.findAll({ where: { [field]: values } });

    return values.map((value) =>
      models.find((model) => model[field] === value)
    );
  });
};

export default modelByField;
