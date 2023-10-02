const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const sorted = require("jest-sorted");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(data));
afterAll(() => db.end());
describe("GET api/topics", () => {
	test("should return a status code of 200 with an array of objects ", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body }) => {
				expect(body.topics).toHaveLength(3);
				body.topics.forEach((topics) => {
					expect(typeof topics.slug).toBe("string");
					expect(typeof topics.description).toBe("string");
				});
			});
	});
});

describe("GET api/invalidpath", () => {
	test("should return error code 404 Not Found when provided non-existent route ", () => {
		return request(app)
			.get("/api/invalidpath")
			.expect(404)
			.then(({ body }) => {
				expect(body).toHaveProperty("msg");
				expect(body.msg).toBe("Invalid Path");
			});
	});
});

describe("GET /api", () => {
	test("should return all api endpoints with descriptions from endpoints.json", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body }) => {
				expect(body).toEqual(endpoints);
			});
	});
});