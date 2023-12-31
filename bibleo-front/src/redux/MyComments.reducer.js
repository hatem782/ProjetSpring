import { axios } from "../utils/axios";

const keys = {
  SET_COMMENTS: "SET_My_COMMENTS",
  SET_PAYLOAD: "SET_PAYLOAD_MY_COMMENTS",
  SET_PAGINATION: "SET_PAGINATION_MY_COMMENTS",
};

// ###################################### STATE ###################################### //
export const InitialState = {
  emprunts: [],
  pagination: {},
  payload: false,
};

// ###################################### Reducer ###################################### //
export const MyEmpruntsReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_EMPRUNTS:
      return { ...state, emprunts: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_TYPE:
      return { ...state, get_type: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetMyEmprunts = () => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      const id = currentState.UserReducers.user.id;
      const response = await axios.get(
        `/api/emprunt/get-emprunts-by-adherant-id/${id}`
      );
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_EMPRUNTS,
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
