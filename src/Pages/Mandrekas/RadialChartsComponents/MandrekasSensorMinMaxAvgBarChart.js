import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import RadialChart from 'src/components/Charts/RadialChart'
import '../../../index.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import SensorMinMaxAvgBarChart from 'src/Pages/Mandrekas/SensorMinMaxAvgBarChart'

function MandrekasSensorMinMaxAvgBarChart(props) {
  const labels = ['Max', 'Average', 'Min']
  const [Series, setSeries] = useState([
    props.max,
    Math.round(props.average * 1000) / 1000,
    props.min,
  ])
  useEffect(() => {
    setSeries([props.max, Math.round(props.average * 1000) / 1000, props.min])
  }, [props])
  return (
    <>
      <div
        className="radial-chart-container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <SensorMinMaxAvgBarChart
          max={Series[0]}
          average={Series[1]}
          min={Series[2]}
        ></SensorMinMaxAvgBarChart>
        <h3 style={{ textAlign: 'center' }}>{props.sensor}</h3>
      </div>
    </>
  )
}

export default MandrekasSensorMinMaxAvgBarChart

MandrekasSensorMinMaxAvgBarChart.propTypes = {
  sensor: PropTypes.any,
  max: PropTypes.any,
  average: PropTypes.any,
  min: PropTypes.any,
}
