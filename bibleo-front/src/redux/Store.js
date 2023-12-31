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
import { CommentaireReducers } from "./Commentaire.reducer";
import { AdherantReducers } from "./Adherant.reducer";
import { ReviewReducers } from "./Review.reducer";
import { AdminReducers } from "./Admin.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  AutherReducers,
  BookReducers,
  EmpruntsReducers,
  UserReducers,
  MyEmpruntsReducers,
  CommentaireReducers,
  AdherantReducers,
  ReviewReducers,
  AdminReducers,
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
