import toast from "react-hot-toast";
import { axios } from "../utils/axios";

const keys = {
  SET_COMMENTAIRES: "SET_SET_COMMENTAIRES",
  SET_COMMENTAIRES_BY_LIVRE: "SET_COMMENTAIRES_BY_LIVRE",
  SET_PAYLOAD: "SET_PAYLOAD_COMMENTAIRES",
  SET_PAGINATION: "SET_PAGINATION_COMMENTAIRES",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  commentaires: [],
  commentairesByLivre: [],
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const CommentaireReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_COMMENTAIRES:
      return { ...state, commentaires: action.value, payload: false };
    case keys.SET_COMMENTAIRES_BY_LIVRE:
      return { ...state, commentairesByLivre: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllCommentaire = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/commentaire/page");
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_COMMENTAIRES,
        value: response.data.content,
      });
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateCommentaire = (commentaire, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/commentaire/update/${commentaire.id}`,
        commentaire
      );
      console.log(response);
      dispatch(GetAllCommentaire());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteCommentaire = (commentaire, callback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `/api/commentaire/delete/${commentaire.id}`
      );
      console.log(response);
      const currentState = getState();
      let id = currentState.BookReducers.book?.id;
      dispatch(GetAllCommentaireByLivre(id));
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const signalCommentaire = (commentaire, raisonSign, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/commentaire/signal/${commentaire.id}`,
        raisonSign // Send the content directly
      );
      console.log(response);
      dispatch(GetAllCommentaire());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const GetAllCommentaireByLivre = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/commentaire/getByLivre/${id}`);
      console.log(response.data);
      dispatch({
        type: keys.SET_COMMENTAIRES_BY_LIVRE,
        value: response.data,
      });
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const CreateCommentaire = (Form, callback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("/api/commentaire/create", Form);
      console.log(response);
      const currentState = getState();
      let id = currentState.BookReducers.book?.id;
      dispatch(GetAllCommentaireByLivre(id));
      callback();
      toast.success("Comment created successfully");
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateMyCommentaire = (commentaire, callback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `/api/commentaire/update/${commentaire.id}`,
        commentaire
      );
      console.log(response);
      const currentState = getState();
      let id = currentState.BookReducers.book?.id;
      dispatch(GetAllCommentaireByLivre(id));
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
