import { axios } from "../utils/axios";

const keys = {
  SET_BOOKS: "SET_SET_BOOKS",
  SET_BOOK: "SET_SET_BOOK",
  SET_ALL_BOOKS: "SET_ALL_BOOKS",
  SET_PAYLOAD: "SET_PAYLOAD_BOOKS",
  SET_PAGINATION: "SET_PAGINATION_BOOKS",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  books: [],
  book: null,
  all_books: [],
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const BookReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_BOOKS:
      return { ...state, books: action.value, payload: false };
    case keys.SET_ALL_BOOKS:
      return { ...state, all_books: action.value, payload: false };
    case keys.SET_BOOK:
      return { ...state, book: action.value };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllBook = (page = 0) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/book/all?page=${page}`);
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_BOOKS,
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

export const GetAllBookWithFilter = ({
  page = 0,
  titre = "all",
  auteur = "-1",
  genre = "all",
}) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/book/all-for-library?page=${page}&titre=${titre}&auteur=${auteur}&genre=${genre}`
      );
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_BOOKS,
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

export const GetAllAllBook = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/book/all-all");
      console.log(response.data);
      dispatch({
        type: keys.SET_ALL_BOOKS,
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

export const GetOneBook = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/book/one/${id}`);
      console.log(response.data);
      dispatch({
        type: keys.SET_BOOK,
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

export const CreateBook = (book, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/book/create", book);
      console.log(response);
      dispatch(GetAllBook());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateBook = (book, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/book/update/${book.id}`, book);
      console.log(response);
      dispatch(GetAllBook());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteBook = (book, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/book/delete/${book.id}`);
      console.log(response);
      dispatch(GetAllBook());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
