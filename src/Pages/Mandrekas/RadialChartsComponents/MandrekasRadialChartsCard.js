import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import MandrekasSlider from './MandrekasSlider'
import { getMandrekasRadialChartsData, getSensorList } from '../MandrekasHelpers'
import PropTypes from 'prop-types'
import RadialChartsFilter from './RadialChartsFilter'

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
        ></RadialChartsFilter>
      </CCardHeader>
      <CCardBody>
        <MandrekasSlider RadialChartsData={RadialChartsData}></MandrekasSlider>
      </CCardBody>
    </CCard>
  )
}

export default MandrekasRadialChartsCard

MandrekasRadialChartsCard.propTypes = {
  JSONdata: PropTypes.any,
  SensorsList: PropTypes.any,
}
