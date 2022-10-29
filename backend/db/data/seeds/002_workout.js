/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("workout").del();
	await knex("workout").insert([
		{ name: "upper body", day_of_week: "1", users_id: "1" },
		{ name: "lower body", day_of_week: "2", users_id: "1" },
		{ name: "upper body", day_of_week: "3", users_id: "1" },
		{ name: "lower body", day_of_week: "4", users_id: "1" },
		{ name: "upper body", day_of_week: "5", users_id: "1" },
		{ name: "lower body", day_of_week: "6", users_id: "1" },
		{ name: "upper body", day_of_week: "0", users_id: "1" },
		{ name: "upper body", day_of_week: "5", users_id: "2" },
		{ name: "lower body", day_of_week: "3", users_id: "3" },
		{ name: "upper body", day_of_week: "6", users_id: "4" },
	]);
};
