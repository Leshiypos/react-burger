import { it, expect, jest } from "@jest/globals";
import { checkResponse, request } from "../util/api";

describe("check checkResponse function", () => {
  it("should be success", () => {
    const testObject = {
      ok: true,
      json: function () {
        return { result: "ok" };
      },
    } as unknown as Response;

    const result = checkResponse(testObject);

    expect(result).toEqual({ result: "ok" });
  });

  it("should be failde", () => {
    const testObject = {
      ok: false,
      status: 500,
    } as unknown as Response;

    const result = checkResponse(testObject);

    return expect(result).rejects.toBe("Ошибка: 500");
  });
});

describe("Check request function", () => {
  let fetchSpy: jest.Spied<typeof fetch>;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          result: "OK",
        }),
    } as unknown as Response);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be saccess", async () => {
    const result = await request(`/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: "asasdasdasd",
      }),
    });

    expect(result).toEqual({ result: "OK" });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("should be failed2", async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as unknown as Response)
    );

    await expect(
      request(`/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          token: "asasdasdasd",
        }),
      })
    ).rejects.toBe("Ошибка: 500");
  });
});
