import {
  ADD_BUNS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_INGREDIENTS,
  SORT_INGREDIENTS,
} from "../services/burger-constructor/actions";
import { initialState, reducer } from "../services/burger-constructor/reducer";
import { IConstructorIngredientWithKey } from "../util/types";

describe("Redux burger-constructor", () => {
  it("should return the enitial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should return state with new ingredient after added ingredient action", () => {
    const ingredient: IConstructorIngredientWithKey = {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
      key: "e6033dac-113e-4eee-a2d1-f69e07853399",
    };
    expect(
      reducer(undefined, { type: ADD_INGREDIENT, ingredient: ingredient })
    ).toEqual({
      ...initialState,
      ingredients: [ingredient],
      counter: { "643d69a5c3f7b9001cfa0943": 1 },
    });
  });

  it("should return state without deleted ingredient after delete ingredient action", () => {
    const state = {
      bun: null,
      counter: {
        "643d69a5c3f7b9001cfa0943": 1,
      },
      counterBun: {},
      ingredients: [
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
          key: "e6033dac-113e-4eee-a2d1-f69e07853399",
        },
      ],
    };

    expect(
      reducer(state, { type: DELETE_INGREDIENT, element: state.ingredients[0] })
    ).toEqual({
      ...initialState,
      counter: { "643d69a5c3f7b9001cfa0943": 0 },
    });
  });

  it("should return state with new buns after added new bun", () => {
    const bun = {
      _id: "643d69a5c3f7b9001cfa093d",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    };

    expect(reducer(undefined, { type: ADD_BUNS, bun: bun })).toEqual({
      ...initialState,
      bun,
      counterBun: {
        "643d69a5c3f7b9001cfa093d": 2,
      },
    });
  });

  it("should change the sort of the selected ingredients after SORT_INGREDIENTS action", () => {
    const firstIngredient = {
      _id: "643d69a5c3f7b9001cfa0944",
      name: "Соус традиционный галактический",
      type: "sauce",
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: "https://code.s3.yandex.net/react/code/sauce-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      __v: 0,
      key: "cd9d0bc9-d0b0-4660-a0a5-486a8ffdd023",
    };
    const secondIngredient = {
      _id: "643d69a5c3f7b9001cfa0945",
      name: "Соус с шипами Антарианского плоскоходца",
      type: "sauce",
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: "https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      __v: 0,
      key: "62a84aee-c622-4699-9960-14526f617123",
    };
    const state = {
      bun: null,
      counter: { [firstIngredient._id]: 1, [secondIngredient._id]: 1 },
      counterBun: {},
      ingredients: [firstIngredient, secondIngredient],
    };

    expect(
      reducer(state, { type: SORT_INGREDIENTS, dragIndex: 0, hoverIndex: 1 })
    ).toEqual({
      ...initialState,
      counter: { [secondIngredient._id]: 1, [firstIngredient._id]: 1 },
      ingredients: [secondIngredient, firstIngredient],
    });
  });

  it("should return initialState after reset ingredient action", () => {
    const state = {
      bun: null,
      counter: {
        "643d69a5c3f7b9001cfa0943": 1,
      },
      counterBun: {},
      ingredients: [
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
          key: "e6033dac-113e-4eee-a2d1-f69e07853399",
        },
      ],
    };
    expect(reducer(state, { type: RESET_INGREDIENTS })).toEqual(initialState);
  });
});
