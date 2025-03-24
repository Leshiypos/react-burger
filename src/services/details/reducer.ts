import { IConstructorIngredient } from "../../util/types";
import { HIDE_DETAILS, SHOW_DETAILS, TDetailsActions } from "./actions";

interface IInitialState {
  readonly details: IConstructorIngredient | null;
}

export const initialState: IInitialState = {
  details: null,
};

export const reducer = (
  state = initialState,
  action: TDetailsActions
): IInitialState => {
  switch (action.type) {
    case SHOW_DETAILS:
      return {
        ...state,
        details: action.details,
      };
    case HIDE_DETAILS:
      return initialState;
    default:
      return state;
  }
};
