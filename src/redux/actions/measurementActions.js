import axios from 'axios';
import dayjs from 'dayjs';
import {
  GET_MEASUREMENTS_REQUEST,
  GET_MEASUREMENTS_SUCCESS,
  GET_MEASUREMENTS_FAILURE,
  GET_MANDREKAS_REQUEST,
  GET_MANDREKAS_SUCCESS,
  GET_ARCELORMITTAL_REQUEST,
  GET_ARCELORMITTAL_SUCCESS,
  GET_MANDREKAS_FAILURE,
  GET_ARCELORMITTAL_FAILURE,
} from '../constants/measurementConstants';

const apiURL = 'http://wrel.speedyns.net:8261/astepapi';
const devapiUrl = 'api/measurements?';

export const fetchMeasurementsAction = (querystring) => async (dispatch) => {
  dispatch({ type: GET_MEASUREMENTS_REQUEST });

  try {
    const urlParams = new URLSearchParams(querystring);
    const sourcesParam = urlParams.get('source');
    
    // Split the sources parameter into an array
    const sources = sourcesParam ? sourcesParam.split(',') : [];
    
    let responses = [];
    console.log(sources.length)
    if (sources.length > 0) {
      // Make separate API calls for each source
      for (const source of sources) {
        // Create a new URLSearchParams for each source
        const newParams = new URLSearchParams(querystring);
        newParams.set('source', source);
        
       // const response = await axios.get(`${apiURL}/api/data/measurements?${newParams.toString()}`);
       const response = await axios.get(`api/measurements?${newParams.toString()}`);
        responses = responses.concat(response.data);
        console.log("resp:",responses)

      }
    } else {
      // If no sources specified, make the call as is
      const response = await axios.get(`/api/measurements?${querystring}`);
     // const response = await axios.get(`${apiURL}/api/data/measurements?${querystring}`);
      responses = response.data;
    }

    console.log("server responses:", responses);
    dispatch({ type: GET_MEASUREMENTS_SUCCESS, payload: responses });
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors || error.message || 'Unknown error';
    dispatch({ type: GET_MEASUREMENTS_FAILURE, error: errorMessage });
  }
};


export const fetchInitialMeasurements = (queryString = '') => async (dispatch) => {
  try {
    console.log("Fetching with query:", queryString);
    
    // Use ONLY the provided query parameters (don't combine with defaults)
    const params = queryString 
      ? new URLSearchParams(queryString)
      : new URLSearchParams({
          startDate: dayjs('2020-01-01').toISOString(),
          endDate: dayjs('2026-01-01').toISOString()
        });
    
    dispatch({ type: GET_MANDREKAS_REQUEST });
    dispatch({ type: GET_ARCELORMITTAL_REQUEST });
    
    const [mandrekasResponse, arcelormittalResponse] = await Promise.all([
      axios.get(`${devapiUrl}source=1&${params}`),
      axios.get(`${devapiUrl}source=2&${params}`)
      // axios.get(`${apiURL}/api/data/measurements?source=1&${params}`),
      // axios.get(`${apiURL}/api/data/measurements?source=2&${params}`)
    ]);
    
    dispatch({ type: GET_MANDREKAS_SUCCESS, payload: mandrekasResponse.data });
    dispatch({ type: GET_ARCELORMITTAL_SUCCESS, payload: arcelormittalResponse.data });
    
  } catch (error) {
    const errorMessage = error.response?.data?.errors || error.message || 'Unknown error';
    dispatch({ type: GET_MANDREKAS_FAILURE, error: errorMessage });
    dispatch({ type: GET_ARCELORMITTAL_FAILURE, error: errorMessage });
  }
};

// export const fetchMeasurementsAction = (querystring) => async (dispatch, getState) => {
//     console.log("api called")
//   dispatch({ type: GET_MEASUREMENTS_REQUEST });

//   try {
//     const urlParams = new URLSearchParams(querystring);
//     const sources = urlParams.get('source')?.split(',') || [];
    
//     let responseData = [];
//     console.log("sources: ",sources)
//     for (const source of sources) {
//       const singleSourceParams = new URLSearchParams(urlParams);
//       singleSourceParams.set('source', source);
      
//       const response = await axios.get(
//         `${apiURL}/api/data/measurements?${singleSourceParams.toString()}`
//       );
      
//       if (Array.isArray(response.data)) {
//         responseData = [...responseData, ...response.data];
//       }
//     }

//     const { measurements } = getState();
//     console.log(measurements)
//     const currentData = Array.isArray(measurements?.data) ? measurements.data : [];

//     const payload = sources.length > 1
//       ? [...currentData, ...responseData] 
//       : responseData;

//     dispatch({ 
//       type: GET_MEASUREMENTS_SUCCESS, 
//       payload: payload 
//     });
    
//     return responseData;
//   } catch (error) {
//     const errorMessage = error.response?.data?.errors || 
//                         error.response?.data?.message || 
//                         error.message || 
//                         'error occurred';
//     dispatch({ 
//       type: GET_MEASUREMENTS_FAILURE, 
//       error: errorMessage,
//       payload: error.response?.data || null 
//     });
//     throw error;
//   }
// };