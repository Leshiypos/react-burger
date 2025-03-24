import { SET_AUTH_CHECKED, SET_USER } from "../services/user/action";
import { initialState, reducer } from "../services/user/reducer";

describe("Redux user", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should be return state with isAuthChecked field value is true after SET_AUTH_CHECKED action", () => {
    const valueTesting = true;

    expect(
      reducer(undefined, { type: SET_AUTH_CHECKED, payload: valueTesting })
    ).toEqual({
      ...initialState,
      isAuthChecked: valueTesting,
    });
  });

  it("should return state with user data after SET_USER action", () => {
    const testData = {
      name: "Ivan",
      email: "xxx@mail.ru",
    };

    expect(reducer(undefined, { type: SET_USER, payload: testData })).toEqual({
      ...initialState,
      user: testData,
    });
  });
  //finish describe
});
