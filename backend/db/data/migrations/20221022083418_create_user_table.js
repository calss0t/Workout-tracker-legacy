/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("user", function (table) {
		table.increments("id").unsigned().primary();
		table.string("first_name", 255); // notNullable?
		table.string("last_name", 255);
		table.string("email", 255).unique();
		table.string("password", 255);
		table.integer("height");
		table.integer("weight");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("user");
};
