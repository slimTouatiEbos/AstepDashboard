import axios from 'axios';
import {
  GET_MEASUREMENTS_REQUEST,
  GET_MEASUREMENTS_SUCCESS,
  GET_MEASUREMENTS_FAILURE,
} from '../constants/measurementConstants';

const apiURL = 'http://wrel.speedyns.net:8261/astepapi';

export const fetchMeasurementsAction = (querystring) => async (dispatch, getState) => {
    console.log("api called")
  dispatch({ type: GET_MEASUREMENTS_REQUEST });

  try {
    const urlParams = new URLSearchParams(querystring);
    const sources = urlParams.get('source')?.split(',') || [];
    
    let responseData = [];
    console.log("sources: ",sources)
    for (const source of sources) {
      const singleSourceParams = new URLSearchParams(urlParams);
      singleSourceParams.set('source', source);
      
      const response = await axios.get(
        `${apiURL}/api/data/measurements?${singleSourceParams.toString()}`
      );
      
      if (Array.isArray(response.data)) {
        responseData = [...responseData, ...response.data];
      }
    }

    const { measurements } = getState();
    console.log(measurements)
    const currentData = Array.isArray(measurements?.data) ? measurements.data : [];

    const payload = sources.length > 1
      ? [...currentData, ...responseData] 
      : responseData;

    dispatch({ 
      type: GET_MEASUREMENTS_SUCCESS, 
      payload: payload 
    });
    
    return responseData;
  } catch (error) {
    const errorMessage = error.response?.data?.errors || 
                        error.response?.data?.message || 
                        error.message || 
                        'error occurred';
    dispatch({ 
      type: GET_MEASUREMENTS_FAILURE, 
      error: errorMessage,
      payload: error.response?.data || null 
    });
    throw error;
  }
};