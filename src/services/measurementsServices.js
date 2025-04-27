// import dayjs from 'dayjs'

// const apiURL = 'http://wrel.speedyns.net:8261/astepapi'

// export const getMeasurement_Service = async (source, startDate, endDate) => {
//   const x = {
//     source: source,
//     /*  startDate: new Date(dayjs(startDate)).toISOString(),
//     endDate: new Date(dayjs(endDate)).toISOString(), */
//     startDate: startDate,
//     endDate: endDate,
//   }
//   const y = Object.fromEntries(
//     Object.entries(x).filter(
//       ([key, value]) => value !== undefined && value !== null && value !== '',
//     ),
//   )
//   let searchParams = new URLSearchParams(y)

//   const querystring = searchParams.toString()
//   const options = {
//     method: 'GET',
//   }
  
//   return fetch(`${apiURL}/api/data/measurements?${querystring}`, options).then((response) => {
//     if (response.status == 200) {
//       console.log("server response: ", response.json);
//       return response.json();}
//     else throw response?.errors
//   })
// }


import { useDispatch } from 'react-redux';
import { fetchMeasurementsAction } from 'src/redux/actions/measurementActions';
import dayjs from 'dayjs';

const useMeasurementService = () => {
  const dispatch = useDispatch();

  const getMeasurement_Service = async (source, startDate, endDate) => {
    const queryParams = {
      source,
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
    };

    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
    );

    const querystring = new URLSearchParams(filteredParams).toString();

    dispatch(fetchMeasurementsAction(querystring));

    return querystring;
  };

  return { getMeasurement_Service };
};

export default useMeasurementService;
