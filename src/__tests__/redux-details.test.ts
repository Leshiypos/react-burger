import { SHOW_DETAILS } from "../services/details/actions";
import { initialState, reducer } from "../services/details/reducer";

describe("Redux details", () => {
  it("should return the initialState", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should returt state with details ingredient after show details action", () => {
    const ingredient = {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    };
    expect(
      reducer(undefined, { type: SHOW_DETAILS, details: ingredient })
    ).toEqual({
      ...initialState,
      details: ingredient,
    });
  });
});
