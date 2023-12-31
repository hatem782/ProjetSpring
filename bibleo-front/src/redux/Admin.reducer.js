import { axios } from "../utils/axios";

const keys = {
  SET_ADMIN: "SET_SET_ADMIN",
  SET_PAYLOAD: "SET_PAYLOAD_ADMIN",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  admin: null,
  payload: false,
};
// ###################################### Reducer ###################################### //
export const AdminReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_ADMIN:
      return { ...state, admin: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    default:
      return state;
  }
};

// ###################################### Actions ###################################### //

export const loginAdmin = (admin, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/admin/login-admin", admin);

      console.log(response);
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
