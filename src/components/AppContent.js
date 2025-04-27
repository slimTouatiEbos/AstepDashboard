import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import Home from 'src/Pages/Home/Home'
import Measurements from 'src/Pages/Mandrekas/Measurements'
import Mandrekas from 'src/Pages/Mandrekas'
import ArcelorMittal from 'src/Pages/ArcelorMittal'
import Documents from 'src/Pages/Documents'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/Mandrekas" element={<Mandrekas></Mandrekas>}></Route>
          <Route path="/ArcelorMittal" element={<ArcelorMittal></ArcelorMittal>}></Route>
          <Route path="/documents" element={<Documents></Documents>}></Route>
          <Route path="/other" element={<></>}></Route>
          <Route path="/help" element={<></>}></Route>
          <Route path="/settings" element={<></>}></Route>
          <Route path="/" element={<Navigate to="home" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
