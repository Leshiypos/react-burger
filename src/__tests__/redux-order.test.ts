import {
  GET_ORDER_SACCESS,
  HIDE_ORDER,
  IResponseOrderByNumber,
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SACCESS,
} from "../services/order/actions";
import { initialState, reducer } from "../services/order/reducer";

describe("Redux order", () => {
  it("should return the enitial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should return the state with new status after SEND_ORDER action", () => {
    expect(reducer(undefined, { type: SEND_ORDER })).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it("should return the state with response data if the request is successful ", () => {
    const response = {
      success: true,
      name: "Краторный space бургер",
      order: {
        ingredients: [
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
          },
          {
            _id: "643d69a5c3f7b9001cfa0943",
            name: "Соус фирменный Space Sauce",
            type: "sauce",
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            __v: 0,
          },
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
            image_mobile:
              "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large:
              "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0,
          },
        ],
        _id: "67dabd6b6fce7d001db5b17f",
        owner: {
          name: "Валентин",
          email: "leshiy_pos@mail.ru",
          createdAt: "2025-02-03T19:20:54.403Z",
          updatedAt: "2025-02-16T14:53:53.912Z",
        },
        status: "done",
        name: "Краторный space бургер",
        createdAt: "2025-03-19T12:49:47.790Z",
        updatedAt: "2025-03-19T12:49:48.467Z",
        number: 71638,
        price: 2590,
      },
    };
    expect(
      reducer(undefined, { type: SEND_ORDER_SACCESS, response: response })
    ).toEqual({
      ...initialState,
      response: response,
      loading: false,
    });
  });

  it("should return the state with new response after GET_ORDER_SACCESS action", () => {
    const response = {
      state: "response",
    } as unknown as IResponseOrderByNumber;

    expect(
      reducer(undefined, { type: GET_ORDER_SACCESS, response: response })
    ).toEqual({
      ...initialState,
      responseProfile: response,
      loading: false,
    });
  });

  it("should return the state with new status after SEND_ORDER_FAILED action", () => {
    expect(reducer(undefined, { type: SEND_ORDER_FAILED })).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });

  it("should return the initial state after HIDE_ORDER action", () => {
    expect(reducer(undefined, { type: HIDE_ORDER })).toEqual(initialState);
  });
  //finish
});
