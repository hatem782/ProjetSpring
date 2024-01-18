import { axios } from "../utils/axios";

const keys = {
  SET_EMPRUNTS: "SET_SET_EMPRUNTS",
  SET_ALL_EMPRUNTS: "SET_ALL_EMPRUNTS",
  SET_PAYLOAD: "SET_PAYLOAD_EMPRUNTS",
  SET_TYPE: "SET_TYPE_EMPRUNTS",
  SET_PAGINATION: "SET_PAGINATION_EMPRUNTS",
};

export const typesEmprunts = [
  {
    type: "All",
    url: "/api/emprunt/get-all-emprunts",
    text: "All Emprunts",
    color: "primary",
  },
  {
    type: "En Attente",
    url: "/api/emprunt/get-en-attente-emprunts",
    text: "En Attente Emprunts",
    color: "warning",
  },
  {
    type: "Refused",
    url: "/api/emprunt/get-refuse-emprunts",
    text: "Refused Emprunts",
    color: "error",
  },
  {
    type: "With Amandes",
    url: "/api/emprunt/get-5teya-emprunts",
    text: "With Amandes Emprunts",
    color: "error",
  },
  {
    type: "Emprunts Ended without amandes",
    url: "/api/emprunt/get-retourne-emprunts",
    text: "Emprunts Ended without amandes",
    color: "info",
  },
  {
    type: "Actuals Emprunts",
    url: "/api/emprunt/get-emprunte-emprunts",
    text: "Actuals Emprunts",
    color: "success",
  },
  {
    type: "Emprunts Ended with amandes",
    url: "/api/emprunt/get-retards-emprunts",
    text: "Emprunts Ended with amandes",
    color: "secondary",
  },
];

// ###################################### STATE ###################################### //
export const InitialState = {
  emprunts: [],
  all_emprunts: [],
  pagination: {},
  get_type: typesEmprunts[0],
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
    case keys.SET_TYPE:
      return { ...state, get_type: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllEmprunts = (page = 0) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      const response = await axios.get(
        currentState.EmpruntsReducers.get_type.url + `?page=${page}`
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

export const SetGetTypes = (type) => {
  return async (dispatch) => {
    dispatch({
      type: keys.SET_TYPE,
      value: type,
    });
    dispatch(GetAllEmprunts(type));
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

export const AcceptEmprunts = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/emprunt/accept_demande_emprunt_book/${emprunts.id}`
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

export const RefuseEmprunt = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/emprunt/refuse_demande_emprunt_book/${emprunts.id}`
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

export const FinishEmprunt = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/emprunt/finish_demande_emprunt_book/${emprunts.id}`
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

export const PayerAmande = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/emprunt/payed-amandes/${emprunts.id}`
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

export const MakeEmpruntRequest = (adherant, book, form, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/emprunt/create_demande_emprunt_book?id_user=${adherant.id}&id_book=${book.id}`,
        form
      );
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

export const deleteEmprunts = (emprunts, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/emprunt/delete/${emprunts.id}`);
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
