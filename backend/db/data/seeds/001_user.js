/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{
			first_name: "Rocky",
			last_name: "Smith",
			email: "rockysmith@123.com",
			password: "abc123",
			height: "180",
			weight: "95",
		},
		{
			first_name: "Sarah",
			last_name: "Rich",
			email: "sarahrich@123.com",
			password: "xyz789",
			height: "165",
			weight: "55",
		},
		{
			first_name: "Goku",
			last_name: "Son",
			email: "dragonball@anime.com",
			password: "supersaiyan",
			height: "170",
			weight: "90",
		},
		{
			first_name: "Barbie",
			last_name: "World",
			email: "barbie@toys.com",
			password: "imgood",
			height: "170",
			weight: "90",
		},
	]);
};
