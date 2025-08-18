import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_group', (table) => {
    table.increments('id').primary();
    table.integer('role_id').notNullable();
    table.text('role_name').notNullable();
    table.text('remark').notNullable();
    table.integer('profit_sharing').notNullable();
    table.charset('utf8mb3');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('role_group');
}