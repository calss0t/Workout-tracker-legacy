/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("exercise", function (table) {
		table.increments("id").unsigned().primary();
		table.string("name", 255);
		table.integer("sets").notNullable();
		table.integer("reps").notNullable();
		table.integer("break_time").notNullable();
		table.integer("workout_id").references("id").inTable("workout");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("exercise");
};
