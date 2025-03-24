import {
  IUserCurrent,
  SET_AUTH_CHECKED,
  SET_USER,
  TUserActions,
} from "./action";

interface IInitialState {
  user: IUserCurrent | null;
  isAuthChecked: boolean;
}

export const initialState: IInitialState = {
  user: null,
  isAuthChecked: false,
};

export const reducer = (
  state = initialState,
  action: TUserActions
): IInitialState => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
