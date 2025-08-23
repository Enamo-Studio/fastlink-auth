import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('worker_status', (table) => {
    table.integer('worker_id').notNullable();
    table.double('longitude').nullable();
    table.double('latitude').nullable();
    table.tinyint('status').notNullable();
    table.bigInteger('created_at').notNullable();
    table.bigInteger('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('worker_status');
}