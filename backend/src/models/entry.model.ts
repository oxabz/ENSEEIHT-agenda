// entry-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import {Knex} from 'knex';
import { Application } from '../declarations';

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient');
  const tableName = 'entry';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.uuid('id').primary().defaultTo(db.raw('(uuid_generate_v4())'));
        table.string('title');
        table.string('description');
        table.dateTime('startDate');
        table.dateTime('endDate');
        table.uuid('agendaId');
        table.foreign('agendaId').references('agenda.id').onDelete('CASCADE');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
}
