import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../services/ingredients/actions";
import { initialState, reducer } from "../services/ingredients/reducer";

describe("Redux ingredients", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should return the state with new loading status after GET_INGREDIENTS action", () => {
    expect(reducer(undefined, { type: GET_INGREDIENTS })).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it("should return the state with new ingresients after GET_INGREDIENTS_SUCCESS action", () => {
    const ingredients = [
      {
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
      },
    ];

    expect(
      reducer(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients: ingredients,
      loading: false,
    });
  });

  it("should return the state with new status after GET_INGREDIENTS_FAILED action", () => {
    expect(reducer(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
  //конец
});
