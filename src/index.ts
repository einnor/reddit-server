import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  // Automatically run the migration
  orm.getMigrator().up();
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
};

main().catch((err) => {
  console.log(err);
});