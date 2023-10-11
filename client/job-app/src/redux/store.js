import { useDispatch, useSelector } from "react-redux";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";

import thunk from "redux-thunk";
import { reducer as jobReducer } from "./job/job.reducer";

const root = combineReducers({
  jobReducer,
});

const store = createStore(root, compose(applyMiddleware(thunk)));


export { store };

// You can keep these two lines as they are, as they don't have TypeScript annotations.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
