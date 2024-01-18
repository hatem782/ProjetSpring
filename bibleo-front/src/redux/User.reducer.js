import { axios } from "../utils/axios";

const keys = {
  SET_USER: "SET_USER",
  SET_ROLE: "SET_ROLE",
  SET_PAYLOAD: "SET_PAYLOAD_USER",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  user: null,
  role: null,
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const UserReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_USER:
      return { ...state, user: action.value, payload: false };
    case keys.SET_ROLE:
      return { ...state, role: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const LoginAdherant = ({ form, succ = () => {}, fail = () => {} }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/admin/login-user", form);
      console.log(response.data);

      // SET ADHERANT IN LOCAL STORAGE
      localStorage.setItem("user_id", 1);
      localStorage.setItem("user_type", "adherant");
      localStorage.setItem("spring_token", response.data.token);
      // SET ADHERANT IN LOCAL STORAGE
      let user_json_string = JSON.stringify(response.data.adherant);
      localStorage.setItem("user", user_json_string);

      dispatch({
        type: keys.SET_USER,
        value: response.data.adherant,
      });
      dispatch({
        type: keys.SET_ROLE,
        value: "adherant",
      });
      succ();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
      fail();
    }
  };
};

export const LoginAdmin = ({ form, succ = () => {}, fail = () => {} }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/admin/login-admin", form);
      console.log(response.data);

      // SET ADMIN IN LOCAL STORAGE
      localStorage.setItem("user_id", 1);
      localStorage.setItem("user_type", "admin");
      localStorage.setItem("spring_token", response.data.token);
      // SET ADMIN IN LOCAL STORAGE
      let user_json_string = JSON.stringify(response.data.admin);
      localStorage.setItem("user", user_json_string);

      dispatch({
        type: keys.SET_USER,
        value: response.data.admin,
      });
      dispatch({
        type: keys.SET_ROLE,
        value: "admin",
      });
      succ();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
      fail();
    }
  };
};

export const GetUserById = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/auther/all");
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_USER,
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

export const GetUserByToken = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/auther/all");
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_USER,
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

export const LogoutAction = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      localStorage.removeItem("spring_token");
      localStorage.removeItem("user");
      dispatch({
        type: keys.SET_USER,
        value: null,
      });
      dispatch({
        type: keys.SET_ROLE,
        value: null,
      });
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const GetUserFromLocalStorage = () => {
  return async (dispatch) => {
    try {
      let user_json_string = localStorage.getItem("user");
      let user = JSON.parse(user_json_string);
      let user_type = localStorage.getItem("user_type");
      dispatch({
        type: keys.SET_USER,
        value: user,
      });
      dispatch({
        type: keys.SET_ROLE,
        value: user_type,
      });
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
