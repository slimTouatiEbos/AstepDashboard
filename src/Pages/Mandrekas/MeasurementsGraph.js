import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const MeasurementsGraph = (props) => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        group: 'social',
        type: 'line',
        height: 100,
      },
      colors: ['#008FFB'],
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          format: undefined,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'dd MMM HH:mm',
            minute: 'dd MMM HH:mm:ss',
            second: 'dd MMM HH:mm:ss',
          },
        },
      },
      legend: {
        show: false,
      },
      noData: {
        text: 'No data ',
        align: 'center',
        verticalAlign: 'top',
        style: {
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: '20px',
          fontFamily: undefined,
        },
      },
    },
  })
  useEffect(() => {
    setState({
      series: props.GraphData?.map((item) => item.series),
      options: { ...state.options, colors: props.GraphData.colors },
    })
  }, [props.GraphData])
  return (
    <div>
      <div id="wrapper">
        <div id="chart-line">
          <ReactApexChart options={state.options} series={state.series} type="line" height={400} />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  )
}

export default MeasurementsGraph

MeasurementsGraph.propTypes = {
  GraphData: PropTypes.any,
}
