// reducers/measurementReducer.js
import {
    GET_MEASUREMENTS_REQUEST,
    GET_MEASUREMENTS_SUCCESS,
    GET_MEASUREMENTS_FAILURE,
  } from '../constants/measurementConstants';
  
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  const measurementReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MEASUREMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_MEASUREMENTS_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case GET_MEASUREMENTS_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default measurementReducer;
  