import { Carousel } from 'antd'
import { Color } from 'antd/es/color-picker'
import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import RadialChart from 'src/components/Charts/RadialChart'
import '../../../index.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

function MandrekasRadialCharts(props) {
  const labels = ['Max', 'Average', 'Min']
  const [Series, setSeries] = useState([
    props.max,
    Math.round(props.average * 1000) / 1000,
    props.min,
  ])
  useEffect(() => {
    setSeries([props.max, Math.round(props.average * 1000) / 1000, props.min])
  }, [props])

  // console.log([props.max, Math.round(props.average * 1000) / 1000, props.min])

  return (
    <>
      <div
        className="radial-chart-container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <RadialChart labels={labels} series={Series}></RadialChart>
        <h3 style={{ textAlign: 'center' }}>{props.sensor}</h3>
      </div>
    </>
  )
}

export default MandrekasRadialCharts

MandrekasRadialCharts.propTypes = {
  sensor: PropTypes.any,
  max: PropTypes.any,
  average: PropTypes.any,
  min: PropTypes.any,
}
