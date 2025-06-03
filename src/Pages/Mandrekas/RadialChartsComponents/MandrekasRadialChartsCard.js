// MandrekasRadialChartsCard.jsx
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import RadialChartsFilter from './RadialChartsFilter'
import MandrekasSlider from './MandrekasSlider'
import MandrekasRadialCharts from './MandrekasRadialCharts'

function MandrekasRadialChartsCard(props) {
  const [RadialChartsData, setRadialChartsData] = useState([])
  const [SensorList, setSensorList] = useState(props.SensorsList)

  useEffect(() => {
    setSensorList(props.SensorsList)
  }, [props.SensorsList])

  return (
    <CCard style={{ width: '100%' }}>
      <CCardHeader
        style={{
          backgroundColor: '#3c4b64',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '12px',
        }}
      >
        Min/Max/Average Measurements per Sensor
      </CCardHeader>
      <CCardHeader>
        <RadialChartsFilter
          JSONdata={props.JSONdata}
          SensorsList={SensorList}
          setSensorsList={setSensorList}
          setRadialChartsData={setRadialChartsData}
        />
      </CCardHeader>
      <CCardBody>
        {/* Revert to original API: pass RadialChartsData as a prop */}
        <MandrekasSlider RadialChartsData={RadialChartsData}>
          {/* 
            If your original <MandrekasSlider> accepted children, it would
            render them, but since we’re restoring to the “RadialChartsData” API,
            you don’t need to pass in any children here.
          */}
        </MandrekasSlider>
      </CCardBody>
    </CCard>
  )
}

MandrekasRadialChartsCard.propTypes = {
  JSONdata: PropTypes.array.isRequired,
  SensorsList: PropTypes.array.isRequired,
}

export default MandrekasRadialChartsCard
