import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
//import './BarChart.css' // Optionally add custom CSS for more styles

const SensorMinMaxAvgBarChart = ({ max, average, min }) => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Max',
        data: [max, 0, 0],
      },
      {
        name: 'Average',
        data: [0, average, 0],
      },
      {
        name: 'Min',
        data: [0, 0, min],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        background: '#fff', // background color
        toolbar: {
          show: false, // hide toolbar
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
          },
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5, // rounded bars
          borderRadiusApplication: 'end',
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
      },
      dataLabels: {
        enabled: false, // Enable data labels for better visibility
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },

      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },

      xaxis: {
        categories: ['Max', 'Average', 'Min'],
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
          formatter: function (value) {
            return value
          },
        },
      },

      fill: {
        opacity: 1,
        colors: ['#1ab7ea', '#0084ff', '#ffc300'], // colors for Max, Average, Min
      },

      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: function (val) {
            return `${val}` // Show numeric values on hover
          },
        },
      },
    },
  })

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
    </div>
  )
}

SensorMinMaxAvgBarChart.propTypes = {
  max: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
}

export default SensorMinMaxAvgBarChart
