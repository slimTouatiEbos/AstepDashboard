// MandrekasRadialCharts.jsx
import React, { useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import RadialChart from 'src/components/Charts/RadialChart'

const MandrekasRadialCharts = forwardRef((props, ref) => {
  const labels = ['Max', 'Average', 'Min']
  const Series = [
    props.max,
    Math.round(props.average * 1000) / 1000,
    props.min,
  ]

  // Simply forward the ref into RadialChart
  return (
    <div
      className="radial-chart-container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <RadialChart ref={ref} labels={labels} series={Series} />
      <h3 style={{ textAlign: 'center' }}>{props.sensor}</h3>
    </div>
  )
})

MandrekasRadialCharts.propTypes = {
  sensor: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
}

export default MandrekasRadialCharts
