import {
	getDatabaseData,
	resetDatabase,
	setDatabaseData,
} from "./test-helpers";

import { expect } from "chai";
import { getUserByUsername } from "./db";

describe("getUserByUsername ", () => {
	it("get the correct user from the database given a username", async () => {
		const fakeData = [
			{
				id: "123",
				username: "abc",
				email: "abc@gmail.com",
			},
			{
				id: "124",
				username: "wrong",
				email: "wrong@gmail.com",
			},
		];
		await setDatabaseData("users", fakeData);
		const actual = await getUserByUsername("abc");
		const finalDBState = await getDatabaseData("users");
		await resetDatabase();
		const expected = {
			id: "123",
			username: "abc",
			email: "abc@gmail.com",
		};

		expect(actual).excludingEvery("_id").to.deep.equal(expected);
		expect(finalDBState).excludingEvery("_id").to.deep.equal(fakeData);
	});
});
