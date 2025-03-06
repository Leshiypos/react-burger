import { useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { AppDispatch, RootState } from "../util/types";

// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();