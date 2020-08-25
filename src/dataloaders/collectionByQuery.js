import bluebird from 'bluebird';
import Dataloader from 'dataloader';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

const getParams = ({ query, valueField }) => ({ query, valueField });
const valueKey = (value) => JSON.stringify(getParams(value));

/**
 * This is a fairly complicated dataloader that takes in query parameters and
 * executes as few WHERE IN queries as possible in order to pull back a list of
 * collections with arbitrary queries included. This is useful when you need to
 * pull back a list of models in a relation.
 *
 * @param {object}
 */
const collectionByQuery = (Model) =>
  new Dataloader(
    async (values) => {
      const grouped = groupBy(values, valueKey);

      const results = await bluebird.props(
        mapValues(grouped, async (group) =>
          Model.findAll({
            ...group[0].query,
            where: {
              ...group[0].query.where,
              [group[0].valueField]: group.map((item) => item.value),
            },
          })
        )
      );

      return values.map((value) =>
        results[valueKey(value)].filter(
          (model) => model[value.valueField] == value.value
        )
      );
    },
    { cacheKeyFn: JSON.stringify }
  );

export default collectionByQuery;
