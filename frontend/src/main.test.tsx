import { describe, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("Github status 200", () => {
  it("should return 200", async () => {
    axios
      .get("https://api.github.com/search/repositories?q=react")
      .then((res) => {
        console.log(res.status);
        expect(res.status).toEqual(200);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

describe("Github status 404", () => {
  it("should return 404", async () => {
    axios
      .get("https://api.github.com/search/repositries?q=javascript")
      .then((res) => {
        expect(res.status).toEqual(404);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
