import { City, State } from '../models';
import States from '../utils/json/cities';
import { sequelizeConn } from '../config/database';
import { v4 as uuidV4 } from 'uuid';
import { createLogger } from '../utils/logger';

async function run() {
  const logger = createLogger('create-states');
  logger.info('Creating states and cities');

  await sequelizeConn.transaction(async (t) => {
    for (let i = 0; i < States.length; i++) {
      const state = await State.create(
        {
          stateId: uuidV4(),
          stateName: States[i].state,
          country: 'Nigeria',
        },
        { transaction: t },
      );

      for (let j = 0; j < States[i].data.length; j++) {
        await City.create(
          {
            cityId: uuidV4(),
            stateId: state.stateId,
            cityName: States[i].data[j].name,
          },
          { transaction: t },
        );
      }

      logger.info(`State ${state.stateName} created successfully`);
    }
  });

  logger.info('States and cities created successfully');
  process.exit(0);
}

run();
