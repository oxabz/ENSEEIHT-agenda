import knex from 'knex';
import { Application } from './declarations';

export default async function (app: Application): Promise<void> {
  const { client, connection } = app.get('postgres');
  const db = knex({ client, connection });
  // Adding uuid extension to postgres so that the project can identifies n-uplet with v4 uuid
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  app.set('knexClient', db);
}
