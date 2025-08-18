import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
   await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('name').notNullable();
    table.text('phone').notNullable();
    table.text('address').notNullable();
    table.text('image').notNullable();
    table.text('role_id').notNullable();
    table.integer('is_active').notNullable();
    table.integer('date_created').notNullable();
    table.enu('gender', ['Male', 'Female', '']).notNullable();
    table.text('no_services').notNullable();
    table.text('lang').notNullable();
    table.text('codephone').notNullable();
    table.text('referrer').nullable();
    table.charset('utf8mb3');
  });

  await knex.schema.createTable('refresh_tokens', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table.string('token').notNullable();
    table.integer('expired_at').nullable();
    table.integer('last_login').nullable();
    table.integer('created_at').nullable();
    table.integer('updated_at').nullable();
    table.string('user_agent').nullable();
    table.string('ip_address').nullable();
    table.string('mac_address').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('refresh_tokens');
  await knex.schema.dropTableIfExists('users');
}