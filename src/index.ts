import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'reddit',
    user: 'posgres',
    password: '',
    type: 'postgresql',
    debug: !__prod__,
  });

  const post = orm.em.create(Post, { title: 'my first post' });
  await orm.em.persistAndFlush(post);
};

main().catch((err) => {
  console.log(err);
});