import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../services/feed-orders/actions";
import { initialState, reducer } from "../services/feed-orders/reducer";

describe("Redux feed orders", () => {
  it("should returt the initial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should return state with wsConnected field value CONNECTING... after WS_CONNECTION_START action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_START,
        payload: "wss://exemple.com",
      })
    ).toEqual({
      ...initialState,
      wsConnected: "CONNECTING...",
    });
  });

  it("should return state with wsConnected field value ONLINE after WS_CONNECTION_SUCCESS action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: "ONLINE",
    });
  });

  it("should return state with error field value ERROR after WS_CONNECTION_ERROR action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_ERROR,
        payload: "Error",
      } as unknown as any)
    ).toEqual({
      ...initialState,
      error: "Error",
    });
  });
  it("should return state with new message after WS_GET_MESSAGE action", () => {
    const socketMessage = [
      {
        success: true,
        orders: [
          {
            _id: "67da902f6fce7d001db5b0e2",
            ingredients: [
              "643d69a5c3f7b9001cfa093d",
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa0949",
              "643d69a5c3f7b9001cfa093d",
            ],
            status: "done",
            name: "Экзо-плантаго флюоресцентный люминесцентный бургер",
            createdAt: "2025-03-19T09:36:47.926Z",
            updatedAt: "2025-03-19T09:36:48.650Z",
            number: 71592,
          },
        ],
        total: 71218,
        totalToday: 91,
      },
    ];
    expect(
      reducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: socketMessage,
      })
    ).toEqual({
      ...initialState,
      messages: socketMessage,
    });
  });

  it("should return state with wsConnected field value OFFLINE after WS_CONNECTION_CLOSED action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      wsConnected: "OFFLINE",
    });
  });
});
