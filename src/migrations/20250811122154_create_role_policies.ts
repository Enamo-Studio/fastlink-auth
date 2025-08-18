import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_policies', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('name').notNullable();
    table.string('path').notNullable();
    table.string('action').notNullable();
    table.text('desc').nullable();
    table.integer('module_id').unsigned().nullable();
    table.string('base_path').nullable();
    table.integer('created_at', 11).defaultTo(knex.raw('UNIX_TIMESTAMP()')).nullable();
    table.integer('updated_at', 11).defaultTo(knex.raw('UNIX_TIMESTAMP()')).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('role_policies');
}