import { axios } from "../utils/axios";

const keys = {
  SET_REVIEWS: "SET_SET_REVIEWS",
  SET_REVIEWS_BY_BOOK: "SET_REVIEWS_BY_BOOK",
  SET_PAYLOAD: "SET_PAYLOAD_REVIEWS",
  SET_PAGINATION: "SET_PAGINATION_REVIEWS",
};
// ###################################### STATE ###################################### //
export const InitialState = {
  reviews: [],
  reviewsByBook: [],
  pagination: {},
  payload: false,
};
// ###################################### Reducer ###################################### //
export const ReviewReducers = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.SET_REVIEWS:
      return { ...state, reviews: action.value, payload: false };
    case keys.SET_REVIEWS_BY_BOOK:
      return { ...state, reviewsByBook: action.value, payload: false };
    case keys.SET_PAYLOAD:
      return { ...state, payload: action.value };
    case keys.SET_PAGINATION:
      return { ...state, pagination: action.value };
    default:
      return state;
  }
};
// ###################################### Actions ###################################### //

export const GetAllReview = (page = 0) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/review/page?page=${page}`);
      console.log(response.data);
      dispatch({
        type: keys.SET_PAGINATION,
        value: response.data,
      });
      dispatch({
        type: keys.SET_REVIEWS,
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

export const GetAllReviewByBook = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/review/getByLivre/${id}`);
      console.log(response.data);
      dispatch({
        type: keys.SET_REVIEWS_BY_BOOK,
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

export const CreateReview = (review, callback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("/api/review/create", review);
      console.log(response);
      const currentState = getState();
      let id = currentState.BookReducers.book?.id;
      dispatch(GetAllReviewByBook(id));
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateReview = (review, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/review/update/${review.id}`,
        review
      );
      console.log(response);
      dispatch(GetAllReview());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const UpdateMyReview = (review, callback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `/api/review/update/${review.id}`,
        review
      );
      console.log(response);
      const currentState = getState();
      let id = currentState.BookReducers.book?.id;
      dispatch(GetAllReviewByBook(id));
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};

export const deleteReview = (review, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/review/delete/${review.id}`);
      console.log(response);
      dispatch(GetAllReview());
      callback();
    } catch (error) {
      dispatch({
        type: keys.SET_PAYLOAD,
        value: false,
      });
    }
  };
};
