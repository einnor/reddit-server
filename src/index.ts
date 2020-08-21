import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import express from 'express';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  // Automatically run the migration
  orm.getMigrator().up();
  const app = express();
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
};

main().catch((err) => {
  console.log(err);
});