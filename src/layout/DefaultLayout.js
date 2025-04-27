import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import AppContentHeader from 'src/components/AppContentHeader'
import useMeasurementService from 'src/services/measurementsServices';

//zid lena ta3yitet l data lkol
const DefaultLayout = () => {
  const { getMeasurement_Service } = useMeasurementService();
  useEffect(() => {
    
    getMeasurement_Service(1, "2020-01-01", "2026-01-01");
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
