/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("workout").del();
	await knex("workout").insert([
		{ name: "upper body", day_of_week: "1", users_id: "1", date: new Date("2022-10-29T00:00:00.000Z").toDateString()},
		{ name: "lower body", day_of_week: "2", users_id: "1", date: new Date("2022-10-30T00:00:00.000Z").toDateString()},
		{ name: "upper body", day_of_week: "3", users_id: "1", date: new Date("2022-10-31T00:00:00.000Z").toDateString()},
		{ name: "lower body", day_of_week: "4", users_id: "1", date: new Date("2022-11-01T00:00:00.000Z").toDateString()},
		{ name: "upper body", day_of_week: "5", users_id: "1", date: new Date("Wed Nov 02 2022 16:15:21 GMT+0900").toDateString()},
		{ name: "lower body", day_of_week: "6", users_id: "1", date: new Date("Thu Nov 03 2022 16:15:21 GMT+0900 ").toDateString()},
		{ name: "upper body", day_of_week: "0", users_id: "1", date: new Date("2022-11-04T00:00:00.000Z").toDateString()},
		{ name: "upper body", day_of_week: "5", users_id: "2", date: new Date("2022-10-29T00:00:00.000Z").toDateString()},
		{ name: "lower body", day_of_week: "3", users_id: "3", date: new Date("2022-10-29T00:00:00.000Z").toDateString()},
		{ name: "upper body", day_of_week: "6", users_id: "4", date: new Date("2022-10-29T00:00:00.000Z").toDateString()},
	]);
};
