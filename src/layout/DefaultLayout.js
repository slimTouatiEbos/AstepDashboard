import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import AppContentHeader from 'src/components/AppContentHeader'
import useMeasurementService from 'src/services/measurementsServices';
import { useDispatch } from 'react-redux';
import { fetchInitialMeasurements } from 'src/redux/actions/measurementActions';

//zid lena ta3yitet l data lkol
const DefaultLayout = () => {
  const dispatch=useDispatch()
  const { getMeasurement_Service } = useMeasurementService();
  useEffect(() => {
    dispatch(    fetchInitialMeasurements())
  },[]);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 ">
          <AppContentHeader></AppContentHeader>
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
