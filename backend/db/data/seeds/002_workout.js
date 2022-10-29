/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("workout").del();
	await knex("workout").insert([
		{ name: "upper body", day_of_week: "1", user_id: "1" },
		{ name: "lower body", day_of_week: "2", user_id: "1" },
		{ name: "upper body", day_of_week: "3", user_id: "1" },
		{ name: "lower body", day_of_week: "4", user_id: "1" },
		{ name: "upper body", day_of_week: "5", user_id: "1" },
		{ name: "lower body", day_of_week: "6", user_id: "1" },
		{ name: "upper body", day_of_week: "0", user_id: "1" },
		{ name: "upper body", day_of_week: "5", user_id: "2" },
		{ name: "lower body", day_of_week: "3", user_id: "3" },
		{ name: "upper body", day_of_week: "6", user_id: "4" },
	]);
};
