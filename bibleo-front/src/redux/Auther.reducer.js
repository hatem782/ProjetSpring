import { axios } from "../utils/axios";

const keys = {
  SET_AUTHERS: "SET_SET_AUTHERS",
  SET_ALL_AUTHERS: "SET_ALL_AUTHERS",
  SET_PAYLOAD: "SET_PAYLOAD_AUTHERS",
  SET_PAGINATION: "SET_PAGINATION_AUTHERS",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  authers: [],
  all_authers: [],
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const AutherReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_AUTHERS:
      return { ...state, authers: action.value, payload: false };
    case keys.SET_ALL_AUTHERS:
      return { ...state, all_authers: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllAuther = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/auther/all");
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_AUTHERS,
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

export const GetAllAllAuther = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/auther/all-all");
      console.log(response.data);
      dispatch({
        type: keys.SET_ALL_AUTHERS,
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

export const CreateAuther = (auther, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auther/create", auther);
      console.log(response);
      dispatch(GetAllAuther());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateAuther = (auther, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/auther/update/${auther.id}`,
        auther
      );
      console.log(response);
      dispatch(GetAllAuther());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteAuther = (auther, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/auther/delete/${auther.id}`);
      console.log(response);
      dispatch(GetAllAuther());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
