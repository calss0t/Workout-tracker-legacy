/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("workout", function (table) {
		table.increments("id").unsigned().primary();
		table.string("name", 255);
		table.integer("day_of_week", 7).checkBetween([0, 6]);
		table.integer("users_id").references("id").inTable("users");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("workout");
};
