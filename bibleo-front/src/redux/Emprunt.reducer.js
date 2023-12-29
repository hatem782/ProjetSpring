import { axios } from "../utils/axios";

const keys = {
  SET_EMPRUNTS: "SET_SET_EMPRUNTS",
  SET_ALL_EMPRUNTS: "SET_ALL_EMPRUNTS",
  SET_PAYLOAD: "SET_PAYLOAD_EMPRUNTS",
  SET_PAGINATION: "SET_PAGINATION_EMPRUNTS",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  emprunts: [],
  all_emprunts: [],
  pagination: {},
  payload: false,
};

// ###################################### Reducer ###################################### //
export const EmpruntsReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_EMPRUNTS:
      return { ...state, emprunts: action.value, payload: false };
    case keys.SET_ALL_EMPRUNTS:
      return { ...state, all_emprunts: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

const typesEmprunts = [
  {
    type: "All",
    url: "/api/emprunt/get-all-emprunts",
  },
  {
    type: "En Attente",
    url: "/api/emprunt/get-en-attente-emprunts",
  },
  {
    type: "Refused",
    url: "/api/emprunt/get-refuse-emprunts",
  },
  {
    type: "With Amandes",
    url: "/api/emprunt/get-5teya-emprunts",
  },
  {
    type: "Emprunts Ended without amandes",
    url: "/api/emprunt/get-retourner-emprunts",
  },
  {
    type: "Actuals Emprunts",
    url: "/api/emprunt/get-emprunte-emprunts",
  },
  {
    type: "Emprunts Ended with amandes",
    url: "/api/emprunt/get-retards-emprunts",
  },
];

export const GetAllEmprunts = (type = typesEmprunts[0]) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(type.url);
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

export const GetAllAllEmprunts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/emprunts/all-all");
      console.log(response.data);
      dispatch({
        type: keys.SET_ALL_EMPRUNTS,
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

export const CreateEmprunts = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/emprunts/create", emprunts);
      console.log(response);
      dispatch(GetAllEmprunts());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateEmprunts = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/emprunts/update/${emprunts.id}`,
        emprunts
      );
      console.log(response);
      dispatch(GetAllEmprunts());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteEmprunts = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `/api/emprunts/delete/${emprunts.id}`
      );
      console.log(response);
      dispatch(GetAllEmprunts());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
