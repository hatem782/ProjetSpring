import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import { AutherReducers } from "./Auther.reducer";
import { BookReducers } from "./Books.reducer";
import { EmpruntsReducers } from "./Emprunt.reducer";
import { UserReducers } from "./User.reducer";
import { MyEmpruntsReducers } from "./MyEmprunt.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  AutherReducers,
  BookReducers,
  EmpruntsReducers,
  UserReducers,
  MyEmpruntsReducers,
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
