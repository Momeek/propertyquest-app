// sync-tables.ts
import { sequelizeConn } from './database';

sequelizeConn.sync({ alter: true })  
  .then(() => {
    console.log('✅ Tables created/updated successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(' Sequelize sync error:', err);
    process.exit(1);
  });
