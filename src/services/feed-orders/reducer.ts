import {
  IMessage,
  TFeedOrdersActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./actions";
import { WebsocketStatus } from "../../util/types";

interface IInitialState {
  wsConnected: string;
  messages: IMessage[];
  error?: Event;
}

export const initialState: IInitialState = {
  wsConnected: WebsocketStatus.OFFLINE,
  messages: [],
};

export const reducer = (
  state = initialState,
  action: TFeedOrdersActions
): IInitialState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: WebsocketStatus.CONNECTING,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: WebsocketStatus.ONLINE,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: WebsocketStatus.OFFLINE,
      };
    default:
      return state;
  }
};
