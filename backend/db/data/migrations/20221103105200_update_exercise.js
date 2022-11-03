/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("exercise", (table) => {
    table.boolean('complete')
      .notNullable()
      .defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('exercise', table => {
    table.dropColumn('complete');
  })
};
