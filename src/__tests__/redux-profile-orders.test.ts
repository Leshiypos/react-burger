import {
  WS_CONNECTION_CLOSED_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_START_PROFILE,
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_GET_MESSAGE_PROFILE,
} from "../services/profile-orders/actions";
import { initialState, reducer } from "../services/profile-orders/reducer";
import { WebsocketStatus } from "../util/types";

describe("Redux profile orders", () => {
  it("should returt the initial state", () => {
    expect(reducer(undefined, { type: "" } as unknown as any)).toEqual(
      initialState
    );
  });

  it("should return state with wsConnected field value CONNECTING... after WS_CONNECTION_START action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_START_PROFILE,
        payload: "wss://exemple.com",
      })
    ).toEqual({
      ...initialState,
      wsConnected: WebsocketStatus.CONNECTING,
    });
  });

  it("should return state with wsConnected field value ONLINE after WS_CONNECTION_SUCCESS action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_SUCCESS_PROFILE,
      })
    ).toEqual({
      ...initialState,
      wsConnected: WebsocketStatus.ONLINE,
    });
  });

  it("should return state with error field value ERROR after WS_CONNECTION_ERROR action", () => {
    expect(
      reducer(undefined, {
        type: WS_CONNECTION_ERROR_PROFILE,
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
        type: WS_GET_MESSAGE_PROFILE,
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
        type: WS_CONNECTION_CLOSED_PROFILE,
      })
    ).toEqual({
      ...initialState,
      wsConnected: WebsocketStatus.OFFLINE,
    });
  });
});
