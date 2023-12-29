import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import { AutherReducers } from "./Auther.reducer";
import { CommentaireReducers } from "./Commentaire.reducer";
import { AdherantReducers } from "./Adherant.reducer";
import { ReviewReducers } from "./Review.reducer";
import { AdminReducers } from "./Admin.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  AutherReducers,
  CommentaireReducers,
  AdherantReducers,
  ReviewReducers,
  AdminReducers,
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
