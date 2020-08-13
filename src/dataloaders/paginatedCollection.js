import bluebird from 'bluebird';
import Dataloader from 'dataloader';

/**
 * Load the data of a models paginated list.
 * It's only expected that this dataloader is used for single
 * models at a time.
 *
 * @param {object} Model
 */
const paginatedCollection = (Model) =>
  new Dataloader(async (values) =>
    bluebird.map(values, async ({ limit, offset, sortBy, sortDirection }) => {
      const { count, rows: records } = await Model.findAndCountAll({
        limit,
        offset,
        order: [[sortBy, sortDirection]],
      });

      return { count, records };
    })
  );

export default paginatedCollection;
