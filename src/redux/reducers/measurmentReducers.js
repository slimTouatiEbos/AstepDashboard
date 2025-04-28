// reducers/measurementReducer.js
import {
    GET_MEASUREMENTS_REQUEST,
    GET_MEASUREMENTS_SUCCESS,
    GET_MEASUREMENTS_FAILURE,
    GET_ARCELORMITTAL_FAILURE,
    GET_ARCELORMITTAL_SUCCESS,
    GET_ARCELORMITTAL_REQUEST,
    GET_MANDREKAS_FAILURE,
    GET_MANDREKAS_SUCCESS,
    GET_MANDREKAS_REQUEST,
  } from '../constants/measurementConstants';
  
  // const initialState = {
  //   loading: false,
  //   data: [],
  //   error: null,
  // };
  
  // const measurementReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case GET_MEASUREMENTS_REQUEST:
  //       return { ...state, loading: true, error: null };
  //     case GET_MEASUREMENTS_SUCCESS:
  //       return { ...state, loading: false, data: action.payload };
  //     case GET_MEASUREMENTS_FAILURE:
  //       return { ...state, loading: false, error: action.error };
  //     default:
  //       return state;
  //   }
  // };
  
  // export default measurementReducer;
  
  const initialState = {
    measurements: [],
    loading: false,
    error: null,
    mandrekas: {
      data: [],
      loading: false,
      error: null
    },
    arcelormittal: {
      data: [],
      loading: false,
      error: null
    }
  };
  
   const measurementReducer = (state = initialState, action) => {
    switch (action.type) {
      // Your existing cases
      case GET_MEASUREMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_MEASUREMENTS_SUCCESS:
        return { ...state, loading: false, measurements: action.payload };
      case GET_MEASUREMENTS_FAILURE:
        return { ...state, loading: false, error: action.error };
      
      // New cases for optimized loading
      case GET_MANDREKAS_REQUEST:
        return { 
          ...state, 
          mandrekas: { ...state.mandrekas, loading: true, error: null } 
        };
      case GET_MANDREKAS_SUCCESS:
        return { 
          ...state, 
          mandrekas: { 
            ...state.mandrekas, 
            loading: false, 
            data: action.payload 
          } 
        };
      case GET_MANDREKAS_FAILURE:
        return { 
          ...state, 
          mandrekas: { 
            ...state.mandrekas, 
            loading: false, 
            error: action.error 
          } 
        };
      
      case GET_ARCELORMITTAL_REQUEST:
        return { 
          ...state, 
          arcelormittal: { ...state.arcelormittal, loading: true, error: null } 
        };
      case GET_ARCELORMITTAL_SUCCESS:
        return { 
          ...state, 
          arcelormittal: { 
            ...state.arcelormittal, 
            loading: false, 
            data: action.payload 
          } 
        };
      case GET_ARCELORMITTAL_FAILURE:
        return { 
          ...state, 
          arcelormittal: { 
            ...state.arcelormittal, 
            loading: false, 
            error: action.error 
          } 
        };
      
      default:
        return state;
    }
  };

  export default measurementReducer