// MeasurementsGraph.jsx
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
        toolbar: { show: false },
      },
      colors: ['#008FFB'],
      xaxis: {
        type: 'datetime',
        title: { text: 'Time' },
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
      yaxis: {
        title: { text: 'Mesurements (°C)' },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} °C`,
        },
      },
      legend: { show: false },
      noData: {
        text: 'No data ',
        align: 'center',
        verticalAlign: 'top',
        style: {
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: '20px',
        },
      },
    },
  })

  useEffect(() => {
    setState((prev) => ({
      series: props.GraphData?.map((item) => item.series) || [],
      options: {
        ...prev.options,
        colors: props.GraphData?.colors || prev.options.colors,
      },
    }))
  }, [props.GraphData])

  return (
    // Give this outer div a fixed id:
    <div id="measurements-trends-chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={400}
      />
    </div>
  )
}

MeasurementsGraph.propTypes = {
  GraphData: PropTypes.any,
}

export default MeasurementsGraph
