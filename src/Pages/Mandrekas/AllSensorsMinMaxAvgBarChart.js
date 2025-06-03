// AllSensorsMinMaxAvgBarChart.jsx
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Pagination } from 'antd'

const customStyles = {
  paginationButton: {
    backgroundColor: '#1ab7ea',
    borderColor: '#1ab7ea',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    margin: '2px',
  },
}

const AllSensorsMinMaxAvgBarChart = ({ ChartData }) => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Max',
        data: ChartData?.slice(0, 5).map((item) => item?.max) || [],
      },
      {
        name: 'Average',
        data: ChartData?.slice(0, 5).map((item) => item?.average) || [],
      },
      {
        name: 'Min',
        data: ChartData?.slice(0, 5).map((item) => item?.min) || [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      states: {
        hover: { filter: { type: 'none' } },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: { type: 'none' },
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontWeight: 'bold',
        fontSize: '15px',
        width: '100%',
        labels: { useSeriesColors: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: ChartData?.slice(0, 5).map((item) => item?.sensor) || [],
        title: { text: 'sensor' },
        labels: {
          style: { fontSize: '14px', fontWeight: 'bold', colors: '#39539e' },
          hideOverlappingLabels: false,
          rotate: 0,
          trim: true,
        },
      },
      yaxis: {
        title: { text: 'Mesurements (°C)' },
        labels: {
          style: { fontSize: '12px', fontWeight: 'bold' },
          formatter: (value) => value,
        },
      },
      fill: {
        opacity: 1,
        colors: ['#1ab7ea', '#0084ff', '#ffc300'],
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} °C`,
        },
      },
    },
  })

  useEffect(() => {
    setState((prev) => ({
      series: [
        {
          name: 'Max',
          data: ChartData?.slice(0, 5).map((item) => item?.max) || [],
        },
        {
          name: 'Average',
          data: ChartData?.slice(0, 5).map((item) => item?.average) || [],
        },
        {
          name: 'Min',
          data: ChartData?.slice(0, 5).map((item) => item?.min) || [],
        },
      ],
      options: {
        ...prev.options,
        xaxis: {
          categories: ChartData?.slice(0, 5).map((item) => item?.sensor) || [],
          title: { text: 'sensor' },
          labels: prev.options.xaxis.labels,
        },
        yaxis: prev.options.yaxis,
        tooltip: prev.options.tooltip,
      },
    }))
  }, [ChartData])

  return (
    <>
      {/* Give this wrapper an id */}
      <div id="all-sensors-bar-chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <Pagination
        align="center"
        style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '2px' }}
        pageSize={5}
        total={ChartData?.length}
        itemRender={(current, type, originalElement) => {
          if (type === 'prev') {
            return <a style={customStyles.paginationButton}>Prev</a>
          }
          if (type === 'next') {
            return <a style={customStyles.paginationButton}>Next</a>
          }
          return originalElement
        }}
        onChange={(page, pageSize) => {
          setState((prev) => ({
            series: [
              {
                name: 'Max',
                data:
                  ChartData?.slice((page - 1) * pageSize, page * pageSize).map((item) => item?.max) || [],
              },
              {
                name: 'Average',
                data:
                  ChartData?.slice((page - 1) * pageSize, page * pageSize).map((item) => item?.average) || [],
              },
              {
                name: 'Min',
                data:
                  ChartData?.slice((page - 1) * pageSize, page * pageSize).map((item) => item?.min) || [],
              },
            ],
            options: {
              ...prev.options,
              xaxis: {
                categories:
                  ChartData
                    ?.slice((page - 1) * pageSize, page * pageSize)
                    .map((item) => item?.sensor) || [],
                title: { text: 'sensor' },
                labels: prev.options.xaxis.labels,
              },
            },
          }))
        }}
      />
    </>
  )
}

AllSensorsMinMaxAvgBarChart.propTypes = {
  ChartData: PropTypes.array.isRequired,
}

export default AllSensorsMinMaxAvgBarChart
