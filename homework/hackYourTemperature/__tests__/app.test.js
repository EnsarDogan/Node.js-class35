import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  test("the request should include a valid city name", async () => {
    const response = await request.post("/weather").send({ city: "Bussum" });
    expect(response.body.split(":")[0]).toBeDefined();
  });

  test("the response should return 200 status code if there is a valid city name sent to the server", async () => {
    const response = await request.post("/weather").send({ city: "Bussum" });
    expect(response.statusCode).toBe(200);
  });

  test("the response should return 400 status code if there is no city name sent to the server", async () => {
    const response = await request.post("/weather").send({ city: "" });
    expect(response.statusCode).toBe(400);
  });

  test("the response should return 404 status code if there is an invalid city name sent to the server", async () => {
    const response = await request
      .post("/weather")
      .send({ city: "invalid city name" });
    expect(response.statusCode).toBe(404);
  });
});
