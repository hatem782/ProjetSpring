import { axios } from "../utils/axios";

const keys = {
  SET_ADHERANTS: "SET_SET_ADHERANTS",
  SET_PAYLOAD: "SET_PAYLOAD_ADHERANTS",
  SET_PAGINATION: "SET_PAGINATION_ADHERANTS",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  adherants: [],
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const AdherantReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_ADHERANTS:
      return { ...state, adherants: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllAdherant = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/adherant/all");
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_ADHERANTS,
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

export const CreateAdherant = (adherant, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/adherant/create", adherant);
      console.log(response);
      dispatch(GetAllAdherant());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateAdherant = (adherant, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/adherant/update/${adherant.id}`,
        adherant
      );
      console.log(response);
      dispatch(GetAllAdherant());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteAdherant = (adherant, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `/api/adherant/delete/${adherant.id}`
      );
      console.log(response);
      dispatch(GetAllAdherant());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
