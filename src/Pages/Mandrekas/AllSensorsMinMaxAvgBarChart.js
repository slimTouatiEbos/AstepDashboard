import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function AllSensorsMinMaxAvgBarChart(props) {
  const [state, setState] = useState({
    series: [
      {
        name: 'Max',
        data: props.ChartData?.slice(0, 5).map((item) => item?.max),
      },
      {
        name: 'Average',
        data: props.ChartData?.slice(0, 5).map((item) => item?.average),
      },
      {
        name: 'Min',
        data: props.ChartData?.slice(0, 5).map((item) => item?.min),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontWeight: 'bold',
        fontSize: '15px',
        width: '100%',
        labels: {
          colors: undefined,
          useSeriesColors: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        title: { text: 'Sensor' },
        categories: props.ChartData?.slice(0, 5).map((item) => item?.sensor),
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            colors: '#39539e',
          },
          hideOverlappingLabels: false,
          //  showDuplicates: false,
          rotate: 0,
          trim: true,
        },
      },
      yaxis: {
        title: { text: 'Mesurements (°C)' },
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            //    colors: '#39539e',
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
        y: {
          formatter: function (val) {
            return `${val} °C`
          },
        },
      },
    },
  })

  useEffect(() => {
    setState({
      series: [
        {
          name: 'Max',
          data: props.ChartData?.slice(0, 5).map((item) => item?.max),
        },
        {
          name: 'Average',
          data: props.ChartData?.slice(0, 5).map((item) => item?.average),
        },
        {
          name: 'Min',
          data: props.ChartData?.slice(0, 5).map((item) => item?.min),
        },
      ],
      options: {
        ...state.options,
        xaxis: {
          categories: props.ChartData?.slice(0, 5).map((item) => item?.sensor),
        },
      },
    })
  }, [props.ChartData])

  const customStyles = {
    paginationContainer: {
      width: '100%',
      backgroundColor: '#f7f9fc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    pagination: {
      backgroundColor: '#39539E',
      color: '#fff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '5px 15px',
      textAlign: 'center',
    },
    paginationButton: {
      backgroundColor: '#1ab7ea',
      borderColor: '#1ab7ea',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '4px',
      margin: '2px',
    },
    paginationButtonHover: {
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      color: '#fff',
    },
  }
  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
      <div style={customStyles.paginationContainer}>
        <Pagination
          align="center"
          style={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            gap: '2px',
          }}
          pageSize={5}
          //pageSizeOptions={[5]}
          total={props.ChartData?.length}
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
            setState({
              series: [
                {
                  name: 'Max',
                  data: props.ChartData?.slice((page - 1) * pageSize, page * pageSize).map(
                    (item) => item?.max,
                  ),
                },
                {
                  name: 'Average',
                  data: props.ChartData?.slice((page - 1) * pageSize, page * pageSize).map(
                    (item) => item?.average,
                  ),
                },
                {
                  name: 'Min',
                  data: props.ChartData?.slice((page - 1) * pageSize, page * pageSize).map(
                    (item) => item?.min,
                  ),
                },
              ],
              options: {
                ...state.options,
                xaxis: {
                  categories: props.ChartData?.slice((page - 1) * pageSize, page * pageSize).map(
                    (item) => item?.sensor,
                  ),
                },
              },
            })
          }}
        />
      </div>
    </div>
  )
}

export default AllSensorsMinMaxAvgBarChart

AllSensorsMinMaxAvgBarChart.propTypes = {
  ChartData: PropTypes.any,
  SensorsList: PropTypes.any,
  MaxList: PropTypes.any,
  AverageList: PropTypes.any,
  MinList: PropTypes.any,
}
